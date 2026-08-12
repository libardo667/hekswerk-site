import {readdirSync, readFileSync, statSync} from 'node:fs';
import path from 'node:path';

const buildRoot = path.resolve(process.cwd(), 'build');
const siteUrl = 'https://www.hekswerk.com';
const socialImage = `${siteUrl}/img/hekswerk-social-card.png`;
const routes = [
  {
    route: '/',
    file: 'index.html',
    title: 'Operations automation for professional-service teams | Hekswerk',
    description:
      "The Operations Automation Sprint is Hekswerk's primary commercial offer. A bounded build for one recurring internal workflow, deployed into systems the client controls.",
  },
  {
    route: '/work',
    file: 'work.html',
    title: 'Operations Automation Sprint | Hekswerk',
    description:
      'Operations Automation Sprint: A bounded build for one recurring internal workflow, deployed into systems the client controls.',
  },
  {
    route: '/work/selected-work',
    file: 'work/selected-work.html',
    title: 'Selected work | Hekswerk',
    description: 'Professional work, independent engineering, and open research with explicit provenance and limits.',
  },
  {
    route: '/research',
    file: 'research.html',
    title: 'Engineering and research | Hekswerk',
    description:
      "Hekswerk's independent engineering and open research, including EvoGen, Kenshi Agent Environment, and WorldWeaver.",
  },
  {
    route: '/about',
    file: 'about.html',
    title: 'About | Hekswerk',
    description:
      "About Levi Banks, the working method behind Hekswerk, and the practice's contract and public systems work.",
  },
  {
    route: '/contact',
    file: 'contact.html',
    title: 'Contact | Hekswerk',
    description: 'Contact Hekswerk about an Operations Automation Sprint, research, or another inquiry.',
  },
  {
    route: '/privacy',
    file: 'privacy.html',
    title: 'Privacy | Hekswerk',
    description: 'Plain-language privacy and data-handling information for the Hekswerk website and contact form.',
  },
];

const failures = [];
const fail = (message) => failures.push(message);
const decode = (value) =>
  value.replaceAll('&amp;', '&').replaceAll('&quot;', '"').replaceAll('&#x27;', "'").replaceAll('&#39;', "'");
const textFromHtml = (html) =>
  decode(
    html
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim(),
  );

function expectIncludes(html, value, label) {
  if (!html.includes(value)) fail(label);
}

function htmlForRoute(route) {
  const entry = routes.find((candidate) => candidate.route === route);
  if (!entry) return null;
  return readFileSync(path.join(buildRoot, entry.file), 'utf8');
}

function routeFile(pathname) {
  if (pathname === '/') return path.join(buildRoot, 'index.html');
  const relative = pathname.replace(/^\//, '');
  const htmlFile = path.join(buildRoot, `${relative}.html`);
  const indexFile = path.join(buildRoot, relative, 'index.html');
  if (statSafe(htmlFile)) return htmlFile;
  if (statSafe(indexFile)) return indexFile;
  return null;
}

function statSafe(file) {
  try {
    return statSync(file).isFile();
  } catch {
    return false;
  }
}

function filesBelow(directory) {
  return readdirSync(directory, {withFileTypes: true}).flatMap((entry) => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? filesBelow(file) : [file];
  });
}

function extractJsonLd(html, file) {
  const blocks = [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>(.*?)<\/script>/g)].map(
    (match) => match[1],
  );
  return blocks.flatMap((block, index) => {
    try {
      return [JSON.parse(block)];
    } catch (error) {
      fail(`${file}: JSON-LD block ${index + 1} is invalid: ${error.message}`);
      return [];
    }
  });
}

