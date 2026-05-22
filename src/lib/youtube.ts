type VideoItem = {
  id: string;
  title: string;
  published: string;
  thumbnail: string;
  url: string;
};

const channelFeeds = {
  "pt-br": "https://www.youtube.com/feeds/videos.xml?channel_id=UC_fallback_pt",
  en: "https://www.youtube.com/feeds/videos.xml?channel_id=UC_fallback_en",
} as const;

const channelUrls = {
  "pt-br": "https://www.youtube.com/@renanbrognolibr",
  en: "https://www.youtube.com/@renanbrognoliint",
} as const;

function extractAll(xml: string, tag: string) {
  return [...xml.matchAll(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`, "g"))].map(
    (match) => match[1].trim(),
  );
}

export async function getLatestVideos(locale: "pt-br" | "en"): Promise<VideoItem[]> {
  const fallback = [
    {
      id: "fallback-1",
      title: locale === "pt-br" ? "Conheça o canal no YouTube" : "Explore the YouTube channel",
      published: "",
      thumbnail: "/media/studio 3.png",
      url: channelUrls[locale],
    },
  ];

  try {
    const response = await fetch(channelFeeds[locale], {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return fallback;
    }

    const xml = await response.text();
    const entries = xml.split("<entry>").slice(1, 6);

    if (!entries.length) {
      return fallback;
    }

    return entries.map((entry) => {
      const videoId = extractAll(entry, "yt:videoId")[0] ?? "";
      const title = extractAll(entry, "title")[0] ?? "";
      const published = extractAll(entry, "published")[0] ?? "";

      return {
        id: videoId || title,
        title,
        published,
        thumbnail: videoId
          ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
          : "/media/studio 3.png",
        url: videoId ? `https://www.youtube.com/watch?v=${videoId}` : channelUrls[locale],
      };
    });
  } catch {
    return fallback;
  }
}
