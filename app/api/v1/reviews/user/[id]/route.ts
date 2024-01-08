import prisma from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const id = params.id;
  if (id) {
    try {
      const reviews = await prisma.review.findMany({
        where: { userId: id },
      });

      if (!reviews) {
        return NextResponse.json("Reviews not found", { status: 404 });
      }

      return NextResponse.json(reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      return NextResponse.json("Error fetching reviews", { status: 500 });
    }
  } else {
    return NextResponse.json(
      { error: "No ID parameter provided" },
      {
        status: 400,
      }
    );
  }
};
