"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function verifyPassword(formData: FormData) {
  const password = formData.get("password") as string;
  const expected = process.env.HOMEDEPOT_PASSWORD;

  if (!expected) {
    return { error: "Password not configured. Please contact Ernest." };
  }

  if (password !== expected) {
    return { error: "Incorrect password. Please try again." };
  }

  const cookieStore = await cookies();
  cookieStore.set("hd_access", "true", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24, // 24 hours
    path: "/",
  });

  redirect("/work/homedepot/full");
}
