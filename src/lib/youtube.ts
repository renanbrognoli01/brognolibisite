type Locale = "pt-br" | "en";

type VideoItem = {
  id: string;
  title: string;
  published: string;
  thumbnail: string;
  url: string;
};

type PlaylistApiResponse = {
  items?: Array<{
    snippet?: {
      title?: string;
      publishedAt?: string;
      resourceId?: {
        videoId?: string;
      };
      thumbnails?: {
        maxres?: { url?: string };
        standard?: { url?: string };
        high?: { url?: string };
        medium?: { url?: string };
        default?: { url?: string };
      };
    };
    contentDetails?: {
      videoId?: string;
      videoPublishedAt?: string;
    };
  }>;
};

type VideosApiResponse = {
  items?: Array<{
    id?: string;
    contentDetails?: {
      duration?: string;
    };
  }>;
};

const uploadsPlaylists: Record<Locale, string> = {
  "pt-br": "UUgq8atNbogkGweKMlV54tqQ",
  en: "UUX00tSU386WYrDFk0IDBoaQ",
};

const channelUrls: Record<Locale, string> = {
  "pt-br": "https://www.youtube.com/@renanbrognolibr",
  en: "https://www.youtube.com/@renanbrognoliint",
};

function getFallback(locale: Locale): VideoItem[] {
  return [
    {
      id: `fallback-${locale}`,
      title: locale === "pt-br" ? "Conheca o canal no YouTube" : "Explore the YouTube channel",
      published: "",
      thumbnail: "/media/studio 3.png",
      url: channelUrls[locale],
    },
  ];
}

function parseIsoDurationToSeconds(value: string): number {
  const match = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/i.exec(value);

  if (!match) {
    return 0;
  }

  const hours = Number(match[1] ?? 0);
  const minutes = Number(match[2] ?? 0);
  const seconds = Number(match[3] ?? 0);

  return hours * 3600 + minutes * 60 + seconds;
}

export async function getLatestVideos(locale: Locale): Promise<VideoItem[]> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const uploadsPlaylist = uploadsPlaylists[locale];

  if (!apiKey || !uploadsPlaylist) {
    return getFallback(locale);
  }

  const endpoint = new URL("https://www.googleapis.com/youtube/v3/playlistItems");
  endpoint.searchParams.set("part", "snippet,contentDetails");
  endpoint.searchParams.set("playlistId", uploadsPlaylist);
  endpoint.searchParams.set("maxResults", "15");
  endpoint.searchParams.set("key", apiKey);

  try {
    const response = await fetch(endpoint.toString(), {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return getFallback(locale);
    }

    const data = (await response.json()) as PlaylistApiResponse;
    const items = data.items ?? [];

    if (!items.length) {
      return getFallback(locale);
    }

    const mappedItems = items
      .map((item) => {
        const snippet = item.snippet;
        const videoId = snippet?.resourceId?.videoId ?? item.contentDetails?.videoId ?? "";
        const thumbnail =
          snippet?.thumbnails?.maxres?.url ??
          snippet?.thumbnails?.standard?.url ??
          snippet?.thumbnails?.high?.url ??
          snippet?.thumbnails?.medium?.url ??
          snippet?.thumbnails?.default?.url ??
          "/media/studio 3.png";

        if (!videoId || !snippet?.title) {
          return null;
        }

        return {
          id: videoId,
          title: snippet.title,
          published: snippet.publishedAt ?? item.contentDetails?.videoPublishedAt ?? "",
          thumbnail,
          url: `https://www.youtube.com/watch?v=${videoId}`,
        } satisfies VideoItem;
      })
      .filter((item): item is VideoItem => item !== null);

    if (!mappedItems.length) {
      return getFallback(locale);
    }

    const detailsEndpoint = new URL("https://www.googleapis.com/youtube/v3/videos");
    detailsEndpoint.searchParams.set("part", "contentDetails");
    detailsEndpoint.searchParams.set("id", mappedItems.map((item) => item.id).join(","));
    detailsEndpoint.searchParams.set("key", apiKey);

    const detailsResponse = await fetch(detailsEndpoint.toString(), {
      next: { revalidate: 3600 },
    });

    if (!detailsResponse.ok) {
      return mappedItems.slice(0, 5);
    }

    const detailsData = (await detailsResponse.json()) as VideosApiResponse;
    const durationsById = new Map(
      (detailsData.items ?? [])
        .filter((item): item is { id: string; contentDetails?: { duration?: string } } => Boolean(item.id))
        .map((item) => [item.id, parseIsoDurationToSeconds(item.contentDetails?.duration ?? "")]),
    );

    const longVideos = mappedItems
      .filter((item) => (durationsById.get(item.id) ?? 0) > 120)
      .slice(0, 5);

    return longVideos.length > 0 ? longVideos : mappedItems.slice(0, 5);
  } catch {
    return getFallback(locale);
  }
}
