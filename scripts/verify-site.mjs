import assert from 'node:assert/strict';
const base=process.env.TEST_SITE_URL || 'http://localhost:3000';
const routes=['/','/about','/services','/pricing','/websites','/products','/blog','/contact','/privacy','/terms','/disclaimer','/affiliate-disclosure','/testimonials'];
for(const route of routes){
 const res=await fetch(base+route);assert.equal(res.status,200,route);const html=await res.text();
 assert.match(html,/AJH Digital/,route);assert.match(html,/rel="canonical"/,route);assert.match(html,/social-image/,route);
 assert.doesNotMatch(html,/AJH Enterprises/,route);
}
for(const route of ['/api/contact','/api/project-inquiry']){
 const res=await fetch(base+route,{method:'POST',headers:{'content-type':'application/json'},body:'{}'});assert.equal(res.status,422,route);
 const bot=await fetch(base+route,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({company:'automated-test'})});assert.equal(bot.status,200);
}
const manifest=await (await fetch(base+'/manifest.webmanifest')).json();assert.equal(manifest.name,'AJH Digital');assert.equal(manifest.theme_color,'#0F2A44');
for(const icon of manifest.icons)assert.equal((await fetch(base+icon.src)).status,200);
const blog=await(await fetch(base+'/blog/choosing-a-website-platform')).text();
const image=blog.match(/property="og:image" content="([^"]+)/)[1].replaceAll('&amp;','&');
const local=new URL(image);const graphic=await fetch(base+local.pathname+local.search);assert.equal(graphic.status,200);assert.match(graphic.headers.get('content-type'),/image\/png/);assert.ok((await graphic.arrayBuffer()).byteLength>10000);
assert.equal((await fetch(base+'/not-a-real-page')).status,404);
for(const route of ['/sitemap.xml','/robots.txt','/blog/rss.xml'])assert.equal((await fetch(base+route)).status,200);
console.log(`PASS: ${routes.length} public pages, blog social PNG, invalid-form validation, bot handling, manifest/icons, sitemap, robots, RSS and 404.`);
