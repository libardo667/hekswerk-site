import {createReadStream, existsSync, statSync} from 'node:fs';
import {createServer} from 'node:http';
import path from 'node:path';

const buildRoot = path.resolve(process.cwd(), 'build');
const port = Number(process.env.PORT || 4173);
const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml; charset=utf-8',
};
const securityHeaders = {
  'Content-Security-Policy':
    "default-src 'self'; base-uri 'self'; connect-src 'self' https://hekswerk-intake.levi-020.workers.dev; font-src 'self'; form-action 'none'; frame-ancestors 'none'; img-src 'self' data:; object-src 'none'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; upgrade-insecure-requests",
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Permissions-Policy': 'camera=(), geolocation=(), microphone=(), payment=(), usb=()',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
};

function resolveRequest(pathname) {
  const decoded = decodeURIComponent(pathname);
  const relative = decoded === '/' ? 'index.html' : decoded.replace(/^\//, '');
  const candidates = path.extname(relative) ? [relative] : [`${relative}.html`, path.join(relative, 'index.html')];

  for (const candidate of candidates) {
    const absolute = path.resolve(buildRoot, candidate);
    if (!absolute.startsWith(`${buildRoot}${path.sep}`) || !existsSync(absolute)) continue;
    if (statSync(absolute).isFile()) return absolute;
  }
  return null;
}

createServer((request, response) => {
  const url = new URL(request.url, `http://${request.headers.host || '127.0.0.1'}`);
  const pathname = url.pathname;
  if (pathname === '/contact.html' || pathname === '/index.html') {
    const destination = pathname === '/contact.html' ? '/contact' : '/';
    response.writeHead(301, {...securityHeaders, Location: `${destination}${url.search}`});
    response.end();
    return;
  }
  const file = resolveRequest(pathname);
  if (!file) {
    const fallback = path.join(buildRoot, '404.html');
    response.writeHead(404, {...securityHeaders, 'Content-Type': 'text/html; charset=utf-8'});
    if (existsSync(fallback)) createReadStream(fallback).pipe(response);
    else response.end('Not found');
    return;
  }

  response.writeHead(200, {
    ...securityHeaders,
    'Content-Type': contentTypes[path.extname(file)] || 'application/octet-stream',
  });
  createReadStream(file).pipe(response);
}).listen(port, '127.0.0.1', () => {
  console.log(`Serving build on http://127.0.0.1:${port}`);
});
