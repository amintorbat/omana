import { NextResponse, type NextRequest } from "next/server";

export const runtime = "nodejs";

import { isAdminAuthenticated } from "@/lib/cms-auth";
import { getSessionTokenFromRequest } from "@/lib/cms-session";
import { prisma } from "@/lib/prisma";

type RouteContext = { params: Promise<{ id: string }> };

export const GET = async (_req: NextRequest, { params }: RouteContext) => {
  try {
    const { id } = await params;
    const parsedId = Number(id);
    const item = await prisma.faq.findUnique({ where: { id: parsedId } });
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
    const parsedId = Number(id);
    const body = await req.json();
    const item = await prisma.faq.update({
      where: { id: parsedId },
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

export const DELETE = async (_req: NextRequest, { params }: RouteContext) => {
  const token = getSessionTokenFromRequest(_req);
  const isAdmin = isAdminAuthenticated(token);
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const parsedId = Number(id);
    await prisma.faq.delete({ where: { id: parsedId } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false });
  }
};
