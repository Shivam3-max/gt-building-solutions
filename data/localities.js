// Locality/service-area data. Panchkula and Chandigarh have real GT store
// addresses; Zirakpur and Mohali are service areas GT delivers to from those
// two stores, not separate branches — copy reflects that honestly.
export const LOCALITIES = [
  {
    slug: 'panchkula',
    city: 'Panchkula',
    isStore: true,
    storeName: 'Garg Trading Company',
    address: 'Plot No. 1, Industrial Area Phase 1, Panchkula, Haryana 134109',
    phone: '+91 98140 33573',
    mapQuery: 'Plot No. 1, Industrial Area Phase 1, Panchkula, Haryana 134109',
    intro:
      'Panchkula is home to our flagship showroom, Garg Trading Company, in Industrial Area Phase 1. This is GT Building Solutions\' main store for hardware, adhesives, panels, paints, power tools, and pipes — the full building-materials range outside of tiles and sanitaryware, which is handled at our Chandigarh showroom.',
    body: [
      'If you\'re building, renovating, or fitting out a home or commercial space anywhere in Panchkula — from Sector 1 through the newer sectors and the Industrial Area belt — our Plot No. 1 showroom is a short drive away and stocks the fast-moving materials most projects need day to day: hardware fittings from Hettich and Godrej, adhesives and waterproofing from Fevicol and Dr. Fixit, Gyproc panels and framing, paints from Asian Paints and Birla Opus, DeWalt power tools, and CPVC/uPVC pipes from Prince Piping.',
      'We work with architects, interior designers, contractors, and homeowners across Panchkula on everything from a single-room touch-up to full-project bulk supply, and our team can walk you through brand and product options in person rather than over the phone. For projects that also need tiles or sanitaryware, we\'ll point you to our sister showroom, Gujarat Tiles & Sanitary Depot, in Chandigarh.',
    ],
  },
  {
    slug: 'chandigarh',
    city: 'Chandigarh',
    isStore: true,
    storeName: 'Gujarat Tiles & Sanitary Depot',
    address: 'SCO 22-23, Phase 2, Industrial Area, Chandigarh',
    phone: '+91 92168 66671',
    mapQuery: 'SCO 22-23, Phase 2, Industrial Area, Chandigarh',
    intro:
      'Our Chandigarh showroom, Gujarat Tiles & Sanitary Depot, is dedicated to tiles and complete bathroom solutions — Kajaria vitrified and ceramic tiles, and sanitaryware from Hindware and Kerovit — at SCO 22-23, Phase 2, Industrial Area.',
    body: [
      'Chandigarh customers — homeowners, architects, and interior designers working across the city\'s sectors — visit this showroom specifically to see tile finishes, sizes, and designer collections in person before finalizing a project, since tile and bathroom choices are difficult to judge from photos alone. We display a wide range of vitrified and ceramic floor and wall tiles, anti-skid outdoor tiles, and full bathroom suites spanning everyday to premium designer ranges.',
      'For hardware, adhesives, paints, panels, power tools, and pipes, our Garg Trading Company showroom in Panchkula carries the rest of GT Building Solutions\' 30+ brand portfolio — many Chandigarh customers sourcing a full renovation visit both stores in the same trip since they\'re a short drive apart.',
    ],
  },
  {
    slug: 'zirakpur',
    city: 'Zirakpur',
    isStore: false,
    intro:
      'Zirakpur sits right between Chandigarh and Panchkula, and GT Building Solutions regularly supplies hardware, tiles, paints, and building materials to homeowners, builders, and contractors working on projects across Zirakpur\'s residential sectors and commercial developments.',
    body: [
      'We don\'t operate a physical showroom in Zirakpur, but the town is close enough to both of our stores — Garg Trading Company in Panchkula and Gujarat Tiles & Sanitary Depot in Chandigarh — that Zirakpur customers regularly visit either location for consultations, product selection, and pickup, and we coordinate delivery to Zirakpur sites for bulk and project orders.',
      'Zirakpur has seen fast residential and commercial growth in recent years, and we work with several builders and interior fit-out teams in the area on project supply for hardware, tiles, paints, and plumbing materials, alongside walk-in support for individual homeowners renovating apartments and independent houses.',
    ],
  },
  {
    slug: 'mohali',
    city: 'Mohali',
    isStore: false,
    intro:
      'Mohali (S.A.S. Nagar) is one of the tri-city area\'s largest residential and IT hubs, and GT Building Solutions supplies building materials — tiles, hardware, paints, and plumbing — to homeowners and contractors working across Mohali\'s Phases and sectors.',
    body: [
      'While we don\'t have a showroom based in Mohali itself, our two stores in neighbouring Panchkula and Chandigarh are within easy reach for Mohali residents planning a renovation or new build, and we regularly deliver materials to Mohali project sites for both individual homeowners and contractor teams working on larger developments.',
      'Mohali\'s mix of independent homes, group housing societies, and commercial spaces means we see demand across the full range — from single-bathroom tile and sanitaryware upgrades to full-building hardware and paint supply for new construction — and our team can help scope out material quantities and timelines before you commit to a project.',
    ],
  },
];

export const getLocalityBySlug = (slug) => LOCALITIES.find((l) => l.slug === slug);
