/* global AbortSignal, fetch, console, process */
import { URL } from "node:url";

const sites = [
  { name: "Ukrainian Modernism", url: "https://ukrmodernism.abvx.xyz", finalPath: "/fr" },
  { name: "Toki Free Kit", url: "https://toki-free.abvx.xyz", finalPath: "/en" },
  { name: "Dao Toki", url: "https://dao-toki.abvx.xyz", finalPath: "/en" },
  { name: "Stoic Wisdom Series", url: "https://stoic.abvx.xyz", finalPath: "/en" },
  { name: "AMI Team Publishing", url: "https://books.1d3x.com", finalPath: "/" },
];

const failures = [];

async function check(url, label) {
  try {
    const response = await fetch(url, { redirect: "follow", signal: AbortSignal.timeout(20_000) });
    if (!response.ok) failures.push(`${label}: HTTP ${response.status}`);
    return response;
  } catch (error) {
    failures.push(`${label}: ${error instanceof Error ? error.message : String(error)}`);
    return null;
  }
}

for (const site of sites) {
  const response = await check(site.url, site.name);
  if (response) {
    const finalUrl = new URL(response.url);
    const html = await response.text();
    if (finalUrl.pathname !== site.finalPath) failures.push(`${site.name}: expected ${site.finalPath}, received ${finalUrl.pathname}`);
    if (!/<title>[^<]+<\/title>/i.test(html)) failures.push(`${site.name}: missing document title`);
    if (!/<link[^>]+rel=["']canonical["']/i.test(html)) failures.push(`${site.name}: missing canonical link`);
  }
  await check(`${site.url}/robots.txt`, `${site.name} robots.txt`);
  await check(`${site.url}/sitemap.xml`, `${site.name} sitemap.xml`);
}

if (failures.length) {
  console.error(`Live verification failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Live verification passed for ${sites.length} sites, including robots.txt and sitemap.xml.`);
