# Art bible — Mah in žerjavica / old-school smer

## Temelj

Izvirna slovenska pustolovščina, ki uporablja oblikovalska načela old-school RPG-jev: jasnost, skromna geometrija, takojšnja berljivost in ročno postavljen svet. Ne kopira assetov, map ali UI-ja igre OSRS.

## Kamera in merilo

- Kamera: ortografski pogled od zgoraj, nagnjen približno 35°; brez izometrične mreže.
- Navigacijska celica: 32 × 32 logičnih pik.
- Igralec: 22 px širok, 44 px visok.
- NPC: 20–26 px širok, 40–46 px visok.
- Navaden sovražnik: 28–44 px; trol 48–64 px.
- Hiša: 96–144 px fasade in največ 150 px višine s streho.
- Vrata: 24–30 px široka in 52–60 px visoka.
- Drevo: 56–76 px široka krošnja in 78–108 px skupne višine.
- Skala: 24–54 px, največ tri združene mase.

## Paleta

Globalnih 24 osnovnih barv. Posamezen objekt uporablja največ 8 barv brez antialias odtenkov:

- mah: `#526b45`, svetlo `#78905d`, senca `#334735`;
- zemlja: `#806c4e`, svetlo `#a08b65`, senca `#594a37`;
- voda: `#426f73`, globina `#31575f`, plitvina `#6e9790`, odsev `#a9bbb0`;
- les: `#654a32`, svetlo `#896747`, senca `#403126`;
- kamen: `#777b70`, svetlo `#a4a696`, senca `#50564f`;
- omet: `#c4b894`, senca `#91876d`;
- žerjavica: `#d58a3c`, vrh `#f1c66a`;
- UI: `#121914`, `#283126`, `#b49a59`, `#dedccf`.

## Risanje

- Enotna kontura: 1–2 px pri logični ločljivosti.
- Brez fotografskih tekstur in brez mehkih generiranih robov.
- Tekstura je sestavljena iz majhnih gručenj, ne iz šuma po celotni površini.
- Svetloba vedno prihaja zgoraj levo.
- Senca je ena sploščena elipsa ali preprost poligon, 25–35 % opacity, pomaknjena navzdol desno.
- Objekt ima največ tri vrednostne ravni: senca, osnovna barva, poudarek.

## Voda

- Obala je organski poligon, nikoli ravna mrežna meja.
- Zunanji 8–14 px pas je plitvina; sredina je temnejša.
- Tok predstavljajo kratke prekinjene črte različnih hitrosti.
- Odsev je redek, vodoraven in ne presega 20 % svetlosti.
- Dež ustvari kroge na vodi in majhne luže na zemlji; nikoli celozaslonske diagonalne črte.

## Poti

- Širina glavne poti: 64–96 px; stranska pot 32–52 px.
- Rob se spreminja za 6–14 px in vsebuje redke kamne ali travo.
- Pot ne poteka pod hišo ali čez globoko vodo brez mostu/plutvine.

## Stavbe in parcele

- Vsaka stavba ima `bounds`, `door`, `approach`, `depth`, `collision` in `interaction`.
- Stavba lahko obstaja le na validirani parceli.
- 16 px prostora med footprinti; vhod ima najmanj 32 px prostega pristopa.
- Naselje je ročno načrtovano. Proceduralno se dodajo le nepomembni robni detajli.

## Liki in animacije

- Idle: 4 smeri, 2 okvirja, 1,2–1,8 s.
- Hoja: 4 smeri, 4 okvirji, 8–10 fps.
- Napad: 4 smeri, 4–5 okvirjev, 180–240 ms.
- Hit reaction: 2 okvirja, 100–140 ms; smrt 5–7 okvirjev.
- Sekanje/rudarjenje: 5 okvirjev z jasnim anticipacijskim položajem.
- Telo se ne obrača kot ena sama slika; smer določa različna silhueta.

## UI

- 8 px osnovni spacing, najmanj 12 px besedilo, 24 px ikone.
- Temna nevtralna površina, en zlat poudarek in ena barva stanja.
- Največ dva okvirja okoli iste informacije.
- Inventory 5 × 4; izbran, opremljen in neuporaben predmet imajo različna stanja.
- Cilj naloge je vedno en stavek; podrobnosti ostanejo v dnevniku.

## Sprejemni kriterij

Element se lahko prenese v produkcijo samo, če je berljiv brez besedila, uporablja to paleto in merilo, nima konflikta s kolizijami ter je bil pregledan v svojem laboratoriju pri dnevni, nočni in deževni osvetlitvi.
