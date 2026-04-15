const FALLBACKS = [
  {
    category: 'Koncert',
    area: 'Budapest, Magyarország',
    address: 'Budapest központi városrésze',
    excerpt: 'Városi programhelyszín koncertekhez, közösségi estekhez és hétvégi eseményekhez.',
    detail:
      'A helyszín aktuális eseményeit több jegy- és programoldalon is érdemes ellenőrizni, mert a kínálat platformonként eltérhet.',
    capacity: '850 fő',
    imageClass: 'visual-stage',
    image: '/venue-images/stage.jpg',
  },
  {
    category: 'Kultúra',
    area: 'Budapest, Magyarország',
    address: 'Budapest kulturális negyede',
    excerpt: 'Kulturális tér előadásokhoz, tárlatokhoz és esti városi programokhoz.',
    detail:
      'A programok között rendszeresen szerepelnek előadások, kiállítások és közösségi események.',
    capacity: '420 fő',
    imageClass: 'visual-gallery',
    image: '/venue-images/gallery.jpg',
  },
  {
    category: 'Színház',
    area: 'Budapest, Magyarország',
    address: 'Budapest belvárosa',
    excerpt: 'Klasszikus városi helyszín színpadi produkciókhoz és beszélgetésekhez.',
    detail:
      'A részletes műsor és a jegyelérhetőség a kapcsolódó oldalak alapján változhat.',
    capacity: '620 fő',
    imageClass: 'visual-hall',
    image: '/venue-images/hall.jpg',
  },
  {
    category: 'Park',
    area: 'Budapest, Magyarország',
    address: 'Budapest szabadtéri eseménytér',
    excerpt: 'Szabadtéri programhelyszín nagyobb nyári eseményekhez és fesztiválokhoz.',
    detail:
      'Nyitott, nagy befogadóképességű tér, ahol a zene, a gasztronómia és a közösségi élmény egyszerre jelenik meg.',
    capacity: '11 500 fő',
    imageClass: 'visual-park',
    image: '/venue-images/park.jpg',
  },
]

const SPECIFIC = [
  {
    match: ['budapest park'],
    meta: {
      category: 'Park',
      area: 'Budapest, Ferencváros',
      address: '1095 Budapest, Soroksári út 60.',
      excerpt: 'Budapest egyik legnagyobb szabadtéri koncert- és fesztiválhelyszíne.',
      detail:
        'Európa nagy szabadtéri szórakozóhelyei közé tartozik, ahol a koncertek, táncos esték és nyári programok egy teljes városi univerzummá állnak össze.',
      capacity: '11 500 fő',
      imageClass: 'visual-park',
      image: '/venue-images/park.jpg',
    },
  },
  {
    match: ['akvarium'],
    meta: {
      category: 'Koncert',
      area: 'Budapest, Erzsébetváros',
      address: '1051 Budapest, Erzsébet tér 12.',
      excerpt: 'Belvárosi klub koncertekhez, közösségi estekhez és elektronikus programokhoz.',
      detail:
        'Multifunkcionális belvárosi tér, ahol klubkoncertek, kisebb fesztiválok és éjszakai események váltják egymást.',
      capacity: '1 700 fő',
      imageClass: 'visual-stage',
      image: '/venue-images/stage.jpg',
    },
  },
  {
    match: ['ludovika'],
    meta: {
      category: 'Kultúra',
      area: 'Budapest, Józsefváros',
      address: '1083 Budapest, Ludovika tér 2.',
      excerpt: 'Kortárs művészeti és közösségi tér aktív városi programokkal.',
      detail:
        'Rendezett, modern környezet, amely kulturális és oktatási eseményeknek is otthont ad.',
      capacity: '980 fő',
      imageClass: 'visual-gallery',
      image: '/venue-images/gallery.jpg',
    },
  },
  {
    match: ['szimpla'],
    meta: {
      category: 'Közösségi tér',
      area: 'Budapest, Erzsébetváros',
      address: '1075 Budapest, Kazinczy utca 14.',
      excerpt: 'A város karakteres romkocsma-kultúrájának egyik legismertebb tere.',
      detail:
        'Rétegzett, folyamatosan változó belső tere különleges hangulatot ad koncerteknek és közösségi eseményeknek.',
      capacity: '600 fő',
      imageClass: 'visual-courtyard',
      image: '/venue-images/park.jpg',
    },
  },
  {
    match: ['a38'],
    meta: {
      category: 'Koncert',
      area: 'Budapest, Újbuda',
      address: '1117 Budapest, Petőfi híd budai hídfő',
      excerpt: 'Dunai koncerthelyszín erős zenei programmal és különleges atmoszférával.',
      detail:
        'A hajó karakteres tereiben klubkoncertek, lemezbemutatók és nemzetközi fellépések is rendszeresen futnak.',
      capacity: '700 fő',
      imageClass: 'visual-stage',
      image: '/venue-images/stage.jpg',
    },
  },
  {
    match: ['muzeum', 'múzeum', 'galeria', 'galéria', 'zene haza', 'zene háza'],
    meta: {
      category: 'Művészet',
      area: 'Budapest, Városliget',
      address: 'Budapest múzeumi negyede',
      excerpt: 'Kiállítások, tárlatvezetések és kulturális események elegáns környezetben.',
      detail:
        'A helyszín programjai kiállítások, előadások és esti kulturális események köré szerveződnek.',
      capacity: '1 200 fő',
      imageClass: 'visual-gallery',
      image: '/venue-images/gallery.jpg',
    },
  },
  {
    match: ['arena', 'aréna', 'dome', 'sportcsarnok', 'groupama', 'puskas', 'puskás'],
    meta: {
      category: 'Aréna',
      area: 'Budapest, Magyarország',
      address: 'Budapest nagy rendezvényövezete',
      excerpt: 'Nagy befogadóképességű helyszín koncertekhez és sporteseményekhez.',
      detail:
        'A nagyobb produkciókhoz, sportprogramokhoz és országos eseményekhez illő infrastruktúrát kínál.',
      capacity: '12 500 fő',
      imageClass: 'visual-arena',
      image: '/venue-images/park.jpg',
    },
  },
  {
    match: ['szinhaz', 'színház', 'atrium', 'átrium', 'tancszinhaz', 'táncszínház', 'operett'],
    meta: {
      category: 'Színház',
      area: 'Budapest, Magyarország',
      address: 'Budapest színházi negyede',
      excerpt: 'Színpadi produkciók, előadások és esti kulturális programok otthona.',
      detail:
        'A műsor gyakran előadásokból, kortárs produkciókból és vendégprogramokból áll össze.',
      capacity: '520 fő',
      imageClass: 'visual-hall',
      image: '/venue-images/hall.jpg',
    },
  },
]

function fold(value) {
  return String(value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

function hash(value) {
  return Array.from(String(value || '')).reduce((sum, char) => sum + char.charCodeAt(0), 0)
}

export function venueMeta(venue) {
  const name = fold(venue?.name)
  const specific = SPECIFIC.find(item => item.match.some(part => name.includes(fold(part))))

  if (specific) return specific.meta

  return FALLBACKS[hash(name) % FALLBACKS.length]
}

export function platformLinks(venue) {
  return [
    { label: 'Tixa', url: venue?.tixa_url },
    { label: 'TicketSwap', url: venue?.ticketswap_url },
    { label: 'Bandsintown', url: venue?.bandsintown_url },
  ].filter(link => link.url)
}

export function platformSummary(venue) {
  const links = platformLinks(venue)
  return links.length ? links.map(link => link.label).join(', ') : 'Nincs megadva'
}
