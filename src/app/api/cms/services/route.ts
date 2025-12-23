import { NextResponse, type NextRequest } from "next/server";

export const runtime = "nodejs";

import { isAdminAuthenticated } from "@/lib/cms-auth";
import { getSessionTokenFromRequest } from "@/lib/cms-session";
import { prisma } from "@/lib/prisma";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  const includeDrafts = searchParams.get("includeDrafts") === "true";
  const token = getSessionTokenFromRequest(req);
  const isAdmin = isAdminAuthenticated(token);

  if (includeDrafts && !isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const items = await prisma.service.findMany({
      where: {
        ...(slug ? { slug } : {}),
        ...(includeDrafts && isAdmin ? {} : { status: "PUBLISHED" }),
      },
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json({ items });
  } catch {
    return NextResponse.json({ items: [] }, { status: 200 });
  }
};

export const POST = async (req: NextRequest) => {
  const token = getSessionTokenFromRequest(req);
  const isAdmin = isAdminAuthenticated(token);
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const item = await prisma.service.create({
      data: {
        title: body.title ?? "",
        slug: body.slug ?? "",
        excerpt: body.excerpt ?? "",
        body: body.body ?? "",
        status: body.status ?? "DRAFT",
      },
    });

    return NextResponse.json({ item });
  } catch {
    return NextResponse.json({ item: null }, { status: 400 });
  }
};
