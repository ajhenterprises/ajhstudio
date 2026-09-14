import fs from 'node:fs';
const b=JSON.parse(fs.readFileSync('lib/brand.json','utf8'));
fs.writeFileSync('app/brand-tokens.css', '/* Generated from lib/brand.json. */\n:root {\n'+Object.entries(b).filter(([k])=>k!=='socialVersion').map(([k,v])=>`  --brand-${k}: ${v};`).join('\n')+'\n}\n');
