"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { clearAuthSession } from "@/lib/auth/gate";
import {
  checkLoginRateLimit,
  recordFailedLoginAttempt,
  resetLoginRateLimit,
} from "@/lib/rate-limit";
import {
  RECAPTCHA_ACTIONS,
  recaptchaUserMessage,
  verifyRecaptchaToken,
} from "@/lib/recaptcha";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getProfileByAuthUserId } from "@/server/auth/profile";
import {
  buildLoginUrl,
  getSafeAdminPath,
  withAuthToast,
} from "@/utils/auth-redirect";
import { normalizeEmail } from "@/utils/auth";
import { loginSchema } from "@/validators/login";

export type LoginActionState = {
  error?: string;
  success?: boolean;
};

/**
 * Email/password admin login via Supabase Auth.
 * Protected by Google reCAPTCHA v3 + IP-based rate limiting.
 * Non-admin sessions are rejected and signed out.
 */
export async function loginAction(
  _prev: LoginActionState,
  formData: FormData
): Promise<LoginActionState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message;
    return { error: first ?? "Please check your email and password." };
  }

  const rateLimit = await checkLoginRateLimit();
  if (!rateLimit.allowed) {
    return { error: rateLimit.message };
  }

  const recaptchaToken = formData.get("recaptchaToken");
  const captcha = await verifyRecaptchaToken(
    typeof recaptchaToken === "string" ? recaptchaToken : null,
    { action: RECAPTCHA_ACTIONS.adminLogin }
  );

  if (!captcha.ok) {
    return { error: recaptchaUserMessage(captcha.reason) };
  }

  const email = normalizeEmail(parsed.data.email);
  const { password } = parsed.data;

  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.user) {
      await recordFailedLoginAttempt(rateLimit.ip);
      return { error: "Invalid email or password." };
    }

    const profile = await getProfileByAuthUserId(data.user.id);

    if (!profile || profile.role !== "ADMIN") {
      await supabase.auth.signOut({ scope: "local" });
      await recordFailedLoginAttempt(rateLimit.ip);
      return { error: "Invalid email or password." };
    }

    await resetLoginRateLimit(rateLimit.ip);
  } catch (error) {
    console.error("[loginAction]", error);
    return { error: "Unable to sign in right now. Please try again." };
  }

  const destination = withAuthToast(
    getSafeAdminPath(formData.get("next")),
    "login"
  );

  redirect(destination);
}

/**
 * End the Supabase session, clear auth cookies, and send the user to login.
 */
export async function logoutAction(): Promise<void> {
  await clearAuthSession();
  revalidatePath("/admin", "layout");
  revalidatePath("/login");
  redirect(buildLoginUrl({ toast: "logout" }));
}
