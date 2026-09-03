/** Android devices cannot install the iOS-only OnTimer app. */
export function isAndroidUserAgent(userAgent: string): boolean {
  return /Android/i.test(userAgent);
}
