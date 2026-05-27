import type { Locale } from "@/lib/i18n";
import { redirect } from "next/navigation";

export default async function DownloadPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  redirect(`/${locale}/studio`);
}
