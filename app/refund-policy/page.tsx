import Container from "@/components/ui/Container";
import {withBrandMetadata} from "@/lib/social";
export const metadata=withBrandMetadata({title:"A Better Way to Build & Manage Your Website",description:"Straightforward, personal digital services with clear pricing, human judgment and no long-term contracts for standard monthly services.",alternates:{canonical:"/refund-policy"}});
const principles=[
 ["Stay because it works—not because you’re locked in.","Our standard monthly services don’t require long-term contracts. If we’re going to keep your business, we want to earn it month after month."],
 ["Smart technology. Human judgment.","We use modern tools, including AI-assisted workflows, to work more efficiently and keep our services affordable. But technology doesn’t make the final decisions—real people do."],
 ["Reviewed before it’s published.","AI can help us research, organize, draft, develop, and work faster, but public-facing work is reviewed before it goes live."],
 ["Clear pricing from the beginning.","You’ll know what you’re paying for. If your project requires something outside the original scope, we’ll discuss the additional cost with you before moving forward."],
 ["Personal service without unnecessary complexity.","You aren’t just another account in a massive system. AJH Digital works directly with businesses, churches, ministries, and organizations to understand what they’re building and create solutions that make sense for them."]
];
export default function ServiceApproach(){return <section className="py-16 sm:py-24"><Container><div className="max-w-3xl"><h1 className="font-display text-4xl leading-tight text-ink sm:text-5xl">A Better Way to Build &amp; Manage Your Website</h1><p className="mt-6 text-lg leading-relaxed text-muted">We believe professional digital services should be straightforward, personal, and built around what your organization actually needs.</p><div className="mt-10 space-y-9">{principles.map(([title,text])=><section key={title}><h2 className="text-xl font-semibold text-ink">{title}</h2><p className="mt-3 leading-relaxed text-muted">{text}</p></section>)}</div></div></Container></section>;}
