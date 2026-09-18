const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
function load(file, mocks = {}, env = {}, fetchImpl) {
  const cache = {};
  function read(filename) {
    if (cache[filename]) return cache[filename].exports;
    if (filename.endsWith('.json')) return JSON.parse(fs.readFileSync(filename, 'utf8'));
    const module = { exports: {} }; cache[filename] = module;
    const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } }).outputText;
    function dependency(name) {
      if (Object.hasOwn(mocks, name)) return mocks[name];
      if (name === 'server-only') return {};
      if (name === 'next/server') return { NextResponse: { json: (body, init) => Response.json(body, init) } };
      if (name.startsWith('.') || name.startsWith('@/')) {
        let resolved = name.startsWith('@/') ? path.join(root, name.slice(2)) : path.resolve(path.dirname(filename), name);
        if (!path.extname(resolved)) resolved += '.ts';
        return read(resolved);
      }
      return require(name);
    }
    vm.runInNewContext(`(function(require,module,exports){${compiled}\n})`, { process: { env }, fetch: fetchImpl, AbortSignal, console: { error() {} }, URL, Request, Response, Set, Date, Intl })(dependency, module, module.exports);
    return module.exports;
  }
  return read(path.join(root, file));
}
const input = { firstName: 'Test', lastName: 'Owner', organization: 'Test organization', email: 'test@example.com', phone: '', website: '', organizationType: 'Business', projectDescription: 'A test project request with enough detail.', timeframe: 'Soon', budget: '', notes: '', selectedServiceIds: ['website-design'], company: '' };
const validation = { validateProjectInquiry: () => ({}), calculateProjectEstimate: () => ({ services: [{}] }) };
const request = body => new Request('https://ajhdigital.com/api/project-inquiry', { method: 'POST', body: JSON.stringify(body) });
test('saved inquiries remain successful when email configuration is missing', async () => {
  const order = [];
  const route = load('app/api/project-inquiry/route.ts', {
    '@/lib/project-inquiry': validation,
    '@/lib/crm-intake': { saveProjectInquiry: async () => { order.push('save'); return { id: 'saved', notificationStatus: 'pending' }; }, readStoredInquiry: async () => ({ id: 'saved' }) },
    '@/lib/project-inquiry-email': { deliverInquiryNotification: async () => { order.push('email'); throw Error('unconfigured'); } },
  });
  assert.equal((await route.POST(request(input))).status, 200);
  assert.deepEqual(order, ['save', 'email']);
});
test('storage failure never reports success or sends email', async () => {
  let sent = false;
  const route = load('app/api/project-inquiry/route.ts', {
    '@/lib/project-inquiry': validation,
    '@/lib/crm-intake': { saveProjectInquiry: async () => { throw Error('storage'); } },
    '@/lib/project-inquiry-email': { deliverInquiryNotification: async () => { sent = true; } },
  });
  assert.equal((await route.POST(request(input))).status, 503); assert.equal(sent, false);
  assert.equal((await route.POST(request(null))).status, 400);
});
test('retry requires authorization and rejects inaccessible records before emailing', async () => {
  let reads = 0, sent = false;
  const route = load('app/api/project-inquiry/retry/route.ts', {
    '@/lib/crm-intake': { readStoredInquiry: async () => { reads++; throw Error('denied'); } },
    '@/lib/project-inquiry-email': { deliverInquiryNotification: async () => { sent = true; } },
  });
  assert.equal((await route.POST(request({id:'x'}))).status, 401); assert.equal(reads, 0);
  const req = request({id:'x'}); req.headers.set('authorization', 'Bearer invalid');
  assert.equal((await route.POST(req)).status, 403); assert.equal(sent, false);
});
test('stored inquiry reads preserve the user token and enforce admin check', async () => {
  const calls = [];
  const api = load('lib/crm-intake.ts', {}, { CRM_SUPABASE_URL: 'https://example.supabase.co', CRM_SUPABASE_SERVICE_ROLE_KEY: 'server-key', CRM_OWNER_ID: 'owner' }, async (url, options) => {
    calls.push({url, options}); return Response.json(false);
  });
  await assert.rejects(api.readStoredInquiry('12345678-1234-1234-1234-123456789abc', 'Bearer user-token'));
  assert.equal(calls.length, 1); assert.equal(calls[0].options.headers.Authorization, 'Bearer user-token');
});
const inquiry = { id: 'saved', created_at: '2026-09-15T12:00:00Z', notification_status: 'pending', payload: input, services: [], setup_estimate: 499, monthly_estimate: 159 };
test('missing email credentials mark the stored notification failed', async () => {
  const statuses = [];
  const api = load('lib/project-inquiry-email.ts', { './crm-intake': { recordInquiryNotification: async (_, status) => statuses.push(status) }, resend: { Resend: class {} } });
  assert.equal(await api.deliverInquiryNotification(inquiry), false); assert.deepEqual(statuses, ['failed']);
});
test('customer email failure does not undo successful owner notification; retry content is stable', async () => {
  const statuses = [], messages = [];
  const api = load('lib/project-inquiry-email.ts', {
    './crm-intake': { recordInquiryNotification: async (_, status) => statuses.push(status) },
    resend: { Resend: class { emails = { send: async (body, options) => { messages.push({body, options}); if (body.to === input.email) throw Error('customer delivery unavailable'); return { data: {id:'email'} }; } }; } },
  }, { RESEND_API_KEY:'test', CONTACT_FROM_EMAIL:'verified@example.com' });
  assert.equal(await api.deliverInquiryNotification(inquiry), true);
  assert.deepEqual(statuses, ['sent']);
  await api.deliverInquiryNotification(inquiry);
  assert.deepEqual(messages[0], messages[2]);
  const before = messages.length;
  assert.equal(await api.deliverInquiryNotification({...inquiry, notification_status:'sent'}), true);
  assert.equal(messages.length, before);
});
test('website categories remain advisory and SEO stays separate', () => {
 const pricing=load('lib/website-pricing.ts');
 const scope=features=>pricing.normalizeWebsiteScope({features,category:'unsure'});
 assert.equal(pricing.suggestWebsiteCategory(scope([])).category,'standard');
 assert.equal(pricing.suggestWebsiteCategory(scope(['idx'])).category,'integration');
 assert.equal(pricing.suggestWebsiteCategory(scope(['portal','accounts','database'])).category,'complex');
 assert.equal(pricing.suggestWebsiteCategory(scope(['portal'])).category,'larger');
 assert.equal(pricing.suggestWebsiteCategory(scope(['blog'])).category,'larger');
 assert.equal(pricing.normalizeWebsiteScope({category:'hacked',features:['idx','unknown']}).category,'unsure');
 const inquiry=load('lib/project-inquiry.ts');
 const estimate=inquiry.calculateProjectEstimate(['website-design-development','website-hosting-care'],scope([]));
 assert.equal(estimate.oneTimeTotal,999);assert.equal(estimate.monthlyTotal,199);
 const seo=inquiry.calculateProjectEstimate(['website-design-development','website-hosting-care','content-seo'],scope([]));
 assert.equal(seo.monthlyTotal,448);
 assert.equal(estimate.website.level.monthly,'$199+');
});
test('document notification rendering escapes context and uses secure portal links',()=>{
 const mod=load('lib/crm-notification-email.ts',{resend:{Resend:class{}}});
 const result=mod.documentEmail({id:'test',event:'agreement_sent',recipient:'client',email:'test@example.com',client:'<script>bad</script>',recordId:'abc',invoiceNumber:null,balance:null,dueDate:null});
 assert.ok(result.html.includes('&lt;script&gt;'));assert.ok(!result.html.includes('<script>'));assert.ok(result.html.includes('https://client.ajhdigital.com/portal/agreements/abc'));
});
test('invalid notification token cannot send mail',async()=>{
 let sent=false;const route=load('app/api/crm-notifications/route.ts',{'@/lib/crm-notification-email':{deliverDocumentEmail:async()=>{sent=true;}}});
 const result=await route.POST(request({id:'bad',token:'bad'}));assert.equal(result.status,400);assert.equal(sent,false);
});
