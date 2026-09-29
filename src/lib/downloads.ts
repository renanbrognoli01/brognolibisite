export type StudioDownloadInfo = {
  windowsUrl: string | null;
  version: string | null;
  minOs: string;
  sha256: string | null;
};

export const DEFAULT_WINDOWS_DOWNLOAD_URL =
  "https://github.com/renanbrognoli01/Dax_Descriptions/releases/download/v1.0.9/BrognoliStudio-Setup-1.0.9.exe";
export const DEFAULT_WINDOWS_VERSION = "1.0.9";
export const DEFAULT_WINDOWS_MIN_OS = "Windows 10 or later";
export const DEFAULT_WINDOWS_SHA256 = "5964EFD1E742AE0AD68C25E807773357015B73A0641F2463C6B483FC7FFB894F";
export const DEFAULT_RELEASE_PAGE_URL =
  "https://github.com/renanbrognoli01/Dax_Descriptions/releases/tag/v1.0.9";

const trustedReleasePrefix = "/renanbrognoli01/Dax_Descriptions/releases/download/";

function getTrustedWindowsDownloadUrl(candidate: string | undefined) {
  if (!candidate) {
    return DEFAULT_WINDOWS_DOWNLOAD_URL;
  }

  try {
    const url = new URL(candidate.trim());
    const trusted =
      url.protocol === "https:" &&
      url.hostname === "github.com" &&
      url.pathname.startsWith(trustedReleasePrefix) &&
      url.pathname.toLocaleLowerCase().endsWith(".exe") &&
      !url.username &&
      !url.password;

    return trusted ? url.toString() : DEFAULT_WINDOWS_DOWNLOAD_URL;
  } catch {
    return DEFAULT_WINDOWS_DOWNLOAD_URL;
  }
}

function getValidVersion(candidate: string | undefined) {
  const value = candidate?.trim();
  return value && /^\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?$/.test(value)
    ? value
    : DEFAULT_WINDOWS_VERSION;
}

function getValidSha256(candidate: string | undefined) {
  const value = candidate?.trim();
  return value && /^[A-Fa-f0-9]{64}$/.test(value) ? value.toUpperCase() : DEFAULT_WINDOWS_SHA256;
}

export function getStudioDownloadInfo(): StudioDownloadInfo {
  const windowsUrl = getTrustedWindowsDownloadUrl(
    process.env.NEXT_PUBLIC_STUDIO_WINDOWS_DOWNLOAD_URL,
  );
  const version = getValidVersion(process.env.NEXT_PUBLIC_STUDIO_WINDOWS_VERSION);
  const minOs =
    process.env.NEXT_PUBLIC_STUDIO_WINDOWS_MIN_OS?.trim() ||
    DEFAULT_WINDOWS_MIN_OS;
  const sha256 = getValidSha256(process.env.NEXT_PUBLIC_STUDIO_WINDOWS_SHA256);

  return {
    windowsUrl,
    version,
    minOs,
    sha256,
  };
}
