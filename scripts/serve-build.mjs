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
  '.xml': 'application/xml; charset=utf-8',
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
  const pathname = new URL(request.url, `http://${request.headers.host || '127.0.0.1'}`).pathname;
  const file = resolveRequest(pathname);
  if (!file) {
    const fallback = path.join(buildRoot, '404.html');
    response.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
    if (existsSync(fallback)) createReadStream(fallback).pipe(response);
    else response.end('Not found');
    return;
  }

  response.writeHead(200, {'Content-Type': contentTypes[path.extname(file)] || 'application/octet-stream'});
  createReadStream(file).pipe(response);
}).listen(port, '127.0.0.1', () => {
  console.log(`Serving build on http://127.0.0.1:${port}`);
});