for (const entry of routes) {
  const file = path.join(buildRoot, entry.file);
  if (!statSafe(file)) {
    fail(`${entry.route}: missing ${entry.file}`);
    continue;
  }
  const html = readFileSync(file, 'utf8');
  const canonical = `${siteUrl}${entry.route}`;
  if (!html.toLowerCase().includes('<!doctype html>')) fail(`${entry.route}: malformed document`);
  expectIncludes(html, `<title>${entry.title}</title>`, `${entry.route}: title`);
  expectIncludes(html, `name="description" content="${entry.description}"`, `${entry.route}: description`);
  expectIncludes(html, `rel="canonical" href="${canonical}"`, `${entry.route}: canonical`);
  expectIncludes(html, `property="og:url" content="${canonical}"`, `${entry.route}: Open Graph URL`);
  expectIncludes(html, `property="og:title" content="${entry.title}"`, `${entry.route}: Open Graph title`);
  expectIncludes(
    html,
    `property="og:description" content="${entry.description}"`,
    `${entry.route}: Open Graph description`,
  );
  expectIncludes(html, `property="og:image" content="${socialImage}"`, `${entry.route}: Open Graph image`);
  expectIncludes(html, `name="twitter:image" content="${socialImage}"`, `${entry.route}: Twitter image`);
  expectIncludes(html, 'name="twitter:card" content="summary_large_image"', `${entry.route}: Twitter card`);
  expectIncludes(html, 'name="referrer" content="strict-origin-when-cross-origin"', `${entry.route}: referrer policy`);
  if (/data-cf-beacon|cloudflareinsights\.com/.test(html)) fail(`${entry.route}: client-side analytics remains`);

  const jsonLd = extractJsonLd(html, entry.file);
  const graph = jsonLd.find((block) => Array.isArray(block['@graph']));
  if (!graph?.['@graph'].some((item) => item['@type'] === 'Organization' && item.name === 'Hekswerk')) {
    fail(`${entry.route}: Organization JSON-LD`);
  }
  if (!graph?.['@graph'].some((item) => item['@type'] === 'WebSite' && item.name === 'Hekswerk')) {
    fail(`${entry.route}: WebSite JSON-LD`);
  }
  if (entry.route === '/about' && !jsonLd.some((item) => item['@type'] === 'Person' && item.name === 'Levi Banks')) {
    fail('/about: Person JSON-LD');
  }
  if (
    entry.route === '/work' &&
    !jsonLd.some((item) => item['@type'] === 'Service' && item.name === 'Operations Automation Sprint')
  ) {
    fail('/work: Service JSON-LD');
  }
}

const notFoundHtml = readFileSync(path.join(buildRoot, '404.html'), 'utf8');
expectIncludes(notFoundHtml, '<title>Page not found | Hekswerk</title>', '404: title');
expectIncludes(notFoundHtml, 'name="robots" content="noindex"', '404: noindex');
expectIncludes(notFoundHtml, 'There is nothing at this address.', '404: public explanation');
if (notFoundHtml.includes('rel="canonical"')) fail('404: canonical URL must be absent');
if (/data-cf-beacon|cloudflareinsights\.com/.test(notFoundHtml)) fail('404: client-side analytics remains');

const builtFiles = filesBelow(buildRoot);
for (const file of builtFiles.filter((candidate) => ['.html', '.css', '.js'].includes(path.extname(candidate)))) {
  const contents = readFileSync(file, 'utf8');
  if (/fonts\.(?:googleapis|gstatic)\.com/.test(contents)) {
    fail(`${path.relative(buildRoot, file)}: remote Google Fonts reference remains`);
  }
  if (/data-cf-beacon|cloudflareinsights\.com|sessionStorage|localStorage/.test(contents)) {
    fail(`${path.relative(buildRoot, file)}: client-side tracking or browser storage remains`);
  }
}
if (builtFiles.filter((file) => path.extname(file) === '.woff2').length === 0) fail('locally bundled WOFF2 fonts');
const builtCss = builtFiles
  .filter((file) => path.extname(file) === '.css')
  .map((file) => readFileSync(file, 'utf8'))
  .join('\n');
expectIncludes(builtCss, 'Outfit Variable', 'compiled CSS: local Outfit family');
expectIncludes(builtCss, 'Fraunces Variable', 'compiled CSS: local Fraunces family');
if (!statSafe(path.join(buildRoot, 'fonts/OFL-1.1.txt'))) fail('bundled font license');

