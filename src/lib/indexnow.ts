import { siteUrl } from "./site-config";

export function isValidIndexNowKey(key: string | undefined): key is string {
  return typeof key === "string" && /^[a-fA-F0-9]{8,128}$/.test(key);
}

export function buildIndexNowPayload(key: string, urlList: string[]) {
  if (!isValidIndexNowKey(key)) throw new Error("INDEXNOW_KEY must be 8 to 128 hexadecimal characters.");

  return {
    host: new URL(siteUrl).host,
    key,
    keyLocation: `${siteUrl}/${key}.txt`,
    urlList,
  };
}

export function indexNowKeyResponse(requestedFile: string, configuredKey: string | undefined) {
  if (!isValidIndexNowKey(configuredKey) || requestedFile !== `${configuredKey}.txt`) {
    return { status: 404, body: "Not found" } as const;
  }
  return { status: 200, body: configuredKey } as const;
}
