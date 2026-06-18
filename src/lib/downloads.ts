export type StudioDownloadInfo = {
  windowsUrl: string | null;
  version: string | null;
  minOs: string;
  sha256: string | null;
};

export const DEFAULT_WINDOWS_DOWNLOAD_URL =
  "https://github.com/renanbrognoli01/Dax_Descriptions/releases/download/v1.0.5/BrognoliStudio-Setup-1.0.5.exe";
export const DEFAULT_WINDOWS_VERSION = "1.0.5";
export const DEFAULT_WINDOWS_MIN_OS = "Windows 10 or later";
export const DEFAULT_WINDOWS_SHA256 =
  "A63B553086FD4A4DD4E43CBF82A7CD9A82ED14DE5CE66ED119E9551929B9F78A";
export const DEFAULT_RELEASE_PAGE_URL =
  "https://github.com/renanbrognoli01/Dax_Descriptions/releases/tag/v1.0.5";

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
