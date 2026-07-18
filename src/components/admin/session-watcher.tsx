"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

import { ADMIN_LOGOUT_FLAG } from "@/constants/admin-auth";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { buildLoginUrl } from "@/utils/auth-redirect";

/**
 * Redirects to login when the browser session ends unexpectedly
 * (expired refresh token, revoked session, etc.).
 */
export function SessionWatcher() {
  const router = useRouter();
  const pathname = usePathname();
  const pathnameRef = useRef(pathname);

  useEffect(() => {
    pathnameRef.current = pathname;
  }, [pathname]);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event !== "SIGNED_OUT") return;

      try {
        if (sessionStorage.getItem(ADMIN_LOGOUT_FLAG) === "1") {
          sessionStorage.removeItem(ADMIN_LOGOUT_FLAG);
          return;
        }
      } catch {
        // sessionStorage may be unavailable — fall through to safe redirect.
      }

      const currentPath = pathnameRef.current;
      router.replace(
        buildLoginUrl({
          next: currentPath.startsWith("/admin")
            ? currentPath
            : "/admin/dashboard",
          toast: "session",
        })
      );
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  return null;
}
