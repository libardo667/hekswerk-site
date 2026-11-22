import {copyFile, cp, mkdir} from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const output = new URL('build-move/', root);
const fonts = new URL('fonts/', output);

await cp(new URL('workers/move/site/', root), output, {recursive: true});
await mkdir(fonts, {recursive: true});
await copyFile(new URL('static/img/logo_aura.svg', root), new URL('logo_aura.svg', output));

for (const name of ['outfit', 'fraunces']) {
  const source = new URL(`node_modules/@fontsource-variable/${name}/`, root);
  const file = `${name}-latin-wght-normal.woff2`;
  await copyFile(new URL(`files/${file}`, source), new URL(file, fonts));
  await copyFile(new URL('LICENSE', source), new URL(`${name}-LICENSE.txt`, fonts));
}
