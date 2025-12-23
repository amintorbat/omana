import { NextResponse, type NextRequest } from "next/server";

export const runtime = "nodejs";

import { prisma } from "@/lib/prisma";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  try {
    const items = await prisma.post.findMany({
      where: {
        ...(slug ? { slug } : {}),
        status: "PUBLISHED",
      },
      orderBy: { publishedAt: "desc" },
    });

    return NextResponse.json({ items });
  } catch {
    return NextResponse.json({ items: [] }, { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
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
        seoTitle: body.seoTitle ?? null,
        seoDescription: body.seoDescription ?? null,
        status: body.status ?? "DRAFT",
        publishedAt: parsedPublishedAt,
      },
    });

    return NextResponse.json({ item });
  } catch {
    return NextResponse.json({ item: null }, { status: 500 });
  }
};
