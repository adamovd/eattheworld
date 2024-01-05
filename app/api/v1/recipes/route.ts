import { Diet, Ingredient, PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient();

export const POST = async (request: NextRequest) => {
  const {
    category,
    title,
    description,
    instructions,
    time,
    servings,
    from,
    link,
    imageUrl,
    ingredients,
    reviews,
    userId,
    countryId,
  } = await request.json();

  const servingsToInt = parseInt(servings, 10);
  const categoryEnumValue = await category.toUpperCase();

  const findCountryId = await prisma.country
    .findUnique({
      where: { name: countryId },
    })
    .then((country) => {
      if (country) {
        return country?.id;
      } else {
        console.error("No country");
      }
    });

  const recipe = await prisma.recipe.create({
    data: {
      category: categoryEnumValue as Diet,
      title,
      description,
      instructions,
      time,
      servings: servingsToInt,
      from,
      link,
      imageUrl,
      reviews,
      userId,
      countryId: findCountryId,
    },
  });

  const addedIngredients = await Promise.all(
    ingredients.map(async (ingredient: Ingredient) => {
      return prisma.ingredient.create({
        data: {
          name: ingredient.name,
          value: ingredient.value,
          unit: ingredient.unit,
          recipe: {
            connect: { id: recipe.id },
          },
        },
      });
    })
  );

  return NextResponse.json({
    message: "Recipe created succesfully",
    recipe,
    addedIngredients,
  });
};

export const GET = async (request: NextRequest) => {
  try {
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json("ID parameter missing", { status: 400 });
    }

    const recipe = await prisma.recipe.findUnique({
      where: { id: String(id) },
      include: {
        ingredients: true,
        reviews: true,
      },
    });

    if (!recipe) {
      return NextResponse.json("Recipe not found", { status: 404 });
    }

    return NextResponse.json(recipe);
  } catch (error) {
    console.error("Error fetching recipe:", error);
    return NextResponse.json("Error fetching recipe", { status: 500 });
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
