import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { updateNewsFromNotion } from "@/lib/news-local";

export async function POST(request: NextRequest) {
  // const secret = request.nextUrl.searchParams.get("secret");
  // const expected = process.env.REVALIDATE_SECRET;

  // if (!expected || secret !== expected) {
  //   return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  // }

  try {
    const cache = await updateNewsFromNotion();

    revalidatePath("/news");
    for (const item of cache.items) {
      revalidatePath(`/news/${encodeURIComponent(item.slug)}`);
    }

    return NextResponse.json({
      ok: true,
      revalidated: cache.items.length + 1,
      updatedAt: cache.updatedAt,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message: "Failed to refresh news cache",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
