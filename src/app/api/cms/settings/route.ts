import { NextResponse, type NextRequest } from "next/server";

export const runtime = "nodejs";

import { isAdminAuthenticated } from "@/lib/cms-auth";
import { getSessionTokenFromRequest } from "@/lib/cms-session";
import { prisma } from "@/lib/prisma";

const DEFAULT_SETTINGS = {
  whatsappE164: "",
  email: "",
  address: "",
  heroTitle: "",
  heroSubtitle: "",
};

export const GET = async () => {
  try {
    const settings = await prisma.siteSettings.findUnique({
      where: { id: 1 },
    });

    return NextResponse.json(settings ?? DEFAULT_SETTINGS);
  } catch {
    return NextResponse.json(DEFAULT_SETTINGS, { status: 500 });
  }
};

export const PUT = async (req: NextRequest) => {
  const token = getSessionTokenFromRequest(req);
  const isAdmin = isAdminAuthenticated(token);
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const settings = await prisma.siteSettings.upsert({
      where: { id: 1 },
      update: {
        whatsappE164: body.whatsappE164 ?? "",
        email: body.email ?? "",
        address: body.address ?? "",
        heroTitle: body.heroTitle ?? "",
        heroSubtitle: body.heroSubtitle ?? "",
      },
      create: {
        id: 1,
        whatsappE164: body.whatsappE164 ?? "",
        email: body.email ?? "",
        address: body.address ?? "",
        heroTitle: body.heroTitle ?? "",
        heroSubtitle: body.heroSubtitle ?? "",
      },
    });

    return NextResponse.json(settings);
  } catch {
    return NextResponse.json(DEFAULT_SETTINGS, { status: 500 });
  }
};
