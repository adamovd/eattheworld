import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient();

export const POST = async (request: NextRequest) => {
  const { name, value, unit } = await request.json();
  try {
    const ingredient = await prisma.ingredient.create({
      data: {
        name,
        value,
        unit,
      },
    });

    return NextResponse.json({
      message: "Ingredient created succesfully",
      ingredient,
    });
  } catch {
    return NextResponse.json("error", {
      status: 500,
    });
  }
};

export const GET = async () => {
  try {
    const ingredients = await prisma.ingredient.findMany();
    return NextResponse.json(ingredients.reverse());
  } catch {
    return NextResponse.json("error", {
      status: 500,
    });
  }
};
