# Vizualni in level-design audit — 22. avgust 2026

Pregledani so bili produkcijski začetni gozd, inventar, boj, zemljevid, programska postavitev Jelševe vasi, Kresnikovega, reke ter notranjosti. Audit ne meri prisotnosti funkcije, temveč njeno prostorsko logiko, berljivost in slogovno skladnost.

## P0 — neuporabno ali nelogično

### P0.1 Stavbe nimajo parcelnega sistema

- Lokacija: Kresnikovo in njegov zunanji obroč.
- Napaka: stavbe so podane kot seznam koordinat; umestitev ne preveri reke, cest, druge stavbe, vhoda ali prostega prostora.
- Zakaj: vizualni renderer in level-design podatki so ista monolitna funkcija.
- Vpliv: hiše lahko stojijo v vodi, na cesti ali druga čez drugo; igralec ne razume mesta.
- Popravek: ročno načrtovane parcele s poligonom stavbe, vhodom, dostopno potjo in validacijo prekrivanj.
- Preverjanje: noben footprint ne seka sloja vode/ceste; od vsakega vhoda obstaja prehodna pot do cestnega omrežja.

### P0.2 Prikaz in kolizije stavb se ne ujemajo

- Lokacija: vsa naselja.
- Napaka: `solidAt` preverja vodo, NPC-je in vire, ne pa hiš.
- Zakaj: stavbe so samo risarski ukazi brez podatkovnega objekta.
- Vpliv: igralec lahko hodi skozi hiše; vrata nimajo prostorskega pomena.
- Popravek: podatkovni objekti stavb z `bounds`, `door`, `depth`, `collision` in `interaction`.
- Preverjanje: igralec ne prečka sten, lahko pa doseže vsaka vrata brez zatikanja.

### P0.3 Svet nima zanesljive prostorske hierarhije

- Lokacija: celotna mapa.
- Napaka: poti so dolgi pravokotni pasovi, regije pa velike barvne površine brez naravnih prehodov.
- Zakaj: svet generirajo logični pogoji nad koordinatami, ne avtorski sloji.
- Vpliv: orientacija je slaba in potovanje deluje kot hoja po debug zemljevidu.
- Popravek: ločeni sloji terrain/water/shore/path/structures/decor/collision/interactions in ročno načrtovane glavne poti.
- Preverjanje: igralec lahko po silhueti terena prepozna smer in vrsto območja tudi brez UI-ja.

## P1 — večje nedoslednosti

### P1.1 Nezdružljivi vizualni jeziki

- Lokacija: gozdovi in Kresnikovo.
- Napaka: visoko podrobne slikarske hiše in drevesa stojijo ob preprostih canvas likih, emoji ikonah in geometrijskem terenu.
- Vpliv: elementi delujejo prilepljeno in nimajo skupnega sveta.
- Popravek: omejena paleta, enaka količina detajla, enotna 3/4 perspektiva in preproste silhuete za vse kategorije.
- Preverjanje: zamegljena slika prizora še vedno kaže jasno skupno perspektivo in merilo.

### P1.2 Voda je mrtva površina

- Lokacija: glavna reka in jezero.
- Napaka: enobarvne ploščice z nekaj ponavljajočimi se črtami; ni obale, globine, toka ali odziva na vreme.
- Vpliv: reka ni orientacijska značilnost in ne deluje kot naravna ovira.
- Popravek: organski bregovi, trije barvni pasovi globine, počasni tokovi, odsevi, plitvine, skale, trstičje, mostovi in dežne motnje.
- Preverjanje: mirna voda, tok, plitvina in breg so razločljivi brez oznak.

### P1.3 Merilo ni dosledno

- Lokacija: svetovni objekti.
- Napaka: nove hiše so veliko podrobnejše in optično težje od lika; drevesa imajo drugačno stopnjo realizma in sence.
- Vpliv: lik deluje kot ikona nad ilustracijo.
- Popravek: 32 px navigacijska celica, 44 px lik, 72–96 px krošnja, 96–144 px fasada; vsaka silhueta največ tri ravni detajla.
- Preverjanje: vrata so 1,25–1,5 višine lika; deblo in vrata imata primerljivo risarsko ločljivost.

### P1.4 Notranjosti so preoblečena ista soba

- Lokacija: hiše in jame.
- Napaka: večina uporablja enako pravokotno mrežo, isti izhod in skrinjo.
- Vpliv: raziskovanje nima presenečenj ali prostorske zgodbe.
- Popravek: avtorski tlorisi, tri povezane sobe, stranska pot, skrivnost in unikatna nevarnost.
- Preverjanje: vsako pomembno notranjost je mogoče prepoznati brez naslova lokacije.

### P1.5 Dež in noč zmanjšata berljivost

- Lokacija: vsi zunanji prizori.
- Napaka: temen filter prekriva že temno paleto; pomembni objekti nimajo vrednostnega kontrasta.
- Vpliv: interakcije in sovražnike je težko videti.
- Popravek: minimalna svetlost igralne ravnine, lokalna topla svetloba in dež le v osprednjem/srednjem sloju.
- Preverjanje: igralec, sovražnik, vhod in pot ostanejo razpoznavni v grayscale posnetku.

## P2 — polish

- Zmanjšati permanentna imena nad vsakim NPC-jem; uporabiti ime ob bližini.
- Emoji ikone zamenjati z enotnimi 16–24 px risanimi ikonami.
- Dodati prehodne obalne ploščice in mehke robove poti.
- Zmanjšati količino UI-okvirjev in povečati kontrast aktivnega elementa.
- Animirati le pomenljive podrobnosti: tok, ogenj, veter, korak in zadetek.
- Zemljevid preoblikovati iz pravokotnih pasov v ročno risano topologijo.

## Odločitev

Novi slikarski atlas se ne prenese v laboratorije. Laboratoriji začnejo iz nič s preprostejšim OSRS-navdihnjenim jezikom. V produkcijo se ne prenese nič, dokler vseh šest prizorov ne uporablja istega merila in dokler ni posamezen laboratorij vizualno potrjen.
