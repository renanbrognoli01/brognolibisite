import { list, type ListBlobResultBlob } from "@vercel/blob";
import { createHash } from "node:crypto";
import { unstable_cache } from "next/cache";

export type MaterialItem = {
  id: string;
  slug: string;
  title: string;
  category: string;
  fileName: string;
  fileType: string;
  fileSizeBytes: number | null;
  downloadUrl: string;
  publishedAt: string;
};

export type MaterialsResult = {
  items: MaterialItem[];
  status: "ready" | "unavailable";
};

const typeCategories: Record<string, string> = {
  pbix: "Power BI",
  pbip: "Power BI",
  pbit: "Power BI",
  dax: "DAX",
  xls: "Excel",
  xlsx: "Excel",
  xlsm: "Excel",
  csv: "Excel",
  pdf: "PDF",
  json: "JSON",
  zip: "Arquivos",
};

function safeDecode(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function humanize(value: string) {
  const normalized = safeDecode(value)
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!normalized) {
    return "Material";
  }

  return normalized
    .split(" ")
    .map((word, index) => {
      const lower = word.toLocaleLowerCase();

      if (["bi", "dax", "sql", "etl", "api", "pbix", "pbip", "pbit"].includes(lower)) {
        return lower.toUpperCase();
      }

      if (
        index > 0 &&
        ["de", "da", "do", "das", "dos", "e", "em", "para", "com", "of", "the", "and", "to", "for"].includes(lower)
      ) {
        return lower;
      }

      return word.length > 1 && word === word.toUpperCase()
        ? word
        : `${word.charAt(0).toUpperCase()}${word.slice(1)}`;
    })
    .join(" ");
}

function slugify(value: string) {
  return safeDecode(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function createMaterialSlug(pathname: string, nameWithoutExtension: string) {
  const readable = slugify(nameWithoutExtension) || "material";
  const fingerprint = createHash("sha256").update(pathname).digest("hex").slice(0, 8);

  return `${readable}-${fingerprint}`;
}

function materialFromBlob(blob: ListBlobResultBlob): MaterialItem | null {
  const pathname = safeDecode(blob.pathname).replace(/^\/+/, "");
  const segments = pathname.split("/").filter(Boolean);
  const fileName = segments.at(-1);

  if (!fileName || fileName.startsWith(".") || fileName.toLocaleLowerCase() === "robots.txt") {
    return null;
  }

  const extensionMatch = fileName.match(/\.([^.]+)$/);
  const extension = extensionMatch?.[1]?.toLocaleLowerCase() ?? "arquivo";
  const nameWithoutExtension = extensionMatch
    ? fileName.slice(0, -extensionMatch[0].length)
    : fileName;
  const folder = segments.length > 1 ? segments[0] : null;
  const category = folder ? humanize(folder) : (typeCategories[extension] ?? "Materiais");

  return {
    id: blob.url,
    slug: createMaterialSlug(pathname, nameWithoutExtension),
    title: humanize(nameWithoutExtension),
    category,
    fileName,
    fileType: extension.toUpperCase(),
    fileSizeBytes: blob.size,
    downloadUrl: blob.downloadUrl,
    publishedAt: new Date(blob.uploadedAt).toISOString(),
  };
}

async function listMaterialsFromBlob() {
  const blobs: ListBlobResultBlob[] = [];
  let cursor: string | undefined;
  let hasMore = true;

  while (hasMore) {
    const result = await list({
      cursor,
      limit: 1000,
    });

    blobs.push(...result.blobs);
    cursor = result.cursor;
    hasMore = result.hasMore;
  }

  return blobs
    .map(materialFromBlob)
    .filter((item): item is MaterialItem => item !== null)
    .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
}

const getCachedMaterials = unstable_cache(listMaterialsFromBlob, ["vercel-blob-materials"], {
  revalidate: 1800,
});

export async function getPublishedMaterials(): Promise<MaterialsResult> {
  try {
    const items = await getCachedMaterials();

    return { items, status: "ready" };
  } catch {
    return { items: [], status: "unavailable" };
  }
}
