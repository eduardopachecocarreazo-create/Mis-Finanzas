import { build } from 'esbuild';
import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

const source = readFileSync('src/app.jsx', 'utf8');
const hash = createHash('sha256').update(source).digest('hex').slice(0, 8);
const date = new Date().toISOString().slice(0, 10);
const version = `${date}-${hash}`;

await build({
  entryPoints: ['src/app.jsx'],
  bundle: true,
  minify: true,
  loader: { '.js': 'jsx' },
  outfile: 'bundle.js',
  define: { __APP_VERSION__: JSON.stringify(version) }
});

const swPath = 'sw.js';
const sw = readFileSync(swPath, 'utf8');
const swUpdated = sw.replace(
  /const CACHE_NAME = '.*?';/,
  `const CACHE_NAME = 'mis-finanzas-${version}';`
);
writeFileSync(swPath, swUpdated);

console.log(`Version: ${version}`);
