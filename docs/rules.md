## Dokumentáció dokumentációja
### Dokumentálás főcélja:
A szoftver minden életciklusa alatt fejlesztői oldalról beletett erőforrásainak minimalizálásanak segítése.
### Preface

Ez a dokumentáció egy egyetemi projektfeladat része, amely valójában nem igényelne ilyen szintű rendszerezettséget. Figyelembe véve azonban a jövőbeli céljainkat, törekszünk arra, hogy a lehető legvalósághűbben valósítsuk meg a dokumentációt, még ha ez néhol a fő cél, az erőforrások minimalizálása tekintetében nem a leghatékonyabb megoldás.  
Az órán elhangzott szabályokat alkalmazzuk e konvenciókban, ugyanakkor fontos kiemelni, hogy ez egy teljesen saját készítésű dokumentáció, ahol a legtöbb problémát a szoftvertervezés későbbi részeiben fogjuk megtapasztalni.  
Célunk a tanulás és ez a folyamat segíteni fog abban, hogy megtapasztaljuk a dokumentáció gördülékeny kialakításának folyamatát. Eddigi tapasztalatok és az órán elhangzottak alapján a valóságban a teljes gördülékenység elérése lehetetlen, de erre törekszünk.

(Minden `{...}`,`{?}`  jelölés a dokumentumban **későbbi kiegészítést**, a szekció **megkérdőjelezését** jelöli, amelyet a gyakorlat során tapasztalunk, vagy amelyet még pontosan nem dolgoztunk ki)
### Főszabályok a dokumentáláshoz
1. **Átláthatóság és struktúra**  
   A dokumentáció legyen jól átlátható és **logikusan strukturált**.  
   - A későbbi section kiegészítések ne bontsák meg a struktúrát. 
   - Ez biztosítja, hogy a dokumentáció követhető maradjon a csapat minden tagja számára.
2. **Teljesség**  
  -  A dokumentációnak a projekt **minden aspektusát lefednie** kell `{...}`.  A hiányos dokumentáció későbbi hibákhoz vezethet, ami **többszörös idő- és költségtöbbletet** okozhat.  
3. **Konvenció és egység**  
  -  A dokumentáció legyen **konvencionális**, azaz mindenki a **meghatározott szabályrendszer szerint** dokumentáljon. Ez biztosítja az 1. pontban leírt átláthatóságot.  
### Dokumentációs észrevételek
- Minden észrevételt, javaslatot vagy kérdést a dokumentációval vagy annak szabályrendszerével kapcsolatban **a "DocUpdates.md" {fájl {?} }-ba** írjunk.  A csapat közösen megvitatja a javaslatot, hogy a **projekt haladását és a fejlesztők kényelmét** javítsuk.  Ezek a javaslatok csak akkor elfogadhatóak, ha **valamely főszabály pontot a jobb irányba terelik** és **kollektívan segítik a csapatot**.
- Például:
  - A dokumentáció bármely részét **új fájlba lehet integrálni**, ha a fejlesztők úgy ítélik meg, hogy ez segíti a Dokumentálás főszabályai 1. pontját (az **átláthatóságot**)

---
### Általános konvenciók- 
#### gondolkodásmódra vonatkozóan:

- A dokumentációba csak olyan információkat írunk, amelyeket **teljes mértékben értünk**, azaz tudjuk, **miért szükségesek, mi a szerepük**, és ezeket az ismereteket **egyértelmű, egységes és megfelelő szaknyelvű formában** adjuk át a csapat számára.
- A követelményrendszert minden esetben, részletes kiegészítéssel kell ellátni, ha bármilyen **konfliktus adódik** a rendszer bármely aspektusában, például: `{...}`.  
- {...}
#### formára vonatkozóan:
- Mindent angol nyelven íródik.
- A dokumentáció alapvetően verziókezelve van, de minden szerkesztő **kötelezettsége**, hogy a változtatásokat a sor elején/bekezdés elején **időbélyeggel jelölje**, a következő formátumban: `[YYYY.MM.DD;HH:MM]`, erre kitalálhatunk jobb megoldást is ha ez így nem kielégítő vagy formailag zavaró. Kivételek jelölve vannak!
 - Formai vagy stuktura módosítás esetén minden korábban más módszerrel alkalmazott verziót frissíteni kell az új szabály szerint, hogy az **egységesség megmaradjon.**
 - Minden részhez előre meghatározott váz tartozik ezt köteles követni a szerkesztő.
 - Lehet használni \**példa\**  kijelölést hogy szavakat részeket emeljünk ki könnyebb olvashatóság érdekében.
