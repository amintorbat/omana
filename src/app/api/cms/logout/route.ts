import { NextResponse } from "next/server";

export const runtime = "nodejs";

import {
  getSessionCookieDeletionOptions,
  getSessionCookieName,
} from "@/lib/cms-session";

export const POST = async () => {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(
    getSessionCookieName(),
    "",
    getSessionCookieDeletionOptions()
  );
  return response;
};
