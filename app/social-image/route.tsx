import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { siteConfig } from "@/lib/site-config";
import brand from "@/lib/brand.json";
export const runtime = "nodejs";
const font = readFile(path.join(process.cwd(), "public/fonts/inter-bold.ttf"));
const logo = readFile(path.join(process.cwd(), "public/brand/logo-light.png"));
export async function GET(request: Request) {
  const q = new URL(request.url).searchParams;
  const title = (q.get("title") || siteConfig.name).slice(0, 150);
  const description = (q.get("description") || siteConfig.description).slice(0, 230);
  const category = (q.get("category") || siteConfig.tagline).slice(0, 70);
  const alternate = [...(q.get("slug") || title)].reduce((n,c)=>n+c.charCodeAt(0),0)%2===0;
  const [fontData,logoData] = await Promise.all([font,logo]);
  return new ImageResponse(
    <div style={{width:"100%",height:"100%",display:"flex",flexDirection:"column",padding:64,background:alternate?`linear-gradient(125deg, ${brand.navy}, #124469)` : brand.navy,color:"white",fontFamily:"Inter",position:"relative"}}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`data:image/png;base64,${logoData.toString("base64")}`} width={420} height={81} alt="" />
      <div style={{display:"flex",marginTop:35,fontSize:18,color:brand.accent,textTransform:"uppercase",letterSpacing:3}}>{category}</div>
      <div style={{display:"flex",marginTop:20,fontSize:title.length>90?44:56,lineHeight:1.12,letterSpacing:-2,maxWidth:1050}}>{title}</div>
      <div style={{display:"flex",marginTop:20,fontSize:23,lineHeight:1.4,color:"#d9e5f0",maxWidth:1000}}>{description}</div>
      <div style={{display:"flex",marginTop:"auto",paddingTop:20,borderTop:`2px solid ${brand.blue}`,fontSize:22,color:brand.accent}}>{siteConfig.domain}</div>
    </div>,
    {width:1200,height:630,fonts:[{name:"Inter",data:fontData,weight:700,style:"normal"}],headers:{"Cache-Control":"public, max-age=3600, s-maxage=86400"}}
  );
}
