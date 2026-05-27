export type StudioDownloadInfo = {
  windowsUrl: string | null;
  version: string | null;
  minOs: string;
  sha256: string | null;
};

const DEFAULT_WINDOWS_DOWNLOAD_URL =
  "https://github.com/renanbrognoli01/Dax_Descriptions/releases/download/v1.0.0/BrognoliStudio-Setup-1.0.0.exe";
const DEFAULT_WINDOWS_VERSION = "1.0.0";
const DEFAULT_WINDOWS_MIN_OS = "Windows 10 or later";
const DEFAULT_WINDOWS_SHA256 =
  "EE2E0D9455C9875017A630134E697DBEE9A8F0E8B26953EB0D975FC00DEC1B02";

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
