export type MaterialLanguage = "pt-br" | "en" | "both";

export type MaterialItem = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  language: MaterialLanguage;
  fileName: string;
  fileType: string;
  fileSizeBytes: number | null;
  downloadUrl: string;
  videoUrl: string | null;
  thumbnailUrl: string | null;
  publishedAt: string;
};

export type MaterialsResult = {
  items: MaterialItem[];
  status: "ready" | "not-configured" | "unavailable";
};

type MaterialRow = {
  id?: unknown;
  slug?: unknown;
  title?: unknown;
  description?: unknown;
  category?: unknown;
  language?: unknown;
  file_name?: unknown;
  file_type?: unknown;
  file_size_bytes?: unknown;
  download_url?: unknown;
  video_url?: unknown;
  thumbnail_url?: unknown;
  published_at?: unknown;
};

function optionalString(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function externalUrl(value: unknown): string | null {
  const candidate = optionalString(value);

  if (!candidate) {
    return null;
  }

  try {
    const url = new URL(candidate);
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : null;
  } catch {
    return null;
  }
}

function mapMaterial(row: MaterialRow): MaterialItem | null {
  const id = optionalString(row.id);
  const slug = optionalString(row.slug);
  const title = optionalString(row.title);
  const downloadUrl = externalUrl(row.download_url);
  const publishedAt = optionalString(row.published_at);

  if (!id || !slug || !title || !downloadUrl || !publishedAt) {
    return null;
  }

  const language = row.language === "en" || row.language === "both" ? row.language : "pt-br";
  const size =
    typeof row.file_size_bytes === "number" && Number.isFinite(row.file_size_bytes)
      ? row.file_size_bytes
      : null;

  return {
    id,
    slug,
    title,
    description: optionalString(row.description) ?? "",
    category: optionalString(row.category) ?? "Geral",
    language,
    fileName: optionalString(row.file_name) ?? title,
    fileType: optionalString(row.file_type) ?? "Arquivo",
    fileSizeBytes: size,
    downloadUrl,
    videoUrl: externalUrl(row.video_url),
    thumbnailUrl: externalUrl(row.thumbnail_url),
    publishedAt,
  };
}

export async function getPublishedMaterials(): Promise<MaterialsResult> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim();

  if (!supabaseUrl || !publishableKey) {
    return { items: [], status: "not-configured" };
  }

  const endpoint = new URL(`${supabaseUrl.replace(/\/$/, "")}/rest/v1/materials`);
  endpoint.searchParams.set(
    "select",
    "id,slug,title,description,category,language,file_name,file_type,file_size_bytes,download_url,video_url,thumbnail_url,published_at",
  );
  endpoint.searchParams.set("is_published", "eq.true");
  endpoint.searchParams.set("order", "published_at.desc");

  try {
    const response = await fetch(endpoint.toString(), {
      headers: {
        apikey: publishableKey,
        Authorization: `Bearer ${publishableKey}`,
      },
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      return { items: [], status: "unavailable" };
    }

    const rows = (await response.json()) as MaterialRow[];
    const items = rows
      .map(mapMaterial)
      .filter((item): item is MaterialItem => item !== null);

    return { items, status: "ready" };
  } catch {
    return { items: [], status: "unavailable" };
  }
}
