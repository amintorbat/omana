import bcrypt from "bcryptjs";
import { verifySessionToken } from "@/lib/cms-session";

export const isAdminEnabled = () => process.env.ADMIN_ENABLED === "true";

export const getSessionSecret = () =>
  process.env.CMS_SESSION_SECRET ?? process.env.CMS_SECRET ?? "";

let cachedPasswordHash: string | null | undefined;

export const getAdminPasswordHash = async () => {
  if (cachedPasswordHash !== undefined) {
    return cachedPasswordHash;
  }
  const envHash = process.env.CMS_ADMIN_PASSWORD_HASH ?? "";
  if (envHash) {
    cachedPasswordHash = envHash;
    return cachedPasswordHash;
  }
  const envPassword = process.env.CMS_ADMIN_PASSWORD ?? "";
  if (!envPassword) {
    cachedPasswordHash = null;
    return cachedPasswordHash;
  }
  cachedPasswordHash = await bcrypt.hash(envPassword, 12);
  return cachedPasswordHash;
};

export const getAdminEmail = () =>
  process.env.CMS_ADMIN_EMAIL ?? process.env.CMS_ADMIN_USER ?? "";

export const isAdminRequest = () => isAdminEnabled();

export const isAdminAuthenticated = (token?: string | null) => {
  const secret = getSessionSecret();
  if (!secret || !token) return false;
  return Boolean(verifySessionToken(token, secret));
};