const privacyHtml = htmlForRoute('/privacy');
for (const phrase of [
  'Who is responsible',
  'What the contact form collects',
  'Cloudflare Worker',
  'Network Error Logging',
  'Resend',
  'Microsoft 365',
  'Your data-protection rights',
  'No automated decision about your inquiry',
  'does not by itself establish a client relationship',
]) {
  expectIncludes(privacyHtml, phrase, `/privacy: ${phrase}`);
}
const workHtml = htmlForRoute('/work');
const homeHtml = htmlForRoute('/');
for (const phrase of [
  'Do not send passwords',
  'narrowly scoped credentials',
  'Access is revoked or transferred',
  'The EU AI Act and European data-protection law are separate checks',
  'Hekswerk does not certify EU AI Act or privacy compliance',
]) {
  expectIncludes(workHtml, phrase, `/work data handling: ${phrase}`);
}

const homeText = textFromHtml(homeHtml);
const workText = textFromHtml(workHtml);
for (const phrase of [
  'Most Operations Automation Sprints start at $3,500.',
  'Paid Workflow Scoping is $750 when the workflow needs more definition',
  'the scoping fee is credited toward an accepted build',
]) {
  expectIncludes(homeText, phrase, `/: pricing: ${phrase}`);
}
for (const phrase of [
  '$3,500',
  '$750 paid Workflow Scoping',
  '$6,500+ custom integration or system work',
  'Workflow Scoping does not include implementation.',
  'the full $750 scoping fee is credited toward that build',
  'the client does not pay $750 on top of the accepted build price',
  'Sending an initial inquiry remains free.',
]) {
  expectIncludes(workText, phrase, `/work pricing: ${phrase}`);
}
for (const [route, html] of [
  ['/', homeHtml],
  ['/work', workHtml],
]) {
  expectIncludes(html, 'href="/contact?topic=automation"', `${route}: primary automation inquiry route`);
}

const publicHtml = routes.map(({route}) => htmlForRoute(route)).join('\n');
for (const retiredPricingFragment of [
  `$${'1,500'}`,
  `$${'2,500'}`,
  ['founding', 'client'].join('-'),
  ['qualifying', 'founding', 'client'].join(' '),
]) {
  if (publicHtml.toLowerCase().includes(retiredPricingFragment.toLowerCase())) {
    fail(`built public site: retired pricing language remains: ${retiredPricingFragment}`);
  }
}
for (const {route} of routes.filter(({route}) => !['/', '/work'].includes(route))) {
  if (htmlForRoute(route).includes('$750')) fail(`${route}: $750 appears outside paid Workflow Scoping`);
}

const image = readFileSync(path.join(buildRoot, 'img/hekswerk-social-card.png'));
if (image.toString('ascii', 1, 4) !== 'PNG' || image.readUInt32BE(16) !== 1200 || image.readUInt32BE(20) !== 630) {
  fail('social image must be a 1200x630 PNG');
}

for (const retiredPagesFile of ['CNAME', '.nojekyll', '.assetsignore']) {
  if (statSafe(path.join(buildRoot, retiredPagesFile))) {
    fail(`retired GitHub Pages artifact remains: ${retiredPagesFile}`);
  }
}
const headers = readFileSync(path.join(buildRoot, '_headers'), 'utf8');
if (/cloudflareinsights\.com/.test(headers)) fail('_headers: retired client-side analytics origin remains');
for (const value of [
  'Content-Security-Policy:',
  'Cache-Control: public, max-age=0, must-revalidate, no-transform',
  'X-Content-Type-Options: nosniff',
  'X-Frame-Options: DENY',
  'Strict-Transport-Security: max-age=31536000',
  'https://:worker.levi-020.workers.dev/*',
  'X-Robots-Tag: noindex, nofollow',
  '/_astro/*',
  'Cache-Control: public, max-age=31536000, immutable, no-transform',
]) {
  expectIncludes(headers, value, `_headers: ${value}`);
}
const redirects = readFileSync(path.join(buildRoot, '_redirects'), 'utf8');
expectIncludes(redirects, '/contact.html /contact 301', '_redirects: contact compatibility');
expectIncludes(redirects, '/index.html / 301', '_redirects: index canonicalization');
const expectedRobots = `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap-index.xml\n`;
if (readFileSync(path.join(buildRoot, 'robots.txt'), 'utf8') !== expectedRobots) fail('robots.txt');
const sitemapIndex = readFileSync(path.join(buildRoot, 'sitemap-index.xml'), 'utf8');
expectIncludes(sitemapIndex, `${siteUrl}/sitemap-0.xml`, 'sitemap index');
const sitemap = readFileSync(path.join(buildRoot, 'sitemap-0.xml'), 'utf8');
for (const {route} of routes) {
  const location = route === '/' ? siteUrl : `${siteUrl}${route}`;
  expectIncludes(sitemap, `<loc>${location}</loc>`, `sitemap: ${route}`);
}
if (/\/worldweaver(?:<|\/)/.test(sitemap)) fail('sitemap: retired WorldWeaver route remains');

