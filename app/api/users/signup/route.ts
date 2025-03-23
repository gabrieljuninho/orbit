import { NextRequest, NextResponse } from "next/server";

import { Prisma } from "@prisma/client";

import { db } from "@/lib/db";
import { hashPassword } from "@/lib/hash";

import { SignUpSchema } from "@/schemas/auth";

import {
  generateImageUrl,
  getUserByEmail,
  getUserByUsername,
} from "@/features/auth/helpers/user";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const validatedFields = SignUpSchema.safeParse(body);

    if (!validatedFields.success) {
      return NextResponse.json({
        status: 400,
        message: "Invalid data. Please try again.",
        data: null,
        errors: validatedFields.error.flatten().fieldErrors,
      });
    }

    const { username, email, password } = validatedFields.data;

    const existingUserByUsername = await getUserByUsername(username);

    if (existingUserByUsername) {
      return NextResponse.json({
        status: 409,
        message: "Username already exists",
        data: null,
      });
    }

    const existingUserByEmail = await getUserByEmail(email);

    if (existingUserByEmail) {
      return NextResponse.json({
        status: 409,
        message: "Email address already exists",
        data: null,
      });
    }

    const hashedPassword = await hashPassword(password);

    const imageUrl = generateImageUrl(username);

    const user = await db.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        image: imageUrl,
      },
    });

    return NextResponse.json({
      status: 201,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json({
          status: 409,
          message: "Username or email address already exists",
          data: null,
        });
      }
    }

    return NextResponse.json({
      status: 500,
      message: "Internal server error",
      data: null,
    });
  }
};
