import prisma from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  if (id) {
    try {
      const recipe = await prisma.recipe.findUnique({
        where: {
          id: id as string,
        },
        include: {
          ingredients: true,
          reviews: true,
        },
      });

      if (!recipe) {
        return NextResponse.json(
          { error: "Recipe not found" },
          {
            status: 404,
          }
        );
      }

      return NextResponse.json(recipe);
    } catch (error) {
      console.error("Error fetching recipe by ID:", error);
      return NextResponse.json(
        { error: "Failed to fetch recipe by ID" },
        {
          status: 500,
        }
      );
    }
  } else {
    return NextResponse.json(
      { error: "No ID parameter provided" },
      {
        status: 400,
      }
    );
  }
}
