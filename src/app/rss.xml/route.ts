import { cleanSummary } from "@/lib/utils";
import { fetchJson } from "@/lib/api";
import { siteURL, spaceFlightNewsAPI } from "@/lib/variables";
import type { ArticlesAndBlogs } from "../articles/Articles";

export const revalidate = 300;

function xml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const data = await fetchJson<ArticlesAndBlogs>(
    `${spaceFlightNewsAPI}/articles/?limit=30&offset=0`,
    { label: "RSS articles request", revalidate: 300 },
  );

  const items = (data.results || [])
    .map(
      (article) => `
    <item>
      <title>${xml(article.title)}</title>
      <link>${siteURL}/articles/${article.id}</link>
      <guid isPermaLink="true">${siteURL}/articles/${article.id}</guid>
      <description>${xml(cleanSummary(article.summary))}</description>
      <pubDate>${new Date(article.published_at).toUTCString()}</pubDate>
      <source url="${xml(article.url)}">${xml(article.news_site)}</source>
    </item>`,
    )
    .join("");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>News From Space</title>
    <link>${siteURL}</link>
    <description>Spaceflight news, mission updates, and launch coverage.</description>
    <language>en-us</language>${items}
  </channel>
</rss>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
    },
  });
}
