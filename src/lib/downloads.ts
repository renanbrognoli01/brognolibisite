export type StudioDownloadInfo = {
  windowsUrl: string | null;
  version: string | null;
  minOs: string;
  sha256: string | null;
};

export function getStudioDownloadInfo(): StudioDownloadInfo {
  const windowsUrl =
    process.env.NEXT_PUBLIC_STUDIO_WINDOWS_DOWNLOAD_URL?.trim() || null;
  const version = process.env.NEXT_PUBLIC_STUDIO_WINDOWS_VERSION?.trim() || null;
  const minOs =
    process.env.NEXT_PUBLIC_STUDIO_WINDOWS_MIN_OS?.trim() ||
    "Windows 10 or later";
  const sha256 = process.env.NEXT_PUBLIC_STUDIO_WINDOWS_SHA256?.trim() || null;

  return {
    windowsUrl,
    version,
    minOs,
    sha256,
  };
}
