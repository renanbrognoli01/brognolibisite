"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import type { Locale } from "@/lib/i18n";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";

export function SiteAccountEntry({ locale }: { locale: Locale }) {
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
      <div className="account-placeholder" />
    );
  }

  return (
    <Link
      href={`/${locale}/${hasSession ? "account" : "login"}`}
      className="account-link"
    >
      {hasSession ? labels.account : labels.login}
    </Link>
  );
}
