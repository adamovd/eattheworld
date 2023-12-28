import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
import { connectToDatabase } from "@/helpers/server-helpers";

const prisma = new PrismaClient();

export const POST = async (request: NextRequest) => {
  try {
    const {
      firstname,
      lastname,
      email,
      password,
      nationality,
      image,
      bio,
      countryIDs,
    } = await request.json();
    if (!firstname || !lastname || !email || !password)
      return NextResponse.json(
        { message: "Required fields missing" },
        { status: 422 }
      );

    const exist = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (exist)
      return NextResponse.json(
        { message: "User already exist" },
        { status: 422 }
      );

    const role = (await prisma.user.findMany()).length === 0 ? "admin" : "user";
    const hashedPassword = await bcrypt.hash(password, 10);

    await connectToDatabase();

    const user = await prisma.user.create({
      data: {
        firstname,
        lastname,
        email,
        hashedPassword,
        role,
        nationality,
        image,
        bio,
        countryIDs,
      },
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error connecting to database" },
      { status: 500 }
    );
  } finally {
  }
};

export const GET = async () => {
  try {
    const users = await prisma.user.findMany();

    return NextResponse.json(users);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error fetching users" },
      { status: 500 }
    );
  }
};
