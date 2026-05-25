import type { Metadata } from "next";
import { Suspense } from "react";

import { AuthCallbackPanel } from "@/components/auth-callback-panel";
import type { Locale } from "@/lib/i18n";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

export default async function AuthCallbackPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return (
    <Suspense
      fallback={
        <div className="mx-auto flex min-h-[60vh] max-w-3xl items-center px-6 py-16">
          <div className="w-full rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 text-center shadow-[0_30px_80px_rgba(0,0,0,0.22)]">
            <h1 className="text-3xl font-semibold text-white">
              {locale === "pt-br" ? "Finalizando seu login..." : "Finalizing your login..."}
            </h1>
          </div>
        </div>
      }
    >
      <AuthCallbackPanel locale={locale} />
    </Suspense>
  );
}
