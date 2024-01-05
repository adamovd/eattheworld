import { NextResponse, NextRequest } from "next/server";
import { Review, PrismaClient } from "@prisma/client";
import RecipeCard from "@/app/Components/RecipeCard";

const prisma = new PrismaClient();

export const POST = async (request: NextRequest) => {
  try {
    const { title, summary, rating, userId, recipeId } = await request.json();

    const review = await prisma.review.create({
      data: {
        title,
        summary,
        rating,
        User: {
          connect: { id: userId },
        },
        Recipe: {
          connect: { id: recipeId },
        },
      },
    });

    return NextResponse.json({
      message: "Review created succesfully",
      review,
    });
  } catch (error) {
    console.error("Error creating review:", error);
  }
};
