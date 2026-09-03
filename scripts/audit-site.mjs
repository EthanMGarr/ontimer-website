const origin = (process.env.SITE_AUDIT_ORIGIN ?? "https://www.ontimer.app").replace(/\/$/, "");
const canonicalHostname = new URL(origin).hostname;
const publicOrigin = "https://www.ontimer.app";
const publicHostname = new URL(publicOrigin).hostname;

async function fetchPage(url, options = {}) {
  return fetch(url, {
    redirect: "manual",
    signal: AbortSignal.timeout(20_000),
    headers: { "user-agent": "OnTimer-Site-Audit/1.0" },
    ...options,
  });
}

async function mapLimit(items, limit, worker) {
  const results = new Array(items.length);
  let cursor = 0;
  await Promise.all(Array.from({ length: limit }, async () => {
    while (cursor < items.length) {
      const index = cursor++;
      try {
        results[index] = await worker(items[index]);
      } catch (error) {
        results[index] = { url: items[index], error: String(error) };
      }
    }
  }));
  return results;
}

function extractMetadata(html) {
  const mainHtml = html.match(/<main(?:\s[^>]*)?>([\s\S]*?)<\/main>/i)?.[1] ?? html;
  return {
    canonical: html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i)?.[1]
      ?? html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i)?.[1]
      ?? null,
    robots: html.match(/<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["']/i)?.[1] ?? null,
    hrefs: [...html.matchAll(/<a\s[^>]*href=["']([^"']+)["']/gi)].map((match) => match[1]),
    mainHrefs: [...mainHtml.matchAll(/<a\s[^>]*href=["']([^"']+)["']/gi)].map((match) => match[1]),
  };
}

const toolPaths = {
  medication: "/how-to-remember-medication-on-time",
  airport: "/airport-time-to-leave-calculator",
  leaveTime: "/what-time-should-i-leave",
};

function expectedContentAction(pathname) {
  if (/medication/.test(pathname) && !/^\/(?:how-to-remember-medication-on-time|medication-schedule|provider-medication-schedule|caregiver-medication-schedule|veterinary-medication-schedule)$/.test(pathname)) {
    return { kind: "medication schedule", paths: [toolPaths.medication] };
  }
  if (/airport|flight/.test(pathname) && !/^\/(?:airport-time-to-leave-calculator|airport-time-to-leave\/|airport-time-calculators)/.test(pathname)) {
    return { kind: "airport calculator", paths: [toolPaths.airport] };
  }
  if (/when-should-i-leave|stop-being-late/.test(pathname)) {
    return { kind: "leave-time calculator", paths: [toolPaths.leaveTime] };
  }
  return null;
}

