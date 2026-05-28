import { NextResponse } from "next/server";

import {
  DEFAULT_RELEASE_PAGE_URL,
  getStudioDownloadInfo,
} from "@/lib/downloads";

export async function GET() {
  const download = getStudioDownloadInfo();

  return NextResponse.json({
    version: download.version,
    assetName: download.windowsUrl?.split("/").pop() ?? null,
    downloadUrl: download.windowsUrl,
    releasePageUrl: DEFAULT_RELEASE_PAGE_URL,
    sha256: download.sha256,
    minOs: download.minOs,
  });
}
