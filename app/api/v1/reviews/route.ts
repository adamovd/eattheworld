import { NextResponse, NextRequest } from "next/server";
import { Review, PrismaClient } from "@prisma/client";
import RecipeCard from "@/app/Components/RecipeCard";

const prisma = new PrismaClient();

export const POST = async (request: NextRequest) => {
  try {
    const { summary, rating, userId, recipeId } = await request.json();
    const ratingToInt = Number(rating);

    const review = await prisma.review.create({
      data: {
        summary,
        rating: ratingToInt,
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

export const GET = async (request: NextRequest) => {
  try {
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json("ID parameter missing", { status: 400 });
    }

    const reviews = await prisma.review.findMany({
      where: { recipeId: String(id) },
    });

    if (!reviews) {
      return NextResponse.json("Reviews not found", { status: 404 });
    }

    return NextResponse.json(reviews);
  } catch (error) {
    console.error("Error fetching recipe:", error);
    return NextResponse.json("Error fetching recipe", { status: 500 });
  }
};