function normalizeInternalHref(href, base) {
  if (!href || /^(?:#|mailto:|tel:|javascript:)/i.test(href)) return null;
  try {
    const url = new URL(href, base);
    const acceptedHostnames = new Set([
      canonicalHostname,
      canonicalHostname.replace(/^www\./, ""),
      publicHostname,
      publicHostname.replace(/^www\./, ""),
    ]);
    if (!acceptedHostnames.has(url.hostname)) return null;
    url.hostname = canonicalHostname;
    url.protocol = new URL(origin).protocol;
    url.port = new URL(origin).port;
    url.hash = "";
    return url.href;
  } catch {
    return null;
  }
}

function canonicalMatches(url, canonical) {
  if (!canonical) return false;
  try {
    const crawled = new URL(url);
    const expected = new URL(crawled.pathname + crawled.search, publicOrigin);
    const actual = new URL(canonical, url);
    expected.search = "";
    expected.hash = "";
    actual.search = "";
    actual.hash = "";
    return expected.href.replace(/\/$/, "") === actual.href.replace(/\/$/, "");
  } catch {
    return false;
  }
}

function usesWrongDestinationRoute(url) {
  return /\/airport-time-to-leave\/.*(?:cruise|portmiami|port-canaveral|port-everglades|galveston|long-beach|manhattan|brooklyn)/i.test(url)
    || /\/cruise-time-to-leave\/.*(?:-atl|-lax|-jfk|-ewr|-ord|-dfw|-den|-sfo|-sea|-las|-mco|-clt|-phx|-iah|-mia|-bos|-msp|-dtw|-phl|-lga|-bwi|-dca|-iad|-fll|-slc|-san|-tpa|-pdx|-hnd|-nrt|-lhr|-cdg|-ams|-fra|-fco|-mad|-bcn|-dxb|-sin|-hkg|-syd|-yyz|-yvr|-mex|-gru)/i.test(url);
}

const sitemapResponse = await fetchPage(`${origin}/sitemap.xml`);
const sitemapXml = await sitemapResponse.text();
const sitemapUrls = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map((match) => match[1].replaceAll("&amp;", "&"))
  .map((url) => {
    const publishedUrl = new URL(url);
    return new URL(publishedUrl.pathname + publishedUrl.search, origin).href;
  });

const sitemapPages = await mapLimit(sitemapUrls, 10, async (url) => {
  const response = await fetchPage(url);
  const html = await response.text();
  return {
    url,
    status: response.status,
    location: response.headers.get("location"),
    contentType: response.headers.get("content-type") ?? "",
    ...extractMetadata(html),
  };
});

const internalUrls = [...new Set(sitemapPages.flatMap((page) =>
  (page.hrefs ?? []).map((href) => normalizeInternalHref(href, page.url)).filter(Boolean)
))];

const internalChecks = await mapLimit(internalUrls, 12, async (url) => {
  let response = await fetchPage(url, { method: "HEAD" });
  if (response.status === 405) response = await fetchPage(url);
  return { url, status: response.status, location: response.headers.get("location") };
});

const sitemapPageByUrl = new Map(sitemapPages.map((page) => [page.url, page]));
const additionalInternalUrls = internalUrls.filter((url) => !sitemapPageByUrl.has(url));
const additionalInternalPages = await mapLimit(additionalInternalUrls, 10, async (url) => {
  const response = await fetchPage(url);
  const contentType = response.headers.get("content-type") ?? "";
  const html = /text\/html/i.test(contentType) ? await response.text() : "";
  return {
    url,
    status: response.status,
    location: response.headers.get("location"),
    contentType,
    ...extractMetadata(html),
  };
});
const publishedHtmlPages = [...sitemapPages, ...additionalInternalPages]
  .filter((page) => page.status === 200 && /text\/html/i.test(page.contentType));

const findings = {
  sitemapFetch: sitemapResponse.status === 200 ? [] : [{ url: `${origin}/sitemap.xml`, status: sitemapResponse.status }],
  sitemapErrors: sitemapPages.filter((page) => page.error || page.status !== 200),
  internalLinkErrors: internalChecks.filter((page) => page.error || page.status >= 400),
  internalRedirects: internalChecks.filter((page) => page.status >= 300 && page.status < 400),
  canonicalIssues: publishedHtmlPages
    .filter((page) => !canonicalMatches(page.url, page.canonical))
    .map(({ url, canonical }) => ({ url, canonical })),
  noindexSitemapPages: sitemapPages
    .filter((page) => /noindex/i.test(page.robots ?? ""))
    .map(({ url, robots }) => ({ url, robots })),
  wrongDestinationRoutes: internalUrls.filter(usesWrongDestinationRoute),
  contentFunnelIssues: publishedHtmlPages.flatMap((page) => {
    const expectedAction = expectedContentAction(new URL(page.url).pathname);
    if (!expectedAction) return [];
    const hasRelevantToolLink = (page.mainHrefs ?? []).some((href) => {
      try {
        return expectedAction.paths.includes(new URL(href, page.url).pathname);
      } catch {
        return false;
      }
    });
    return hasRelevantToolLink ? [] : [{ url: page.url, expectedAction: expectedAction.kind, acceptedPaths: expectedAction.paths }];
  }),
  pageFetchErrors: sitemapPages.filter((page) => page.error),
  linkFetchErrors: internalChecks.filter((page) => page.error),
};

const issueCount = Object.values(findings).reduce((total, issues) => total + issues.length, 0);
const report = {
  origin,
  sitemapUrlCount: sitemapUrls.length,
  internalUrlCount: internalUrls.length,
  issueCount,
  findings,
};

console.log(JSON.stringify(report, null, 2));
process.exitCode = issueCount === 0 ? 0 : 1;
