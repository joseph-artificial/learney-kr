import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const { name, company, email, message } = body as {
    name?: string;
    company?: string;
    email?: string;
    message?: string;
  };

  if (!name || !company || !email || !message) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // 실제 환경에서는 여기에서 CRM, Slack, 이메일 발송 등으로 연동합니다.

  return NextResponse.json({ ok: true });
}

