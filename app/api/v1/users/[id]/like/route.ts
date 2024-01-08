import prisma from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { recipeId } = await req.json();
    const userId = params.id;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        likedRecipeIds: {
          push: recipeId,
        },
      },
    });

    return NextResponse.json(
      { message: "Recipe added to user's liked recipes", user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: `Error associating recipe with user.` },
      { status: 500 }
    );
  }
}
