# Mah in žerjavica — senior review

## P0 — blokade

- **Labirint treh senc:** ročno postavljene stene niso zagotavljale poti do skrinje. Rešitev je povezan 11 × 7 labirint z BFS-preverjanjem, varnim vhodom, izhodom in interakcijskim poljem skrinje.
- **Obalna kolizija:** grafični rob in fizična meja nista bila ista. Novi globinski izračun dovoljuje hojo po pesku in zelo plitvi vodi, blokira pa globino.
- **Kresnikova smer:** obraz, plašč in orodje niso delili iste transformacije. Novi smerni renderer zrcali celoten lik in napadalni lok.

## P1 — največji učinek

- **Svet potrebuje ročno oblikovane regionalne poti.** Proceduralna drevesa naj ostanejo kulisa, glavne in stranske poti pa morajo povezovati znamenitosti, zgodbe in varne jase.
- **Boj potrebuje odziv sovražnikov.** Poleg hitrega udarca dodati kratek stagger, jasno napoved težkega napada in eno obrambno odločitev.
- **Mesta potrebujejo funkcionalne četrti.** Trg, obrtniška ulica, stanovanjski rob in mestna vrata naj imajo različne silhuete, NPC-rutine in mikro-zgodbe.
- **Oprema naj spremeni videz Kresnika.** Vsaj orožje, ščit, oklep in plašč naj bodo vidni tudi v svetu.
- **Jame naj dobijo lastno slovnico.** Rudnik, kraška jama, grobnica in kanalizacija ne smejo uporabljati istega prostora z drugo barvo.

## P2 — globina

- Skilli naj odpirajo bližnjice: rudarjenje prehod skozi razpoko, sekanje podrto deblo, izročilo svetišča.
- Vsaka regija naj dobi en dogodek, eno skrivnost, eno koristno postojanko in eno lokalno nevarnost.
- Po končanih questih naj se svet spremeni: novi dialogi, trgovsko blago, varnejše poti ali obnovljene stavbe.
- Bestiarij naj beleži sledi, šibkosti in folklorno pripoved, ne le imen.
- Boss arene naj imajo dve jasno berljivi fazi in okoljski element.

## P3 — polish

- Poenotiti ikone predmetov brez emoji mešanice.
- Dodati ambientalne sloje: obala, gozdne ptice, jamsko kapljanje in oddaljene vaške zvonove.
- Na zemljevid dodati ročno narisane regionalne simbole in jasnejšo hierarhijo oznak.
- NPC-jem dodati prepoznavne silhuete poklicev in regionalna oblačila.

## Pripovedna smer

Kresnikov glavni lok naj bo spor med podedovanim ognjem in odgovornostjo do doline. Perun predstavlja moč in dejanje, Veles spomin in dolg, Zlatorog pa mejo med darom in pohlepom. Pet glavnih nalog naj postopoma razkrije, da red v dolini ne pomeni zmage ene strani, temveč ponovno sklenitev stare prisege med ljudmi, divjino in podzemljem.

## Merljivi naslednji koraki

1. Vsaka glavna lokacija mora biti dosegljiva v avtomatskem testu poti.
2. Vsakih 45–75 sekund raziskovanja mora igralec videti odločitev, dogodek ali znamenitost.
3. Vsaka regija potrebuje lastno glasbo in najmanj dva ambientalna zvoka.
4. Vsak glavni quest mora trajno spremeniti najmanj en del sveta.
5. Mobilni prikaz mora ohranjati 30 FPS z vključenim vremenom in obalnimi valovi.
