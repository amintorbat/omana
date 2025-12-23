import { NextResponse, type NextRequest } from "next/server";

export const runtime = "nodejs";

import { isAdminAuthenticated } from "@/lib/cms-auth";
import { getSessionTokenFromRequest } from "@/lib/cms-session";
import { prisma } from "@/lib/prisma";
import { isAdminRequest } from "@/lib/cms-auth";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const includeDrafts = searchParams.get("includeDrafts") === "true";
  const token = getSessionTokenFromRequest(req);
  const isAdmin = isAdminAuthenticated(token);

  if (includeDrafts && !isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const items = await prisma.faq.findMany({
      where: {
        ...(isAdmin && includeDrafts ? {} : { status: "PUBLISHED" }),
      },
      orderBy: { order: "asc" },
    });

    return NextResponse.json({ items });
  } catch {
    return NextResponse.json({ items: [] });
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
    const item = await prisma.faq.create({
      data: {
        question: body.question ?? "",
        answer: body.answer ?? "",
        order: Number(body.order ?? 0),
        status: body.status ?? "DRAFT",
      },
    });

    return NextResponse.json({ item });
  } catch {
    return NextResponse.json({ item: null });
  }
};
