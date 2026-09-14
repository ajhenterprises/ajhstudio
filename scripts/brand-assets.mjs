import sharp from 'sharp';
import fs from 'node:fs/promises';
// Derivatives of supplied artwork only: crop, resize, and reverse neutral ink.
const source = 'public/brand/official-logo.png';
const {data, info} = await sharp(source).raw().toBuffer({resolveWithObject:true});
let left=info.width, top=info.height, right=0, bottom=0;
for(let y=0;y<info.height;y++) for(let x=0;x<info.width;x++) {
  if(data[(y*info.width+x)*4+3]>30){left=Math.min(left,x);right=Math.max(right,x);top=Math.min(top,y);bottom=Math.max(bottom,y);}
}
const full=await sharp(source).extract({left,top,width:right-left+1,height:bottom-top+1}).png().toBuffer();
await sharp(full).png({compressionLevel:9}).toFile('public/brand/logo.png');
await sharp(full).webp({quality:95}).toFile('public/brand/logo.webp');
const reversed=await sharp(full).raw().toBuffer({resolveWithObject:true});
for(let i=0;i<reversed.data.length;i+=4){
 const [r,g,b]=reversed.data.subarray(i,i+3);
 if(b<100 || Math.max(r,g,b)-Math.min(r,g,b)<35) reversed.data.set([255,255,255],i);
}
const light=await sharp(reversed.data,{raw:reversed.info}).png().toBuffer();
await sharp(light).webp({quality:95}).toFile('public/brand/logo-light.webp');
await fs.writeFile('public/brand/logo-light.png',light);
// The monogram occupies the left 580 pixels of the original, before the wordmark.
const icon=await sharp(source).extract({left,top,width:580,height:bottom-top+1}).png().toBuffer();
await fs.writeFile('public/brand/monogram.png',icon);
await sharp(icon).webp({quality:95}).toFile('public/brand/monogram.webp');
for(const size of [32,48,180,192,512]){
 const mark=await sharp(icon).resize(Math.round(size*.76),Math.round(size*.76),{fit:'inside',withoutEnlargement:true}).png().toBuffer();
 await sharp({create:{width:size,height:size,channels:4,background:'#ffffff'}}).composite([{input:mark,gravity:'centre'}]).png().toFile(`public/brand/icon-${size}.png`);
}
const png=await fs.readFile('public/brand/icon-48.png');
const header=Buffer.alloc(22);header.writeUInt16LE(1,2);header.writeUInt16LE(1,4);header[6]=48;header[7]=48;header.writeUInt16LE(1,10);header.writeUInt16LE(32,12);header.writeUInt32LE(png.length,14);header.writeUInt32LE(22,18);
await fs.writeFile('public/favicon.ico',Buffer.concat([header,png]));
// Raster artwork is not falsely represented as vector paths.
await fs.writeFile('public/favicon.svg',`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><image width="48" height="48" href="data:image/png;base64,${png.toString('base64')}"/></svg>`);
console.log({crop:{left,top,right,bottom},source:info});
