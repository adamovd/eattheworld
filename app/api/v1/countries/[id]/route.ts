import prisma from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  if (id) {
    try {
      const country = await prisma.country.findUnique({
        where: {
          id: id as string,
        },
        include: {
          recipes: {
            include: {
              ingredients: true,
            },
          },
        },
      });

      if (!country) {
        return NextResponse.json(
          { error: "Country not found" },
          {
            status: 404,
          }
        );
      }

      return NextResponse.json(country);
    } catch (error) {
      console.error("Error fetching country by ID:", error);
      return NextResponse.json(
        { error: "Failed to fetch country by ID" },
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