const builtWorldweaver = readdirSync(buildRoot).filter((name) => name.toLowerCase().startsWith('worldweaver'));
if (builtWorldweaver.length > 0) fail(`retired WorldWeaver output remains: ${builtWorldweaver.join(', ')}`);

for (const entry of routes) {
  const sourceHtml = htmlForRoute(entry.route);
  for (const match of sourceHtml.matchAll(/<a\b[^>]*\bhref=(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g)) {
    const href = decode(match[1] || match[2] || match[3] || '');
    if (!href || /^(?:https?:|mailto:|tel:|javascript:)/.test(href)) continue;
    const resolved = new URL(href, `${siteUrl}${entry.route}`);
    const targetFile = routeFile(resolved.pathname);
    if (!targetFile) {
      fail(`${entry.route}: broken internal link ${href}`);
      continue;
    }
    if (resolved.hash) {
      const id = decodeURIComponent(resolved.hash.slice(1));
      const targetHtml = readFileSync(targetFile, 'utf8');
      const escaped = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      if (!new RegExp(`(?:id|name)=(?:"${escaped}"|'${escaped}'|${escaped}(?:[\\s>]))`).test(targetHtml)) {
        fail(`${entry.route}: missing anchor ${href}`);
      }
    }
  }
}

const sourceExtensions = new Set(['.css', '.html', '.js', '.jsx', '.mjs', '.svg']);
function scanPublicSource(directory) {
  for (const entry of readdirSync(directory, {withFileTypes: true})) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) scanPublicSource(file);
    else if (sourceExtensions.has(path.extname(file)) && readFileSync(file, 'utf8').includes('—')) {
      fail(`${path.relative(process.cwd(), file)}: em dash in public source`);
    }
  }
}
scanPublicSource(path.resolve(process.cwd(), 'src'));
scanPublicSource(path.resolve(process.cwd(), 'site'));
scanPublicSource(path.resolve(process.cwd(), 'static'));
if (readFileSync(path.resolve(process.cwd(), 'astro.config.mjs'), 'utf8').includes('—')) {
  fail('astro.config.mjs: em dash in public source');
}
const packageManifest = readFileSync(path.resolve(process.cwd(), 'package.json'), 'utf8');
if (packageManifest.toLowerCase().includes('docusaurus')) {
  fail('package.json: retired Docusaurus dependency or command remains');
}
const siteWorkerConfig = readFileSync(path.resolve(process.cwd(), 'workers/site/wrangler.jsonc'), 'utf8');
for (const value of [
  '"name": "hekswerk-site"',
  '"directory": "../../build"',
  '"html_handling": "drop-trailing-slash"',
  '"not_found_handling": "404-page"',
  '"pattern": "www.hekswerk.com"',
  '"custom_domain": true',
]) {
  expectIncludes(siteWorkerConfig, value, `site Worker configuration: ${value}`);
}
if (/account_id|api_token/i.test(siteWorkerConfig)) fail('site Worker configuration: account identifier or token key');

if (failures.length > 0) {
  console.error(`Built-site check failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log(
    `Built-site check passed for ${routes.length} routes: metadata, JSON-LD, links, anchors, local fonts, privacy boundaries, social image, deployment files, prose, and retired routes.`,
  );
}
