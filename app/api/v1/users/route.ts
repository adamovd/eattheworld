import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { userId, countryId } = body;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const country = await prisma.country.findUnique({
      where: {
        id: countryId,
      },
    });

    if (!country) {
      return NextResponse.json({ error: "Country not found" }, { status: 404 });
    }

    const isCountryAssociated = user.countryIDs.includes(countryId);

    if (isCountryAssociated) {
      return NextResponse.json(
        { error: "Country already associated with user" },
        { status: 400 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        countryIDs: {
          push: countryId,
        },
      },
    });

    return NextResponse.json(
      { message: "Country associated with user", user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);

    return NextResponse.json(
      { error: `Error associating country with user.` },
      { status: 500 }
    );
  }
}
