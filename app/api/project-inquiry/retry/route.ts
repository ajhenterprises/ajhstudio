import { NextResponse } from "next/server";
import { readStoredInquiry } from "@/lib/crm-intake";
import { deliverInquiryNotification } from "@/lib/project-inquiry-email";
export const runtime = "nodejs";

export async function POST(request: Request) {
  const authorization = request.headers.get("authorization");
  if (!authorization?.startsWith("Bearer ")) return NextResponse.json({ ok: false }, { status: 401 });
  let inquiry;
  try {
    const body = await request.json();
    if (typeof body?.id !== "string") throw new Error("Invalid inquiry");
    inquiry = await readStoredInquiry(body.id, authorization);
  } catch {
    return NextResponse.json({ ok: false, error: "Request unavailable or access denied." }, { status: 403 });
  }
  const ok = await deliverInquiryNotification(inquiry);
  return NextResponse.json({ ok }, { status: ok ? 200 : 503 });
}
