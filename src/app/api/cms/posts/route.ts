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
    const items = await prisma.post.findMany({
      where: {
        ...(slug ? { slug } : {}),
        ...(includeDrafts && isAdmin ? {} : { status: "PUBLISHED" }),
      },
      orderBy: { publishedAt: "desc" },
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
    const publishedAt = body.publishedAt ? new Date(body.publishedAt) : null;
    const parsedPublishedAt =
      publishedAt && Number.isNaN(publishedAt.getTime()) ? null : publishedAt;
    const item = await prisma.post.create({
      data: {
        title: body.title ?? "",
        slug: body.slug ?? "",
        excerpt: body.excerpt ?? "",
        content: body.content ?? "",
        status: body.status ?? "DRAFT",
        publishedAt: parsedPublishedAt,
      },
    });

    return NextResponse.json({ item });
  } catch {
    return NextResponse.json({ item: null }, { status: 400 });
  }
};
