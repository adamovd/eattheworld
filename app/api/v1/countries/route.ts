import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient();

export const POST = async (request: NextRequest) => {
  const {
    name,
    description,
    population,
    lat,
    lng,
    imageUrl,
    flag,
    area,
    continent,
    capital,
    playlistUrl,
    recipes,
  } = await request.json();

  const country = await prisma.country.create({
    data: {
      name,
      description,
      population,
      lat,
      lng,
      flag,
      area,
      continent,
      capital,
      imageUrl,
      playlistUrl,
      recipes,
    },
  });

  return NextResponse.json({ message: "Country created succesfully", country });
};

export const GET = async () => {
  try {
    const countries = await prisma.country.findMany({
      include: {
        recipes: {
          include: {
            ingredients: true,
          },
        },
      },
    });
    return NextResponse.json(countries.reverse());
  } catch {
    return NextResponse.json("error", {
      status: 500,
    });
  }
};

export const PUT = async (req: Request) => {
  const query = new URL(req.url).searchParams;
  const id = query.get("id") as string;
  const updatedData = req.body;

  console.log(id);

  try {
    if (updatedData) {
      const updatedCountry = await prisma.country.update({
        where: { id },
        data: updatedData,
      });
      return NextResponse.json(updatedCountry);
    }
  } catch (error) {
    console.error("Error updating country:", error);
    return NextResponse.json(
      {
        error: "Failed to update country",
      },
      {
        status: 500,
      }
    );
  }
};

export const DELETE = async (req: Request) => {
  const query = new URL(req.url).searchParams;
  const id = query.get("id") as string;
  try {
    const deletedCountry = await prisma.country.delete({
      where: {
        id,
      },
    });
    return NextResponse.json(deletedCountry);
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
