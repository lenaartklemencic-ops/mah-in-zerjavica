# Mah in žerjavica

2D fantazijska RPG igra v brskalniku, zgrajena okoli slovenskega folklornega
sveta. Razišči veliko dolino z gozdovi, reko, polji, gorami, vilinskim gajem,
škratovskimi dvoranami, jamami, ruševinami in goblinskima taboroma.

Igra vsebuje pet povezanih nalog: **Tri barve prepira**, **Srebrni glas
Zlatoroga**, **Velesova senca**, **Perunov ukradeni grom** in **Nevesta iz
globine**. Vključuje napredovanje orožja, notranjosti, tri reže za shranjevanje,
dinamično vreme in izvirno proceduralno glasbo z vodilnim godalnim glasom.

## Kontrole

- `WASD` ali puščice — premikanje
- `E` — pogovor in interakcija
- `Space` — napad
- `M` — zemljevid in trenutni cilj
- `Esc` — meni, shranjevanje in nalaganje
- `1` — uporabi zdravilno gobo

Igra ne potrebuje namestitve ali zunanjih knjižnic. Odpri `index.html` oziroma
obišči objavljeno spletno stran.

## Zasebnost javnega prototipa

- Igra nima uporabniških računov, baze, analitike ali obrazcev.
- Samodejni napredek je shranjen samo v `sessionStorage` trenutnega zavihka.
- Ročne shranjene reže so samo v `localStorage` igralčevega brskalnika.
- Save podatki se ne pošiljajo na strežnik in niso dostopni drugim igralcem.
- Nov zavihek začne novo, ločeno sejo; vsak obiskovalec igra svojo kopijo igre.
