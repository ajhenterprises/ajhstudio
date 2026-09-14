import fs from 'node:fs';
import sharp from 'sharp';
const brand=JSON.parse(fs.readFileSync('lib/brand.json','utf8'));
const logo=fs.readFileSync('public/brand/logo-light.png').toString('base64');
for(const [slug,initials,name,category] of [
 ['hall-bible-commentary','HBC','Hall Bible Commentary','PUBLISHING'],
 ['jubilee-city-church','JCC','Jubilee City Church','MINISTRY'],
 ['sold-with-hall','SWH','Sold With Hall','REAL ESTATE']
]) {
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900"><defs><linearGradient id="bg" x2="1" y2="1"><stop stop-color="#0F2A44"/><stop offset="1" stop-color="#163F63"/></linearGradient></defs><rect width="1200" height="900" fill="url(#bg)"/><circle cx="1150" cy="60" r="430" fill="#38BDF8" opacity=".08"/><path d="M0 710 L1200 410 L1200 445 L0 745Z" fill="#007BFF" opacity=".15"/><text x="72" y="104" fill="#38BDF8" font-family="Inter,Arial,sans-serif" font-size="22" letter-spacing="5">${category}</text><text x="600" y="445" text-anchor="middle" fill="white" font-family="Inter,Arial,sans-serif" font-weight="700" font-size="160" letter-spacing="-6">${initials}</text><text x="600" y="525" text-anchor="middle" fill="white" font-family="Inter,Arial,sans-serif" font-size="38">${name}</text><path d="M72 710 H1128" stroke="#38BDF8" opacity=".3"/><image href="data:image/png;base64,${logo}" x="72" y="754" width="330" height="64"/><text x="1128" y="798" text-anchor="end" fill="#B9D4E8" font-family="Inter,Arial,sans-serif" font-size="20" letter-spacing="3">SELECTED WORK</text></svg>`;
 await sharp(Buffer.from(svg)).webp({quality:88}).toFile(`public/images/work/${slug}-ajh-digital.webp`);
}
