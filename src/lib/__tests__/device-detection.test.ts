import assert from "node:assert/strict";
import { isAndroidUserAgent } from "../device-detection";

assert.equal(isAndroidUserAgent("Mozilla/5.0 (Linux; Android 15; Pixel 9) Mobile"), true);
assert.equal(
  isAndroidUserAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Android/15 Chrome/140 Safari/537.36"),
  true,
  "Android desktop-site mode should still be treated as Android"
);
assert.equal(isAndroidUserAgent("Mozilla/5.0 (iPhone; CPU iPhone OS 18_6 like Mac OS X)"), false);
assert.equal(isAndroidUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)"), false);

console.log("device detection tests passed");
