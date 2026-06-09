import { NextResponse } from "next/server";

import {
  DEFAULT_RELEASE_PAGE_URL,
  getStudioDownloadInfo,
} from "@/lib/downloads";

export async function GET() {
  const download = getStudioDownloadInfo();

  return NextResponse.json({
    Version: download.version,
    AssetName: download.windowsUrl?.split("/").pop() ?? null,
    DownloadUrl: download.windowsUrl,
    ReleasePageUrl: DEFAULT_RELEASE_PAGE_URL,
    Sha256: download.sha256,
    MinOs: download.minOs,
  });
}
