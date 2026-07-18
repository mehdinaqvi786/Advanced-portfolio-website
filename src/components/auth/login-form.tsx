"use client";

import { useActionState, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2, LockKeyhole, Mail } from "lucide-react";
import { motion } from "framer-motion";

import { loginAction, type LoginActionState } from "@/actions/auth";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  executeRecaptcha,
  RECAPTCHA_LOGIN_ACTION,
} from "@/lib/recaptcha-client";
import { loginSchema, type LoginValues } from "@/validators/login";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type LoginFormProps = {
  nextPath?: string;
};

const initialState: LoginActionState = {};

export function LoginForm({ nextPath = "/admin/dashboard" }: LoginFormProps) {
  const reduced = usePrefersReducedMotion();
  const [showPassword, setShowPassword] = useState(false);
  const [clientError, setClientError] = useState<string | null>(null);
  const [actionState, formAction] = useActionState(loginAction, initialState);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setClientError(null);

    let recaptchaToken = "";
    try {
      const token = await executeRecaptcha(RECAPTCHA_LOGIN_ACTION);
      recaptchaToken = token ?? "";
    } catch {
      setClientError("Security verification failed. Please try again.");
      return;
    }

    const formData = new FormData();
    formData.set("email", values.email);
    formData.set("password", values.password);
    formData.set("next", nextPath);
    formData.set("recaptchaToken", recaptchaToken);

    startTransition(() => {
      formAction(formData);
    });
  });

  const displayError = clientError ?? actionState.error;

  return (
    <motion.form
      noValidate
      onSubmit={onSubmit}
      className="space-y-5"
      initial={reduced ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
      aria-busy={isPending}
    >
      <div className="space-y-2">
        <label
          htmlFor="login-email"
          className="text-sm font-medium text-foreground"
        >
          Email
        </label>
        <div className="relative">
          <Mail
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <Input
            id="login-email"
            type="email"
            autoComplete="email"
            inputMode="email"
            disabled={isPending}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "login-email-error" : undefined}
            className="h-12 rounded-2xl border-border/60 bg-background/50 pr-3 pl-10 text-sm backdrop-blur-md"
            placeholder="admin@email.com"
            {...register("email")}
          />
        </div>
        {errors.email ? (
          <p
            id="login-email-error"
            role="alert"
            className="text-xs font-medium text-destructive"
          >
            {errors.email.message}
          </p>
        ) : null}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="login-password"
          className="text-sm font-medium text-foreground"
        >
          Password
        </label>
        <div className="relative">
          <LockKeyhole
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <Input
            id="login-password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            disabled={isPending}
            aria-invalid={Boolean(errors.password)}
            aria-describedby={
              errors.password ? "login-password-error" : undefined
            }
            className="h-12 rounded-2xl border-border/60 bg-background/50 pr-12 pl-10 text-sm backdrop-blur-md"
            placeholder="••••••••"
            {...register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            disabled={isPending}
            className="absolute top-1/2 right-2 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="size-4" aria-hidden />
            ) : (
              <Eye className="size-4" aria-hidden />
            )}
          </button>
        </div>
        {errors.password ? (
          <p
            id="login-password-error"
            role="alert"
            className="text-xs font-medium text-destructive"
          >
            {errors.password.message}
          </p>
        ) : null}
      </div>

      {displayError ? (
        <div
          role="alert"
          aria-live="assertive"
          className="rounded-2xl border border-destructive/35 bg-destructive/10 px-4 py-3 text-sm text-foreground"
        >
          {displayError}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className={cn(
          buttonVariants({ size: "lg" }),
          "h-12 w-full gap-2 rounded-2xl shadow-[0_10px_28px_color-mix(in_oklab,var(--primary)_28%,transparent)] transition-[transform,box-shadow,opacity] duration-300 hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-70"
        )}
      >
        {isPending ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden />
            Signing in...
          </>
        ) : (
          "Sign in to Admin"
        )}
      </button>
    </motion.form>
  );
}
