import { NextResponse, type NextRequest } from "next/server";

export const runtime = "nodejs";

import bcrypt from "bcryptjs";

import {
  getAdminEmail,
  getAdminPasswordHash,
  getSessionSecret,
  isAdminEnabled,
} from "@/lib/cms-auth";
import {
  createSessionToken,
  getSessionCookieName,
  getSessionCookieOptions,
} from "@/lib/cms-session";

export const POST = async (req: NextRequest) => {
  if (!isAdminEnabled()) {
    return NextResponse.json({ error: "Admin disabled" }, { status: 403 });
  }

  let email = "";
  let password = "";
  try {
    const body = (await req.json()) as { email?: string; password?: string };
    email = String(body.email ?? "");
    password = String(body.password ?? "");
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const adminEmail = getAdminEmail();
  const passwordHash = await getAdminPasswordHash();
  const sessionSecret = getSessionSecret();

  if (!adminEmail || !passwordHash || !sessionSecret) {
    return NextResponse.json(
      { error: "CMS credentials not configured" },
      { status: 500 }
    );
  }

  if (!email || !password || email !== adminEmail) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const passwordOk = await bcrypt.compare(password, passwordHash);
  if (!passwordOk) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = createSessionToken(email, sessionSecret);
  const response = NextResponse.json({ ok: true });
  response.cookies.set(getSessionCookieName(), token, getSessionCookieOptions());
  return response;
};
