import prisma from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  if (id) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: id as string,
        },
        include: {
          reviews: true,
        },
      });

      if (!user) {
        return NextResponse.json(
          { error: "User not found" },
          {
            status: 404,
          }
        );
      }

      return NextResponse.json(user);
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      return NextResponse.json(
        { error: "Failed to fetch user by ID" },
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
