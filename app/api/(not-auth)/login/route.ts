import { NextResponse } from "next/server";
import { attemptLogin } from "@/server/db_operation";
import { login, setFlash } from "@/server/lib/auth";
import { FrontendResponseType } from "@/types";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 }
      );
    }

    const result = await attemptLogin({
      identifier: email,
      password,
    });

    if (!result) {
      return NextResponse.json(
        { success: false, message: "Invalid login credentials" },
        { status: 401 }
      );
    }

    const ce = result.data as FrontendResponseType;

    // email not verified
    if (!ce.success) {
      return NextResponse.json(
        {
          success: false,
          emailNotVerified: true,
          message: "Email not verified",
        },
        { status: 401 }
      );
    }

    // Construct formData for existing login() helper
    const formData = new FormData();
    formData.set("email", email); // will be stored in session
    formData.set("name", result.role); // optional if needed in session
    formData.set("id", result.data.id as string); // optional if needed in session

    // Use existing login logic (which handles redirect & cookie)
    const redirectTo = await login(formData, result.role);
    setFlash({
      message: "Logged in successfully.",
      type: "success",
    });
    return NextResponse.json({ success: true, redirectTo });
  } catch {
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
