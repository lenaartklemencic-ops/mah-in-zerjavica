# Mah in žerjavica — production audit

## Stabilna osnova

Glavna produkcijska pot uporablja vsebinsko bogato 2D različico. Kratki Phaser vertical slice je izoliran na `prototype.html` in ne more več nadomestiti glavne igre.

## Vključeni sistemi

- pet povezanih folklornih questov z nagradnimi zasloni;
- velik svet 220 × 130 logičnih ploščic z gozdovi, reko, polji, gorami, močvirjem in ruševinami;
- Kresnikovo s 36 osrednjimi stavbami in več kot 40 poimenovanimi NPC-ji;
- goblini, tri vrste trolov, volkovi, srne, jamska in folklorna bitja;
- 14 vhodov v stavbe oziroma podzemna območja;
- inventory, oprema, XP, skilli, zemljevid, bestiarij in izročilo;
- bronasta, železna, jeklena, črna, mitrilna, adamantna, runska in legendarna stopnja orožja;
- trije save sloti, samodejno shranjevanje, nova igra in nalaganje;
- hiter zaporedni boj, smerni napadalni lok, hit-stop, delci, številke škode ter ločena zvoka zamaha in zadetka;
- regionalna glasba, ambientalni zvoki, dinamično vreme in dnevno-nočni cikel;
- nastavitve vremenskih učinkov in tresenja zaslona.

## Art direction

Produkcija uporablja enotnejši ročno slikan atlas slovensko-srednjeevropskih hiš in folklornih objektov. Paleta je zadržana: mah, preperel les, apnen omet, skrilavec, zamolkla rja in topla žerjavica. Izogiba se sijočemu mobilnemu videzu.

## QA

Za regresijsko preverjanje zaženi `node scripts/qa.mjs`. Pred produkcijsko objavo morajo prestati tudi sintaktični pregled vseh skript, validacija `vercel.json` in brskalniški smoke test menija, zemljevida, dnevnika nalog ter konzole.
