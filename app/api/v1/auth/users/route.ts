import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/db";
import { hashPassword } from "@/lib/hash";

import { SignUpRequestBody, SignUpSchema } from "@/schemas/auth";

import { getUserByEmail } from "@/features/auth/services/user";

export const POST = async (
  request: NextRequest
): Promise<
  NextResponse<{
    message: string;
  }>
> => {
  try {
    const body: SignUpRequestBody = await request.json();

    const validatedFields = SignUpSchema.safeParse(body);

    if (!validatedFields.success) {
      return NextResponse.json(
        { message: "Validation failed. Please check the input fields." },
        { status: 400 }
      );
    }

    const { email, password } = validatedFields.data;

    const existingUserByEmail = await getUserByEmail(email);

    if (existingUserByEmail) {
      return NextResponse.json(
        { message: "User already exists." },
        { status: 409 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const user = await db.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: "User created successfully.", user },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { message: "An unexpected error occurred." },
      { status: 500 }
    );
  }
};
