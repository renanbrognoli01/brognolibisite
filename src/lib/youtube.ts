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

export async function getLatestVideos(locale: Locale): Promise<VideoItem[]> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const uploadsPlaylist = uploadsPlaylists[locale];

  if (!apiKey || !uploadsPlaylist) {
    return getFallback(locale);
  }

  const endpoint = new URL("https://www.googleapis.com/youtube/v3/playlistItems");
  endpoint.searchParams.set("part", "snippet,contentDetails");
  endpoint.searchParams.set("playlistId", uploadsPlaylist);
  endpoint.searchParams.set("maxResults", "5");
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

    return items
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
  } catch {
    return getFallback(locale);
  }
}
