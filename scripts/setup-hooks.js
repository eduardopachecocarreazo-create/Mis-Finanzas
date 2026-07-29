import { execSync } from 'node:child_process';

try {
  execSync('git config core.hooksPath .githooks', { stdio: 'inherit' });
  console.log('Git hooks configurados (.githooks) — bundle.js se recompilará solo en cada commit.');
} catch (err) {
  console.warn('No se pudo configurar el hook de git automáticamente:', err.message);
}
