"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

import {
  getAuthToast,
  isAuthToastKey,
} from "@/utils/auth-redirect";

/**
 * Reads `?toast=` once, shows a friendly message, then cleans the URL.
 */
export function AuthToastHandler() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const key = searchParams.get("toast");
    if (!isAuthToastKey(key)) return;

    const { type, message } = getAuthToast(key);
    if (type === "success") {
      toast.success(message);
    } else {
      toast.error(message);
    }

    const params = new URLSearchParams(searchParams.toString());
    params.delete("toast");
    const next = params.toString();
    router.replace(next ? `${pathname}?${next}` : pathname, { scroll: false });

    const main = document.getElementById("main-content");
    main?.focus({ preventScroll: true });
  }, [pathname, router, searchParams]);

  return null;
}
