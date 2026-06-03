export type StudioDownloadInfo = {
  windowsUrl: string | null;
  version: string | null;
  minOs: string;
  sha256: string | null;
};

export const DEFAULT_WINDOWS_DOWNLOAD_URL =
  "https://github.com/renanbrognoli01/Dax_Descriptions/releases/download/v1.0.4/BrognoliStudio-Setup-1.0.4.exe";
export const DEFAULT_WINDOWS_VERSION = "1.0.4";
export const DEFAULT_WINDOWS_MIN_OS = "Windows 10 or later";
export const DEFAULT_WINDOWS_SHA256 =
  "F2D361FAC3D4714DD2812AA26657F3AF66D9DC84C5F9AED5A2CE9A39B58DFAD2";
export const DEFAULT_RELEASE_PAGE_URL =
  "https://github.com/renanbrognoli01/Dax_Descriptions/releases/tag/v1.0.4";

export function getStudioDownloadInfo(): StudioDownloadInfo {
  const windowsUrl =
    process.env.NEXT_PUBLIC_STUDIO_WINDOWS_DOWNLOAD_URL?.trim() ||
    DEFAULT_WINDOWS_DOWNLOAD_URL;
  const version =
    process.env.NEXT_PUBLIC_STUDIO_WINDOWS_VERSION?.trim() ||
    DEFAULT_WINDOWS_VERSION;
  const minOs =
    process.env.NEXT_PUBLIC_STUDIO_WINDOWS_MIN_OS?.trim() ||
    DEFAULT_WINDOWS_MIN_OS;
  const sha256 =
    process.env.NEXT_PUBLIC_STUDIO_WINDOWS_SHA256?.trim() ||
    DEFAULT_WINDOWS_SHA256;

  return {
    windowsUrl,
    version,
    minOs,
    sha256,
  };
}
