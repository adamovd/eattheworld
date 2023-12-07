import { User } from "@/app/Models/dbTypes";
import { connectToDatabase } from "@/helpers/server-helpers";
import prisma from "@/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (req: NextRequest) => {
  try {
    const { firstname, lastname, email, password } = await req.json();
    if (!firstname || !lastname || !email || !password)
      return NextResponse.json({ message: "Invalid data" }, { status: 422 });
    const hashedPassword = await bcrypt.hash(password, 10);
    await connectToDatabase();
    const user: User = await prisma.user.create({
      data: { email, firstname, lastname, hashedPassword },
    });
    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
  } finally {
  }
};
