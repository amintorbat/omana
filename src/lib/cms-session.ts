import crypto from "crypto";

const SESSION_COOKIE = "cms_session";
const DEFAULT_MAX_AGE_MS = 1000 * 60 * 60 * 24 * 7;

type SessionPayload = {
  email: string;
  exp: number;
};

const sign = (value: string, secret: string) =>
  crypto.createHmac("sha256", secret).update(value).digest("base64url");

const encodePayload = (payload: SessionPayload) =>
  Buffer.from(JSON.stringify(payload)).toString("base64url");

const decodePayload = (value: string) => {
  try {
    return JSON.parse(Buffer.from(value, "base64url").toString("utf8")) as SessionPayload;
  } catch {
    return null;
  }
};

const readCookieHeader = (header: string, name: string) => {
  const parts = header.split(";");
  for (const part of parts) {
    const [key, ...valueParts] = part.trim().split("=");
    if (key === name) {
      return decodeURIComponent(valueParts.join("="));
    }
  }
  return undefined;
};

export const createSessionToken = (email: string, secret: string) => {
  const payload: SessionPayload = {
    email,
    exp: Date.now() + DEFAULT_MAX_AGE_MS,
  };
  const encoded = encodePayload(payload);
  const signature = sign(encoded, secret);
  return `${encoded}.${signature}`;
};

export const verifySessionToken = (token: string | undefined, secret: string) => {
  if (!token) return null;
  const [encoded, signature] = token.split(".");
  if (!encoded || !signature) return null;
  const expected = sign(encoded, secret);
  const expectedBuffer = Buffer.from(expected);
  const signatureBuffer = Buffer.from(signature);
  if (expectedBuffer.length !== signatureBuffer.length) {
    return null;
  }
  if (!crypto.timingSafeEqual(expectedBuffer, signatureBuffer)) {
    return null;
  }
  const payload = decodePayload(encoded);
  if (!payload || payload.exp < Date.now()) return null;
  return payload;
};

export const getSessionTokenFromRequest = (req: Request) => {
  const cookieStore = (req as { cookies?: { get?: (name: string) => { value?: string } | undefined } })
    .cookies;
  const storeValue = cookieStore?.get?.(getSessionCookieName())?.value;
  if (storeValue) {
    return storeValue;
  }
  const header = req.headers.get("cookie") ?? "";
  if (!header) return undefined;
  return readCookieHeader(header, getSessionCookieName());
};

export const getSessionCookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: DEFAULT_MAX_AGE_MS / 1000,
});

export const getSessionCookieDeletionOptions = () => ({
  ...getSessionCookieOptions(),
  maxAge: 0,
});

export const getSessionCookieName = () => SESSION_COOKIE;
