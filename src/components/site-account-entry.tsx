"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import type { Locale } from "@/lib/i18n";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";

export function SiteAccountEntry({ locale, mobile = false }: { locale: Locale; mobile?: boolean }) {
  const [hasSession, setHasSession] = useState(false);
  const [ready, setReady] = useState(false);

  const labels = useMemo(
    () => ({
      login: locale === "pt-br" ? "Login" : "Login",
      account: locale === "pt-br" ? "Minha conta" : "My account",
    }),
    [locale],
  );

  useEffect(() => {
    let mounted = true;

    try {
      const supabase = getSupabaseBrowserClient();

      supabase.auth.getSession().then(({ data }) => {
        if (!mounted) {
          return;
        }

        setHasSession(Boolean(data.session));
        setReady(true);
      });

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        if (!mounted) {
          return;
        }

        setHasSession(Boolean(session));
        setReady(true);
      });

      return () => {
        mounted = false;
        subscription.unsubscribe();
      };
    } catch {
      queueMicrotask(() => {
        if (mounted) {
          setReady(true);
          setHasSession(false);
        }
      });
    }
  }, []);

  if (!ready) {
    return (
      <div className={mobile ? "h-11 w-28" : "hidden h-11 w-28 xl:block"} />
    );
  }

  return (
    <Link
      href={`/${locale}/${hasSession ? "account" : "login"}`}
      className={`${mobile ? "inline-flex" : "hidden xl:inline-flex"} items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.08]`}
    >
      {hasSession ? labels.account : labels.login}
    </Link>
  );
}
