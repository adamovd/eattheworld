import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient();

export const POST = async (request: NextRequest) => {
  const {
    title,
    description,
    instructions,
    imageUrl,
    ingredients,
    reviews,
    countryId,
  } = await request.json();

  const recipe = await prisma.recipe.create({
    data: {
      title,
      description,
      instructions,
      imageUrl,
      ingredients,
      reviews,
      countryId,
    },
  });

  return NextResponse.json({ message: "Recipe created succesfully", recipe });
};

export const GET = async () => {
  try {
    const recipes = await prisma.recipe.findMany();
    return NextResponse.json(recipes.reverse());
  } catch {
    return NextResponse.json("error", {
      status: 500,
    });
  }
};

export const DELETE = async (req: Request) => {
  const query = new URL(req.url).searchParams;
  const id = query.get("id") as string;
  try {
    const deletedPost = await prisma.country.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(deletedPost);
  } catch {
    return NextResponse.json(
      {
        error: "Failed to remove country",
      },
      {
        status: 500,
      }
    );
  }
};
