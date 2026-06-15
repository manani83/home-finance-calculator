import { buildIndexNowPayload, isValidIndexNowKey } from "../src/lib/indexnow";
import { getPublicUrls } from "../src/lib/public-urls";

const key = process.env.INDEXNOW_KEY;
if (!isValidIndexNowKey(key)) {
  throw new Error("INDEXNOW_KEY must be set to 8 to 128 hexadecimal characters.");
}

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify(buildIndexNowPayload(key, getPublicUrls())),
});

if (!response.ok) {
  throw new Error(`IndexNow submission failed with status ${response.status}.`);
}

console.log(`Submitted ${getPublicUrls().length} URLs to IndexNow.`);
