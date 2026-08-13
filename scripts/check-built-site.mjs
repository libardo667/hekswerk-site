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
    route: '/work/brief',
    file: 'work/brief.html',
    title: 'Referral brief | Hekswerk',
    description: 'A one-page brief for the Hekswerk Operations Automation Sprint.',
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
  if (/data-cf-beacon|cloudflareinsights\.com/.test(html)) fail(`${entry.route}: third-party analytics remains`);

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
if (/data-cf-beacon|cloudflareinsights\.com/.test(notFoundHtml)) fail('404: third-party analytics remains');

const builtFiles = filesBelow(buildRoot);
for (const file of builtFiles.filter((candidate) => ['.html', '.css', '.js'].includes(path.extname(candidate)))) {
  const contents = readFileSync(file, 'utf8');
  if (/fonts\.(?:googleapis|gstatic)\.com/.test(contents)) {
    fail(`${path.relative(buildRoot, file)}: remote Google Fonts reference remains`);
  }
  if (/data-cf-beacon|cloudflareinsights\.com|sessionStorage|localStorage/.test(contents)) {
    fail(`${path.relative(buildRoot, file)}: unapproved third-party tracking or browser storage remains`);
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
  'five bounded conversion events',
  'Workers Analytics Engine for three months',
  'never receives a name, email address',
]) {
  expectIncludes(privacyHtml, phrase, `/privacy: ${phrase}`);
}
const workHtml = htmlForRoute('/work');
const briefHtml = htmlForRoute('/work/brief');
const homeHtml = htmlForRoute('/');
const researchHtml = htmlForRoute('/research');
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
const briefText = textFromHtml(briefHtml);
for (const phrase of [
  'I turn one repetitive internal workflow into a tested automation',
  'Route new inquiries',
  'Reconcile documents',
  'Build recurring reports',
  'Repair brittle automations',
  'What the sprint contains',
  'Most Operations Automation Sprints start here.',
  'Your accounts, credentials, data, documentation, and resulting system stay yours.',
  'Paid employer work, not a Hekswerk client result.',
  'www.hekswerk.com/contact',
]) {
  expectIncludes(briefText, phrase, `/work/brief: ${phrase}`);
}
if ((briefHtml.match(/class="brief-example"/g) || []).length !== 4) {
  fail('/work/brief: expected exactly four recognizable workflow examples');
}
for (const [route, html] of [
  ['/', homeHtml],
  ['/work', workHtml],
]) {
  expectIncludes(html, 'href="/contact?topic=automation"', `${route}: primary automation inquiry route`);
}
expectIncludes(
  researchHtml,
  'href="https://github.com/libardo667/worldweaver/blob/43eae31093ac941bc3335d6ab95d3b38409942ea/docs/index.md"',
  '/research: pinned WorldWeaver documentation',
);

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
for (const {route} of routes.filter(({route}) => !['/', '/work', '/work/brief'].includes(route))) {
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
if (/cloudflareinsights\.com/.test(headers)) fail('_headers: retired third-party analytics origin remains');
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
expectIncludes(
  packageManifest,
  '"metrics:weekly": "node --env-file-if-exists=.env scripts/weekly-metrics.mjs"',
  'package.json: local weekly metrics command',
);
expectIncludes(
  packageManifest,
  '"metrics:weekly:save": "bash scripts/save-weekly-metrics.sh"',
  'package.json: private weekly metrics capture command',
);
const gitignore = readFileSync(path.resolve(process.cwd(), '.gitignore'), 'utf8');
for (const value of ['.env\n', '.env.*\n', '!.env.example\n', '.metrics-reports/\n']) {
  expectIncludes(gitignore, value, `.gitignore: ${value.trim()}`);
}
if (!statSafe(path.resolve(process.cwd(), '.env.example'))) fail('local metrics environment template');
for (const scheduledMetricsFile of ['scripts/save-weekly-metrics.sh', 'scripts/install-windows-metrics-task.ps1']) {
  if (!statSafe(path.resolve(process.cwd(), scheduledMetricsFile)))
    fail(`scheduled metrics helper: ${scheduledMetricsFile}`);
}
const savedMetricsSource = readFileSync(path.resolve(process.cwd(), 'scripts/save-weekly-metrics.sh'), 'utf8');
for (const value of ['umask 077', '.metrics-reports', 'npm run --silent metrics:weekly', 'chmod 600']) {
  expectIncludes(savedMetricsSource, value, `private metrics capture: ${value}`);
}
const taskInstallerSource = readFileSync(
  path.resolve(process.cwd(), 'scripts/install-windows-metrics-task.ps1'),
  'utf8',
);
for (const value of [
  'Hekswerk Weekly Metrics',
  'Ubuntu-22.04',
  'Monday',
  '09:00',
  'StartWhenAvailable',
  'AllowStartIfOnBatteries',
  'DontStopIfGoingOnBatteries',
  'run-weekly-metrics.ps1',
]) {
  expectIncludes(taskInstallerSource, value, `Windows metrics task installer: ${value}`);
}
const siteWorkerConfig = readFileSync(path.resolve(process.cwd(), 'workers/site/wrangler.jsonc'), 'utf8');
for (const value of [
  '"name": "hekswerk-site"',
  '"main": "./worker.js"',
  '"directory": "../../build"',
  '"binding": "ASSETS"',
  '"run_worker_first": ["/_metrics"]',
  '"binding": "METRICS"',
  '"dataset": "hekswerk_conversion_metrics"',
  '"html_handling": "drop-trailing-slash"',
  '"not_found_handling": "404-page"',
  '"pattern": "www.hekswerk.com"',
  '"custom_domain": true',
]) {
  expectIncludes(siteWorkerConfig, value, `site Worker configuration: ${value}`);
}
if (/account_id|api_token/i.test(siteWorkerConfig)) fail('site Worker configuration: account identifier or token key');

const siteWorkerSource = readFileSync(path.resolve(process.cwd(), 'workers/site/worker.js'), 'utf8');
for (const value of [
  "url.pathname !== '/_metrics'",
  'env.ASSETS.fetch(request)',
  'env.METRICS.writeDataPoint',
  "'work_view'",
  "'selected_work_view'",
  "'contact_cta_click'",
  "'automation_form_started'",
  "'automation_form_submitted'",
]) {
  expectIncludes(siteWorkerSource, value, `site metric Worker: ${value}`);
}
for (const forbidden of ['payload.name', 'payload.email', 'payload.message', 'payload.organization']) {
  if (siteWorkerSource.includes(forbidden)) fail(`site metric Worker: forbidden analytics field ${forbidden}`);
}

if (failures.length > 0) {
  console.error(`Built-site check failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log(
    `Built-site check passed for ${routes.length} routes: metadata, JSON-LD, links, anchors, local fonts, privacy and metric boundaries, social image, deployment files, prose, and retired routes.`,
  );
}
