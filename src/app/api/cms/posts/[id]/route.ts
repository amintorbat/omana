import { NextResponse, type NextRequest } from "next/server";

export const runtime = "nodejs";

import { isAdminAuthenticated } from "@/lib/cms-auth";
import { getSessionTokenFromRequest } from "@/lib/cms-session";
import { prisma } from "@/lib/prisma";

type RouteContext = { params: Promise<{ id: string }> };

export const GET = async (_req: NextRequest, { params }: RouteContext) => {
  try {
    const { id } = await params;
    const item = await prisma.post.findUnique({ where: { id: Number(id) } });
    const token = getSessionTokenFromRequest(_req);
    const isAdmin = isAdminAuthenticated(token);

    if (!item || (item.status !== "PUBLISHED" && !isAdmin)) {
      return NextResponse.json({ item: null }, { status: 404 });
    }

    return NextResponse.json({ item });
  } catch {
    return NextResponse.json({ item: null });
  }
};

export const PUT = async (req: NextRequest, { params }: RouteContext) => {
  const token = getSessionTokenFromRequest(req);
  const isAdmin = isAdminAuthenticated(token);
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await req.json();
    const publishedAt = body.publishedAt ? new Date(body.publishedAt) : null;
    const parsedPublishedAt =
      publishedAt && Number.isNaN(publishedAt.getTime()) ? null : publishedAt;
    const item = await prisma.post.update({
      where: { id: Number(id) },
      data: {
        title: body.title ?? "",
        slug: body.slug ?? "",
        excerpt: body.excerpt ?? "",
        content: body.content ?? "",
        seoTitle: body.seoTitle ?? null,
        seoDescription: body.seoDescription ?? null,
        status: body.status ?? "DRAFT",
        publishedAt: parsedPublishedAt,
      },
    });

    return NextResponse.json({ item });
  } catch {
    return NextResponse.json({ item: null });
  }
};

export const DELETE = async (_req: NextRequest, { params }: RouteContext) => {
  const token = getSessionTokenFromRequest(_req);
  const isAdmin = isAdminAuthenticated(token);
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    await prisma.post.delete({ where: { id: Number(id) } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false });
  }
};
