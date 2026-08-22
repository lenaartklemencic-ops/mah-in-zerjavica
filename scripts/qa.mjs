import fs from 'node:fs';

const game = fs.readFileSync(new URL('../js/game.js', import.meta.url), 'utf8');
const html = fs.readFileSync(new URL('../legacy.html', import.meta.url), 'utf8');
const vercel = JSON.parse(fs.readFileSync(new URL('../vercel.json', import.meta.url), 'utf8'));

const checks = [];
const check = (name, condition) => checks.push({ name, condition: Boolean(condition) });

for (const title of [
  'Tri barve prepira',
  'Srebrni glas Zlatoroga',
  'Velesova senca',
  'Perunov ukradeni grom',
  'Nevesta iz globine'
]) check(`quest: ${title}`, game.includes(title));

for (const cave of ['velesCave', 'kresnikSewer', 'matjazCave', 'ajdTomb', 'trollMine', 'vilenica'])
  check(`interior: ${cave}`, game.includes(cave));

for (const tier of ['ironSword', 'steelSword', 'blackSword', 'mithrilSword', 'adamantSword', 'runeSword', 'dragonSword'])
  check(`weapon tier: ${tier}`, game.includes(tier));

check('unified vector art', !game.includes('world-v4-folklore-atlas.png') && game.includes('const cityPlots='));
check('validated building collisions', game.includes('for(const h of cityPlots)'));
check('continuous hydrology', game.includes('drawHydrology()'));
check('spam-hit combat', game.includes("keys[' ']"));
check('hit sound', game.includes("A.play('hit')"));
check('save slots', game.includes("'mah-save-'"));
check('day/night clock', game.includes("ui.clock.textContent"));
check('weather settings', game.includes('weatherFx'));
check('inventory panel', html.includes('id="inventory"'));
check('skills panel', html.includes('id="skillList"'));
check('quest journal', html.includes('id="questTitle"'));
check('map', html.includes('id="mapOverlay"'));
check('single-player menu', ['continueBtn','loadBtn','menuNewBtn','settingsBtn','creditsBtn'].every(id => html.includes(`id="${id}"`)));
check('production route', vercel.rewrites?.some(rule => rule.source === '/' && rule.destination === '/legacy.html'));

const failures = checks.filter(item => !item.condition);
for (const item of checks) console.log(`${item.condition ? 'PASS' : 'FAIL'}  ${item.name}`);
console.log(`\n${checks.length - failures.length}/${checks.length} checks passed.`);
if (failures.length) process.exit(1);
