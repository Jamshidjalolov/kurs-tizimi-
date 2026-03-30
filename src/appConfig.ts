function trimTrailingSlash(value: string): string {
  return value.replace(/\/+$/, "");
}

function normalizePathPrefix(value?: string): string {
  const source = value?.trim();
  if (!source || source === "/") {
    return "";
  }
  return `/${source.replace(/^\/+|\/+$/g, "")}`;
}

function toWebSocketOrigin(value: string): string {
  return value.replace(/^http/i, "ws");
}

function inferDefaultApiBaseUrl(): string {
  if (typeof window === "undefined") {
    return "http://127.0.0.1:8000";
  }

  const { hostname, origin } = window.location;
  if (hostname === "127.0.0.1" || hostname === "localhost") {
    return "http://127.0.0.1:8000";
  }

  return origin;
}

export const API_BASE_URL = trimTrailingSlash(
  import.meta.env.VITE_API_BASE_URL?.trim() || inferDefaultApiBaseUrl()
);

export const WS_BASE_URL = trimTrailingSlash(
  import.meta.env.VITE_WS_BASE_URL?.trim() || toWebSocketOrigin(API_BASE_URL)
);

export const APP_BASE_PATH = normalizePathPrefix(
  import.meta.env.VITE_APP_BASE_PATH
);

export const ROUTER_MODE: "browser" | "hash" =
  import.meta.env.VITE_ROUTER_MODE === "hash" ? "hash" : "browser";

export function apiUrl(path: string): string {
  return `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function wsUrl(path: string): string {
  return `${WS_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function resolveBackendAssetUrl(rawUrl: string): string {
  if (/^https?:\/\//i.test(rawUrl)) {
    return rawUrl;
  }
  return apiUrl(rawUrl.startsWith("/") ? rawUrl : `/${rawUrl}`);
}

export function firebaseAuthorizedDomainsHint(): string {
  if (typeof window === "undefined") {
    return "127.0.0.1, localhost va deploy domeningiz";
  }

  const host = window.location.hostname.trim();
  if (!host || host === "127.0.0.1" || host === "localhost") {
    return "127.0.0.1 va localhost";
  }

  return `${host}, 127.0.0.1 va localhost`;
}
