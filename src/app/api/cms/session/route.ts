import { NextResponse, type NextRequest } from "next/server";

export const runtime = "nodejs";

import { getSessionSecret } from "@/lib/cms-auth";
import { getSessionTokenFromRequest, verifySessionToken } from "@/lib/cms-session";

export const GET = async (req: NextRequest) => {
  try {
    const secret = getSessionSecret();
    if (!secret) {
      return NextResponse.json({ authenticated: false }, { status: 200 });
    }

    const cookie = getSessionTokenFromRequest(req);
    const session = verifySessionToken(cookie, secret);
    if (!session) {
      return NextResponse.json({ authenticated: false }, { status: 200 });
    }

    return NextResponse.json({ authenticated: true, email: session.email });
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 200 });
  }
};
