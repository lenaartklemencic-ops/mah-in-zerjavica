import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(new URL('../labs', import.meta.url).pathname.replace(/^\/(.:)/, '$1'));
const names = ['water', 'forest', 'town', 'character', 'cave', 'ui'];
const failures = [];

for (const name of names) {
  const file = path.join(root, `${name}-lab.html`);
  const html = fs.readFileSync(file, 'utf8');
  const checks = [
    ['canvas 960x600', html.includes('<canvas width="960" height="600">')],
    ['shared art system', html.includes('shared/lab.css') && html.includes('shared/lab.js')],
    ['lab identity', html.includes(`data-lab="${name}"`)],
    ['acceptance criteria', html.includes('Sprejemni kriterij')]
  ];
  for (const [label, ok] of checks) {
    console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}: ${label}`);
    if (!ok) failures.push(`${name}: ${label}`);
  }
}

const shared = fs.readFileSync(path.join(root, 'shared', 'lab.js'), 'utf8');
for (const token of ['sceneWater','sceneForest','sceneTown','sceneCharacter','sceneCave','sceneUI','weather','sfx']) {
  const ok = shared.includes(`function ${token}`);
  console.log(`${ok ? 'PASS' : 'FAIL'}  shared: ${token}`);
  if (!ok) failures.push(`shared: ${token}`);
}

console.log(`\n${failures.length ? 'FAILED' : 'PASSED'} — ${32 - failures.length}/32 checks.`);
if (failures.length) process.exit(1);