- {...}

---
# SRS Dokumentációs Szabályok

Ebben a részben kizárólag az **SRS (System Requirements Specification)** dokumentációjára koncentrálunk, és annak szabályaira térünk ki.

> A követelmények: 
> 1. teljesek
> 2. ellentmondásmentes
> 3. konzisztensek/logikusak

Időbélyegzés az **SRS**-ben csak a standard verziója elkészülésének határideje utántól lép életbe, ami **2026.02.16. 23:59**. 
## SRS leírások sectionök szerint

### General Description
A **General Description** a projekt **standard, előre megfogalmazott leírása**, amely a projekt teljes időtartama alatt érvényes.  
- Megváltoztatása nagy vonalakban a projekt kimenetelét is módosítaná.  
- Itt fogalmazzuk meg **a projekt célját, motivációját és hátterét** egyszerűen és érthetően.  
- Ebben a szekcióban **definiáljuk a kulcsfogalmakat és szakszavakat**, hogy a csapat **egységes nyelvet** használjon a dokumentáció és kommunikáció során ez folyamatosan frissitendő, itt nem kell időbélyeget elhelyezni!
Ebben a részben formailag nincsenek nagy megkötések az általános szabályokon kívűl, lényege hogy megértesse az elözőleg leírtakat.
### Actors
Az **Actors** szekció a szoftverhez kapcsolódó **összes érintettet** tartalmazza, részletes leírással és engedélyekkel.  
- Ide tartozik minden releváns aspektus: fejlesztői hozzáférés, deployolt rendszer használata, tesztelés, külső rendszerek (pl. API-k) általi hozzáférés.  
### Functional requeirements
A **Functional Requirements** (FR) szekció a rendszer **konkrét funkcióit és viselkedését** írja le.  
- Célja, hogy **megadja, mit kell a rendszernek ténylegesen tennie**, milyen felhasználói interakciókat és műveleteket kell támogatnia.  
- Itt fogalmazzuk meg, hogy a rendszer **milyen funkciókat biztosít a felhasználók, adminok és külső rendszerek számára**, beleértve az adatbevitelt, feldolgozást és megjelenítést.  
- A szekció folyamatosan **frissítendő**, ha új funkciók merülnek fel vagy pontosítás szükséges.
- FR-XX formátumu jelölést alkalmazunk pl:
  - FR-01: Allow users to search for events by location or city.  
minden FR-XX alá felsorolásban írjuk le a funkcionális követelmény részleteit.
- Később minden FR-t megfelelően rendszerezzük főcímek alá.
### Non-functional requeirements
A **Non-Functional Requirements** (NFR) szekció a rendszer **minőségi jellemzőit és viselkedését** írja le, nem a konkrét funkciókat.  
- Célja, hogy **biztosítsa a rendszer teljesítményét, megbízhatóságát, skálázhatóságát, karbantarthatóságát, biztonságát és használhatóságát**.  
- Itt fogalmazzuk meg, hogy a rendszer **milyen szintű szolgáltatást nyújt**, milyen körülmények között működik jól, és milyen elvárásoknak kell megfelelnie a felhasználói élmény és a fejlesztés során.  
- A szekció folyamatosan **frissítendő**, ha új minőségi követelmények merülnek fel vagy pontosítás szükséges.
-  NFR-XX formátumu jelölést alkalmazunk pl:
  - NFR-01: The system should be fast and responsive, e.g., search and list display should occur within {...} seconds. 
minden NFR-XX alá felsorolásban írjuk le a non-funkcionális követelmény részleteit.
- Később minden NFR-t megfelelően rendszerezzük főcímek alá.

### Use-cases - befejezendő fejezet
Use-cases illene külön fájlban kezelni de mi egyelőre SRS-en belül egy külön szekcióba helyezzük el.
{...}
órai jegyzet: 
2. Felhasználói esetek (USE-CASE)
	 - featurei a szoftvernek
	 - könnyen áttekinthető
		 - elemei:
			 - rendszer jele: téglalap
			 - aktor
			 - használati eset
			 - relációk
{...}

---
