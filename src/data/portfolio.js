const img = (id, sz='w1200') => `https://drive.google.com/thumbnail?id=${id}&sz=${sz}`;

export const IMAGES = {
  odungi_main:        img('1QHUvKzFXAqHdwlHEoQDhsHJjD2xDNQVu'),
  odungi_face:        img('1uhJQGJWV8QRu8bcvYs3qdiNde-w_c0Oy'),
  odungi_alt:         img('1_gF34MBLHG1D385AX-6-T6zDGakkB0Mv'),
  afrezia:            img('1A3CdSQkLq1gEYtTpIjz0OvamB8oavEBp'),
  wagashiko:          img('1Ro5J75-KlaowzZf1-97LLJDZCgiAj61O'),
  omolara:            img('1vZme7yIW7VbUOlTw5CtYTV00zFObasrs'),
  shirock:            img('1QoARBvmBUPABqFPt5DOJ616notYPjsI2'),
  shirock_wire:       img('1UDSaK29Q55VmKMty-2CKmn45PvsHG9dR'),
  black_nishati_full: img('1tdBL7oHAYhHtli6FcHuePNq2hdcLIMuz'),
  black_nishati_half: img('1D8i5UbJJbLWaSUxuI6hHqxbTiPpMeZ7b'),
  leopard_face:       img('1FNEH42gSJ1UwyXQLL-DYENm5pNzWCg7R'),
  leopard_side:       img('1FZBgvOrPm-JgCzG7dkUAO9P5C9wWNOgW'),
  leopard_full:       img('1FRA_MRfEsMt3y62LdI2jawXukxJkEjEm'),
  omollo:             img('1re1aVAJok7lnM8GvcQqywgDGXycg78dO'),
  kijana:             img('1pgnpEje9ZiBaccl0eTRDG5Ifw1DmQXVG'),
  cheetah_skull:      img('1CJ7EMLSVT3l-ALq8pyKeMh9X8SB12Ky0'),
  nyayo_2nd:          img('155AX5DV-DojEX9WN1Ro1h15fgKNx1tpH'),
  nyayo_1st:          img('1VTDvzNWKN15INIQwOf0OyvFHusRahhhZ'),
  martell:            img('17bAcI0GVciFueLwMgJxmoie1osIHaIYv'),
  a_tent:             img('1PUZ8C28liwyqbXMImKWLadr3qS9e5P-k'),
  vvip:               img('1Ih2pcCcNRgSAW6EDt07CZOkxhROIWApv'),
  bouquet_1:          img('144OXBT0eSn9kvs8DG1eRpw-olQ_xnrQv'),
  bouquet_2:          img('1nvn6gfgKKsX1JLNZtlqjBTmB95b0Z7NM'),
  bouquet_3:          img('16I84IkLhQ60WBtATe956nCGQNWQIQxEO'),
  bouquet_4:          img('1tDCfd35NppTaEg5X9yGB6pVQOrNxUn5W'),
  bouquet_5:          img('1Z7HWHF91cld7AzVFW6MShKD4JnrYDM7h'),
  drone_1:            img('1WiLRSAwMipmTYFHzatl3QlPMCyl_xH2_'),
  drone_2:            img('1U76eEBtdccxqpxx0mcdU66YgghfDN1Ds'),
  drone_3:            img('1H2ct1u3SQCW4e_ljbtkd3DiMVXd2z26j'),
  drone_4:            img('180KB7cywYBD72MaKdGHBOmyGiFnsUfh2'),
  kicc:               img('1eCnP6DHx5yS7aVhCXXfFnp1pRy6Ovths'),
  state_house:        img('1wDODMg0uLnoYy8SZvMG99cKDMBGDVq4E'),
  mashariki:          img('1ZeTFnlAymZ6j1VRBUv9UwKGrFo9u_31n'),
  jays:               img('1psKY4JYRv4ryB_22vFh6BSnNeNXO-RIY'),
  staroot:            img('1kZrq-9y-ZEZVztvQhGO4j1MeovqVQASY'),
};

/* ── PAGE 1 DATA ─────────────────────────────────── */

export const REEL_SLIDES = [
  { id:0, bg:IMAGES.odungi_main,   title:'Portfolio Reels', subtitle:'2024 / 2025', sub:'Emmanuel Chege · Nairobi, Kenya', youtubeId:'gmiQ0bNoPgQ', playable:true },
  { id:1, bg:IMAGES.odungi_face,   title:'Odungi',          subtitle:'Character Turntable', sub:'The Maasai Fable · 2026', youtubeId:null },
  { id:2, bg:IMAGES.wagashiko,     title:'Wagashiko',       subtitle:'The Angel', sub:'Hyperrealistic · Substance · Mari', youtubeId:null },
  { id:3, bg:IMAGES.black_nishati_full, title:'Characters', subtitle:'Gallery', sub:'17+ Hyperrealistic Sculpts', youtubeId:null, link:'/portfolio#characters' },
];

export const CHARACTERS = [
  { id:'01', img:IMAGES.odungi_main,        title:'Odungi — The Maasai Fable', tags:'ZBrush · Maya · Unreal 5 · 2026', size:'xl' },
  { id:'02', img:IMAGES.wagashiko,          title:'Wagashiko — The Angel',     tags:'Substance · Mari · Hyperrealistic', size:'md' },
  { id:'03', img:IMAGES.afrezia,            title:'Afrezia',                   tags:'Maya · ZBrush · Mari', size:'md' },
  { id:'04', img:IMAGES.shirock,            title:'Shirock — NAICCON',         tags:'Full-body · Blender · Cycles', size:'wd' },
  { id:'05', img:IMAGES.black_nishati_full, title:'Black Nishati — NAICCON',   tags:'ZBrush · Nuke', size:'wd' },
  { id:'06', img:IMAGES.omollo,             title:'Omollo — The Minotaur',     tags:'Creature · ZBrush', size:'sm' },
  { id:'07', img:IMAGES.kijana,             title:'Kijana Mnono',              tags:'ZBrush · Maya', size:'sm' },
  { id:'08', img:IMAGES.cheetah_skull,      title:'Cheetah Skull',             tags:'Anatomical · ZBrush', size:'sm' },
  { id:'09', img:IMAGES.leopard_face,       title:'Leopard',                   tags:'Creature · Mari', size:'sm' },
  { id:'10', img:IMAGES.leopard_side,       title:'Leopard — Profile',         tags:'Detail Study', size:'sm' },
  { id:'11', img:IMAGES.odungi_face,        title:'Odungi — Face Study',       tags:'Cinematic Close-up', size:'sm' },
  { id:'12', img:IMAGES.omolara,            title:'Omolara',                   tags:'Portrait · Hyperrealistic', size:'sm' },
];

export const DRONE_PROJECTS = [
  { n:'01', title:'EU-Kenya Diplomatic Show',         desc:'Aerial formation choreography for the EU-Kenya bilateral summit — flag formations, national symbols and synchronized light sequences.' },
  { n:'02', title:'HFCK Formation Show',              desc:'Housing Finance Corporation of Kenya branded aerial show — logo animation and cinematic finale choreography.' },
  { n:'03', title:'NRP Campaign Drone Show',          desc:'National political campaign aerial concept — bold formation messaging and crowd engagement choreography.' },
  { n:'04', title:'Museveni Swearing-in Ceremony',    desc:'State ceremonial drone show — patriotic formations, national colours and pyrotechnic integration design.' },
  { n:'05', title:'Mashariki Cooperation Conference', desc:'Multi-nation aerial choreography for the East African cooperation summit.' },
  { n:'06', title:'La Mada Premium Event',            desc:'Premium hospitality aerial concept — cultural motifs and sky-level brand storytelling.' },
];

export const DRONE_IMAGES = [
  { img:IMAGES.drone_1, title:'EU-Kenya Diplomatic Show',  sub:'Aerial Formation Concept' },
  { img:IMAGES.drone_2, title:'HFCK Formation Show',       sub:'Light Choreography' },
  { img:IMAGES.drone_3, title:'NRP Campaign Show',         sub:'Drone Concept' },
  { img:IMAGES.drone_4, title:'Mashariki Conference',      sub:'Multi-nation Formation' },
  { img:IMAGES.drone_1, title:'Museveni Ceremony',         sub:'State Ceremonial' },
  { img:IMAGES.drone_2, title:'La Mada Premium Event',     sub:'Hospitality Aerial' },
];

/* Event visualization — video-ready entries (add youtubeId when available) */
export const EVENT_VIZ = [
  { img:IMAGES.nyayo_2nd,  title:'Nyayo Stadium — 2nd Floor', sub:'Asake Concert · Tukutane Ent.', youtubeId:null },
  { img:IMAGES.nyayo_1st,  title:'Nyayo Stadium — 1st Floor', sub:'Event Visualization · Unreal',   youtubeId:null },
  { img:IMAGES.martell,    title:'Martell XXO — JW Marriott', sub:'Luxury Brand Event',              youtubeId:null },
  { img:IMAGES.a_tent,     title:'A-Tent — Concert Setup',    sub:'Architectural Visualization',     youtubeId:null },
  { img:IMAGES.vvip,       title:'VVIP Lounge — Pitch View',  sub:'Event Design · Twinmotion',       youtubeId:null },
];

/* Hologram video content (projection/hologram work) */
export const HOLOGRAM = [
  { img:IMAGES.kicc,        title:'KICC Hologram Projection',   sub:'Architectural · Coca-Cola 2025', youtubeId:null },
  { img:IMAGES.state_house, title:'State House Screen Content', sub:'Holographic Mapping',            youtubeId:null },
  { img:IMAGES.mashariki,   title:'Mashariki Conference',       sub:'Hologram Content · Event',       youtubeId:null },
  { img:IMAGES.staroot,     title:'STAROOT Gemini',             sub:'Screen Projection Content',      youtubeId:null },
  { img:IMAGES.jays,        title:'JAYS Pyrotechnics LED',      sub:'LED Screen · Live Event',        youtubeId:null },
];

export const PRODUCTS = [
  { img:IMAGES.bouquet_1, title:"Michael's Bouquet",     sub:'Perfume · Product Visualization', youtubeId:null },
  { img:IMAGES.bouquet_2, title:"Michael's Bouquet Alt", sub:'Photorealistic · 3D Render',       youtubeId:null },
  { img:IMAGES.bouquet_3, title:'Product Study',          sub:'Blender · HDRI Lighting',         youtubeId:null },
  { img:IMAGES.bouquet_4, title:'Hero Shot',              sub:'Studio Lighting · Arnold',        youtubeId:null },
  { img:IMAGES.bouquet_5, title:'Side Angle',             sub:'Photorealistic · Maya',           youtubeId:null },
];

export const PROJECTION = [
  { img:IMAGES.kicc,        title:'KICC Building Projection',  sub:'Architectural Mapping · Coca-Cola Christmas 2025', featured:true, youtubeId:null },
  { img:IMAGES.state_house, title:'State House Projection',    sub:'Screen Content · Real-time',                       youtubeId:null },
  { img:IMAGES.mashariki,   title:'Mashariki Conference',      sub:'Event Projection · Motion',                        youtubeId:null },
  { img:IMAGES.jays,        title:'JAYS Pyrotechnics LED',     sub:'LED Screen Content · Event',                       youtubeId:null },
  { img:IMAGES.staroot,     title:'STAROOT Gemini',            sub:'Screen Projection Content',                        youtubeId:null },
];

/* Social media content — uses existing renders */
export const SOCIAL_CONTENT = [
  { img:IMAGES.odungi_main,        title:'Odungi — Character Reveal',  sub:'Instagram / ArtStation' },
  { img:IMAGES.omolara,            title:'Omolara — Portrait',         sub:'Instagram' },
  { img:IMAGES.afrezia,            title:'Afrezia — Cinematic Render', sub:'ArtStation' },
  { img:IMAGES.omollo,             title:'Omollo — Creature Feature',  sub:'Instagram' },
  { img:IMAGES.bouquet_1,          title:"Michael's Bouquet Launch",   sub:'LinkedIn' },
  { img:IMAGES.drone_1,            title:'Drone Show Campaign',        sub:'Instagram' },
  { img:IMAGES.kicc,               title:'KICC Projection Reveal',     sub:'Instagram' },
  { img:IMAGES.black_nishati_full, title:'Black Nishati — NAICCON',    sub:'ArtStation' },
  { img:IMAGES.wagashiko,          title:'Wagashiko — WIP',            sub:'Instagram' },
  { img:IMAGES.leopard_face,       title:'Leopard — Creature',         sub:'ArtStation' },
  { img:IMAGES.cheetah_skull,      title:'Cheetah Skull Study',        sub:'Behance' },
  { img:IMAGES.shirock,            title:'Shirock — Official',         sub:'NAICCON' },
];

/* ── PAGE 2 DATA ─────────────────────────────────── */

export const FULL_EVENTS = [
  {
    id:'ev-01', thumb:IMAGES.nyayo_2nd,
    title:'Asake Concert — Nyayo Stadium',
    client:'Tukutane Entertainment', year:'2024',
    description: `Full event visualization and production design for the Asake concert at Nyayo National Stadium, Nairobi. Complete 3D venue mapping, stage design and audience flow visualization.`,
    tags:['Event Design','Unreal Engine','Visualization'],
    youtubeId:null,
  },
  {
    id:'ev-02', thumb:IMAGES.martell,
    title:'Martell XXO — JW Marriott',
    client:'Martell Cognac', year:'2024',
    description: `Premium luxury brand activation at the JW Marriott Hotel Nairobi. Full 3D event space visualization, ambiance design and presentation material.`,
    tags:['Luxury Brand','Event Visualization','3D Design'],
    youtubeId:null,
  },
  {
    id:'ev-03', thumb:IMAGES.kicc,
    title:'KICC Coca-Cola Christmas Projection',
    client:'Coca-Cola Kenya', year:'2025',
    description: `Landmark architectural projection mapping on the Kenyatta International Convention Centre during the Coca-Cola Christmas campaign. Full building mapping with dynamic content.`,
    tags:['Projection Mapping','Architectural','Christmas Campaign'],
    youtubeId:null,
  },
  {
    id:'ev-04', thumb:IMAGES.mashariki,
    title:'Mashariki Cooperation Conference',
    client:'East African Community', year:'2024',
    description: `Multi-nation aerial drone show choreography and event visualization for the Mashariki East African cooperation summit.`,
    tags:['Drone Show','Conference','Aerial Formation'],
    youtubeId:null,
  },
  {
    id:'ev-05', thumb:IMAGES.drone_1,
    title:'EU-Kenya Diplomatic Drone Show',
    client:'EU Delegation Kenya', year:'2024',
    description: `Aerial formation choreography for the EU-Kenya bilateral summit featuring flag formations, national symbols and synchronized light sequences.`,
    tags:['Drone Show','Diplomatic','Aerial'],
    youtubeId:null,
  },
  {
    id:'ev-06', thumb:IMAGES.vvip,
    title:'VVIP Lounge — Stadium Pitch View',
    client:'Private Client', year:'2023',
    description: `Exclusive VVIP hospitality lounge design and visualization overlooking the pitch. Premium interior and exterior 3D production design.`,
    tags:['Interior Design','Visualization','Hospitality'],
    youtubeId:null,
  },
  {
    id:'ev-07', thumb:IMAGES.state_house,
    title:'State House Screen Content',
    client:'Office of the President', year:'2024',
    description: `Official presidential state event screen content, holographic projections and AV production design for State House Nairobi.`,
    tags:['Government','Screen Content','Holographic'],
    youtubeId:null,
  },
  {
    id:'ev-08', thumb:IMAGES.jays,
    title:'JAYS Pyrotechnics LED Event',
    client:'JAYS Pyrotechnics', year:'2024',
    description: `Large-format LED screen content design and production for pyrotechnic shows. Synchronized visual content with live pyrotechnic sequences.`,
    tags:['LED Screen','Pyrotechnics','Live Event'],
    youtubeId:null,
  },
];

/* ── PAGE 3 DATA ─────────────────────────────────── */

export const SOFTWARE_CATEGORIES = [
  {
    category: '3D Modelling & Sculpting',
    tools: ['Maya','ZBrush','Blender'],
  },
  {
    category: 'Texturing & Surfacing',
    tools: ['Substance Painter','Mari','Marvelous Designer'],
  },
  {
    category: 'Rendering & Compositing',
    tools: ['Unreal Engine 5','Nuke','Arnold'],
  },
  {
    category: 'Real-time & Visualization',
    tools: ['Unreal Engine 5','Twinmotion','TouchDesigner'],
  },
  {
    category: 'Motion & Effects',
    tools: ['Embergen','Liquigen','Houdini'],
  },
  {
    category: 'Post Production',
    tools: ['DaVinci Resolve','After Effects','Premiere Pro'],
  },
  {
    category: 'Design & Content',
    tools: ['Adobe Illustrator','Photoshop','Blender'],
  },
];

export const SOCIAL = {
  email:     'emmanuelchege777@gmail.com',
  artstation:'https://www.artstation.com/emmanuel_chege',
  linkedin:  'https://www.linkedin.com/in/emmanuelchegekamau',
  instagram: 'https://www.instagram.com/arte_artorius/',
  youtube:   'https://youtu.be/gmiQ0bNoPgQ',
  tiktok:    'https://www.tiktok.com/@arte_artorius',
  website:   'emmanuelchege.com',
};

/* ── CHARACTER PROFILES (Page 4) ──────────────────── */

export const CHARACTER_PROFILES = [
  {
    slug: 'odungi-the-maasai-fable',
    name: 'Odungi',
    subtitle: 'The Maasai Fable',
    year: '2026',
    category: 'Hyperrealistic Character',
    heroImg: IMAGES.odungi_main,
    tagline: 'A cinematic Maasai warrior sculpted to photorealistic precision — blending cultural heritage with next-generation real-time rendering.',
    writeup: `Odungi represents the culmination of over five years of technical and artistic development. Conceived as a tribute to Maasai culture and warrior tradition, the character was built with a singular obsession: that every pore, every strand of beaded jewellery, and every weathered crease in the skin would withstand the closest scrutiny.

The project began with extensive reference gathering — studying Maasai warriors, traditional dress, skin tone variation under East African light, and the weight and movement of adornment. The sculpt was built in ZBrush from a base mesh, with over 180 subdivision levels used across the head alone. Skin detailing was applied using custom alphas derived from real skin texture photography at the micron level.

Texturing was done entirely in Mari using a 16-set UDIM workflow, with separate maps for subsurface scattering depth, specular variation, and micro-displacement. The final real-time render in Unreal Engine 5 uses Lumen global illumination and Nanite virtualised geometry, allowing the full 8.5M polygon sculpt to render in real-time at 60fps.

This character has been featured at NAICCON and represents the benchmark for all future character work in the studio.`,
    specs: {
      software: ['ZBrush', 'Maya', 'Mari', 'Substance Painter', 'Unreal Engine 5', 'Nuke'],
      polycount: '8.5M (sculpt) · 185K (game mesh)',
      textures: '16 UDIM sets · 8K resolution',
      renderEngine: 'Unreal Engine 5 · Lumen · Nanite',
      client: 'Personal / Studio',
      year: '2026',
      duration: '6 weeks',
    },
    images: [
      { url: IMAGES.odungi_main,  caption: 'Final Hero Render',   type: 'render'   },
      { url: IMAGES.odungi_face,  caption: 'Close-up Portrait',   type: 'render'   },
      { url: IMAGES.odungi_alt,   caption: 'Alternate Lighting',  type: 'render'   },
      { url: IMAGES.shirock_wire, caption: 'Wireframe Reference', type: 'wireframe'},
    ],
    videos: [
      { youtubeId: null, title: 'Sculpting Timelapse',        duration: '4:32', resolution: '1920×1080' },
      { youtubeId: null, title: 'Texturing Process — Mari',   duration: '6:15', resolution: '1920×1080' },
      { youtubeId: null, title: 'Unreal Engine 5 Real-time',  duration: '2:48', resolution: '3840×2160' },
    ],
  },
  {
    slug: 'wagashiko-the-angel',
    name: 'Wagashiko',
    subtitle: 'The Angel',
    year: '2025',
    category: 'Hyperrealistic Character',
    heroImg: IMAGES.wagashiko,
    tagline: 'A transcendent celestial figure — part African ancestry, part divine mythology — rendered with hyperrealistic skin, feather simulation and emissive wings.',
    writeup: `Wagashiko emerged from a vision of an African angel — not the Eurocentric archetype, but a celestial being rooted deeply in East African spiritual tradition. The name means "he who descends from above" in a composite of regional dialects.

The challenge with Wagashiko was two-fold: achieving photorealistic skin that reads as otherworldly without losing its humanity, and simulating the wings with enough physical accuracy that they feel anatomically real. Feather grooming was done in Maya's XGen, with over 40,000 individual guide curves.

Skin tone and subsurface scattering were calibrated against a reference palette of 60 studio-lit skin photographs. The goal was a skin that catches light like wet stone — simultaneously translucent and dense. Specular maps were painted by hand in Mari at the millimetre level.

The emissive wing tips use a procedural emission shader built in Unreal Engine 5's material editor, with dynamic pulsing driven by a simple sine curve blueprint.`,
    specs: {
      software: ['ZBrush', 'Maya', 'Mari', 'XGen', 'Unreal Engine 5', 'Substance Painter'],
      polycount: '7.2M (sculpt) · 220K (game mesh)',
      textures: '12 UDIM sets · 8K resolution',
      renderEngine: 'Unreal Engine 5 · Path Tracer',
      client: 'Personal / Studio',
      year: '2025',
      duration: '5 weeks',
    },
    images: [
      { url: IMAGES.wagashiko,   caption: 'Final Hero Render',  type: 'render'   },
      { url: IMAGES.omolara,     caption: 'Skin Detail Study',  type: 'render'   },
      { url: IMAGES.shirock_wire,caption: 'Wireframe Study',    type: 'wireframe'},
    ],
    videos: [
      { youtubeId: null, title: 'Sculpting Process',           duration: '5:10', resolution: '1920×1080' },
      { youtubeId: null, title: 'Wing Feather Grooming — XGen',duration: '3:45', resolution: '1920×1080' },
    ],
  },
  {
    slug: 'afrezia',
    name: 'Afrezia',
    subtitle: '3D Character',
    year: '2025',
    category: 'Stylised Hyperrealistic',
    heroImg: IMAGES.afrezia,
    tagline: 'A bold, stylised character at the intersection of Afrofuturism and hyperrealism — constructed with a cinematic costume pipeline and dramatic lighting design.',
    writeup: `Afrezia was conceived as a bridge between stylised character design and photorealistic rendering — a character that would look equally at home in a high-budget feature film or a next-generation video game.

The costume design is inspired by Afrofuturist aesthetics — geometric patterning derived from traditional Adinkra symbols, layered with speculative materials that suggest both organic and technological origins. Marvelous Designer was used extensively for cloth simulation, with multiple layers of fabric each assigned individual material properties.

The skin shader was built to accommodate a unique chromatic shift visible only under specific lighting angles — a quality observed in certain species of beetle shells and reproduced here as a custom multi-layered specular node network in Unreal Engine 5's material editor.`,
    specs: {
      software: ['ZBrush', 'Maya', 'Marvelous Designer', 'Substance Painter', 'Unreal Engine 5'],
      polycount: '6.8M (sculpt) · 195K (game mesh)',
      textures: '10 UDIM sets · 4K–8K resolution',
      renderEngine: 'Unreal Engine 5 · Lumen',
      client: 'Personal / Studio',
      year: '2025',
      duration: '4 weeks',
    },
    images: [
      { url: IMAGES.afrezia,      caption: 'Final Render',       type: 'render'   },
      { url: IMAGES.shirock_wire, caption: 'Wireframe',          type: 'wireframe'},
    ],
    videos: [
      { youtubeId: null, title: 'Sculpting + Costume Pipeline', duration: '7:22', resolution: '1920×1080' },
    ],
  },
  {
    slug: 'shirock-naiccon',
    name: 'Shirock',
    subtitle: 'NAICCON Official Character',
    year: '2024',
    category: 'Event Character',
    heroImg: IMAGES.shirock,
    tagline: 'The official mascot character of NAICCON — East Africa\'s premier anime and pop culture convention — built for promotional material, print, and real-time display.',
    writeup: `Shirock was commissioned as the official character representation of NAICCON, East Africa's largest anime and pop culture convention. The brief called for a character that bridged African identity with anime aesthetics — a fusion that would resonate with the convention's diverse, youth-oriented audience.

The design process was iterative, with over 30 concept variations presented before the final direction was approved. The character's colour palette was derived from NAICCON's official brand colours, with modifications to ensure they read correctly under stage lighting conditions.

The technical pipeline was built specifically for versatility — the character needed to work as a high-quality rendered hero image for promotional materials, as a real-time interactive display at the convention, and as a series of print-ready turnaround sheets for merchandise development.`,
    specs: {
      software: ['Blender', 'ZBrush', 'Substance Painter', 'Cycles Renderer'],
      polycount: '4.2M (sculpt) · 95K (display mesh)',
      textures: '8 maps · 4K resolution',
      renderEngine: 'Blender Cycles',
      client: 'NAICCON — East Africa',
      year: '2024',
      duration: '3 weeks',
    },
    images: [
      { url: IMAGES.shirock,      caption: 'Official Render',    type: 'render'   },
      { url: IMAGES.shirock_wire, caption: 'Wireframe',          type: 'wireframe'},
    ],
    videos: [
      { youtubeId: null, title: 'Character Turntable', duration: '1:30', resolution: '1920×1080' },
      { youtubeId: null, title: 'Sculpting Process',   duration: '4:00', resolution: '1920×1080' },
    ],
  },
  {
    slug: 'black-nishati-naiccon',
    name: 'Black Nishati',
    subtitle: 'NAICCON Character',
    year: '2024',
    category: 'Event Character',
    heroImg: IMAGES.black_nishati_full,
    tagline: 'A powerful full-body warrior character built for NAICCON, combining hyperrealistic anatomical detail with high-impact stylised armour and dark energy aesthetics.',
    writeup: `Black Nishati (meaning "Black Energy" in Swahili) is the second character produced for the NAICCON convention series. Where Shirock embodies the youthful, colourful spirit of pop culture fandom, Black Nishati represents the darker, more mature character archetype.

The full-body construction posed significant technical challenges — the character's armour required separate simulation for each plate segment, with cloth dynamics for the underlayer computed in Marvelous Designer. The character stands at a heroic 8-head proportion, with exaggerated musculature that references both anime character design traditions and African warrior iconography.

Post-processing in Nuke added the energy particle effects visible in the final renders — a custom particle system rendered separately and composited with Z-depth for proper spatial integration.`,
    specs: {
      software: ['ZBrush', 'Maya', 'Marvelous Designer', 'Nuke', 'Substance Painter'],
      polycount: '9.1M (sculpt) · 280K (game mesh)',
      textures: '14 UDIM sets · 8K resolution',
      renderEngine: 'Arnold · Nuke Compositing',
      client: 'NAICCON — East Africa',
      year: '2024',
      duration: '4 weeks',
    },
    images: [
      { url: IMAGES.black_nishati_full, caption: 'Full Body Render',  type: 'render'   },
      { url: IMAGES.black_nishati_half, caption: 'Half Body Portrait',type: 'render'   },
      { url: IMAGES.shirock_wire,       caption: 'Wireframe',         type: 'wireframe'},
    ],
    videos: [
      { youtubeId: null, title: 'Full Body Sculpting',      duration: '8:30', resolution: '1920×1080' },
      { youtubeId: null, title: 'Armour Design Pipeline',   duration: '5:15', resolution: '1920×1080' },
      { youtubeId: null, title: 'Nuke Compositing Process', duration: '3:10', resolution: '1920×1080' },
    ],
  },
  {
    slug: 'omollo-the-minotaur',
    name: 'Omollo',
    subtitle: 'The Minotaur',
    year: '2024',
    category: 'Creature Design',
    heroImg: IMAGES.omollo,
    tagline: 'A reimagining of the ancient Minotaur myth through an East African lens — combining bovine anatomical hyperrealism with warrior iconography and cultural textile elements.',
    writeup: `Omollo reframes the Minotaur archetype — a figure from Greek mythology — through an distinctly East African cultural lens. The name derives from a Luo lineage name, and the character's adornments reference Maasai, Samburu, and Turkana decorative traditions.

The creature sculpt required extensive anatomical reference work across both human and bovine musculature. The chest, arms and torso follow human proportional anatomy, while the head, neck and lower leg structure transitions progressively into bovine form. This anatomical hybrid required careful study of where muscle groups would realistically connect across species boundaries.

The surface texture work is some of the most technically demanding in the studio's portfolio — the hide texture transitions between human skin, animal hide, and scar tissue across the same continuous surface, requiring custom blend node networks in both ZBrush and Mari.`,
    specs: {
      software: ['ZBrush', 'Maya', 'Mari', 'Substance Painter', 'Arnold'],
      polycount: '11.2M (sculpt) · 310K (render mesh)',
      textures: '18 UDIM sets · 8K resolution',
      renderEngine: 'Arnold',
      client: 'Personal / Studio',
      year: '2024',
      duration: '5 weeks',
    },
    images: [
      { url: IMAGES.omollo,       caption: 'Final Render',    type: 'render'   },
      { url: IMAGES.cheetah_skull,caption: 'Skull Study',     type: 'render'   },
      { url: IMAGES.shirock_wire, caption: 'Wireframe',       type: 'wireframe'},
    ],
    videos: [
      { youtubeId: null, title: 'Creature Sculpting Process', duration: '9:45', resolution: '1920×1080' },
      { youtubeId: null, title: 'Skin Texture Painting',      duration: '6:20', resolution: '1920×1080' },
    ],
  },
  {
    slug: 'leopard-creature-study',
    name: 'Leopard',
    subtitle: 'Creature Study',
    year: '2023',
    category: 'Creature Design',
    heroImg: IMAGES.leopard_face,
    tagline: 'A photorealistic big cat study pushing the limits of fur simulation, subsurface skin scattering and anatomical accuracy in ZBrush and Mari.',
    writeup: `The Leopard creature study was undertaken as a pure technical challenge — a self-directed project to master the specific difficulties of quadruped anatomy, fur grooming and the subtle optical complexity of feline eyes.

The sculpt begins with skeletal structure and works outward through muscle groups, fat deposits, and finally skin and fur. This anatomical approach — starting from bone rather than surface — produces a believable underlying mass that prevents the kind of "rubber toy" quality that plagues less rigorous approaches to creature work.

Fur was grown using XGen in Maya with three distinct layers: underfur, guard hairs and vibrissae (whiskers). Each layer carries individual length, clump, noise and colour variation parameters. The spot pattern was painted as a density map driving the clump variation — allowing the characteristic rosette pattern to emerge naturally rather than being placed manually.`,
    specs: {
      software: ['ZBrush', 'Maya', 'XGen', 'Mari', 'Arnold'],
      polycount: '7.8M (sculpt) · 240K (render mesh)',
      textures: '10 UDIM sets · 8K resolution',
      renderEngine: 'Arnold · XGen fur',
      client: 'Personal Study',
      year: '2023',
      duration: '3 weeks',
    },
    images: [
      { url: IMAGES.leopard_face, caption: 'Face Close-up',  type: 'render'   },
      { url: IMAGES.leopard_side, caption: 'Profile View',   type: 'render'   },
      { url: IMAGES.leopard_full, caption: 'Full Body',      type: 'render'   },
      { url: IMAGES.shirock_wire, caption: 'Base Mesh',      type: 'wireframe'},
    ],
    videos: [
      { youtubeId: null, title: 'ZBrush Sculpting Process',    duration: '6:50', resolution: '1920×1080' },
      { youtubeId: null, title: 'XGen Fur Grooming',           duration: '4:30', resolution: '1920×1080' },
      { youtubeId: null, title: 'Mari Texturing — Skin + Fur', duration: '5:10', resolution: '1920×1080' },
    ],

  },
];

/* ── REAL EVENT VIDEOS (Page 2 — Full Events) ───── */
export const EVENTS_REAL = [
  {
    id:'ev-real-01',
    thumb:'/thumbnails/ev_4th_july.png',
    youtubeId:'OI-_w1a7QKo',
    title:'4th of July — US Embassy Laser & Hologram Show',
    client:'US Embassy Nairobi',
    year:'2024',
    category:'Hologram · Laser Show · Live Event',
    description: `"This was an innovative project marking the 4th of July. The edit included a hologram that was to be overlaid with a laser show. Sadly, the show never saw the light of day for one reason or another, but I really loved editing this with a colleague of mine."`,
    screenDimensions:'1920×1080',
    aspectRatio:'16:9',
    format:'Full HD',
    duration:null,
  },
  {
    id:'ev-real-02',
    thumb:'/thumbnails/ev_better_living.png',
    youtubeId:'5RoJ60NlwV0',
    title:'Better Living — Brand Launch Video',
    client:'Better Living Supplements',
    year:'2024',
    category:'Product Launch · 3D Visualization · Motion Graphics',
    description: `"This was a beautiful project where I got to do several product renders, motion design for them, play with image renders and simply have fun with the product. The content was created for a 4m × 3m screen."`,
    screenDimensions:'1920×1080',
    aspectRatio:'16:9',
    format:'Full HD',
    duration:null,
  },
  {
    id:'ev-real-03',
    thumb:'/thumbnails/ev_cat_mantrac.png',
    youtubeId:'mZhLqv2t1CE',
    title:'CAT Mantrac — 100 Years Launch Video',
    client:'Mansour Mantrac / Caterpillar',
    year:'2024',
    category:'Corporate · 3D Visualization · Product Launch',
    description: `"This was a very demanding project. The whole project was to look majorly 3D/anamorphic, to celebrate the 100-year anniversary. Had lots of fun — I incorporated Unreal Engine into this project a lot more than I usually do, rendering some large image formats up to 9000 × 1800 pixels. The content was edited for a 20 × 4m screen."`,
    screenDimensions:'1920×1080',
    aspectRatio:'16:9',
    format:'Full HD',
    duration:null,
  },
  {
    id:'ev-real-04',
    thumb:'/thumbnails/ev_duracoat.png',
    youtubeId:'w5bFgoyPsNA',
    title:'DuraCoat AquaTech Rainshield — Launch Video',
    client:'DuraCoat Kenya',
    year:'2024',
    category:'Product Launch · 3D Visualization',
    description: `"This was one of those time-stacked projects. But so, so fun to do. It pushes you to adapt fast and figure out solutions faster than usual. I really enjoyed it. The video was edited for a 4 × 3m screen."`,
    screenDimensions:'1920×1080',
    aspectRatio:'16:9',
    format:'Full HD',
    duration:null,
  },
  {
    id:'ev-real-05',
    thumb:'/thumbnails/ev_enewe_rri.png',
    youtubeId:'8yyT47Kv2pQ',
    title:'ENEWE & RRI — Book Launch Video',
    client:'ENEWE / RRI',
    year:'2024',
    category:'Book Launch · Motion Graphics · Event Screen Content',
    description: `"This was one of those projects that hit home. Those ones that make you understand the need not to just create a cool video, but also to create an impact, to spread a message. I enjoyed this — everything about it felt right. The content was made for an 8 × 3m screen."`,
    screenDimensions:'1920×1080',
    aspectRatio:'16:9',
    format:'Full HD',
    duration:null,
  },
  {
    id:'ev-real-06',
    thumb:'/thumbnails/ev_fit_attiya.png',
    youtubeId:'lk8t8vw9Km0',
    title:'FitWithAttiya — App Launch Video',
    client:'FitWithAttiya — Food & Fitness',
    year:'2024',
    category:'App Launch · Motion Design · Product Video',
    description: `"This was a phone app launch video edit. It was a short-notice video, but then again it was quite a hack. The video was edited for a 3 × 2m screen."`,
    screenDimensions:'1920×1080',
    aspectRatio:'16:9',
    format:'Full HD',
    duration:null,
  },
  {
    id:'ev-real-07',
    thumb:'/thumbnails/ev_gemini1.png',
    youtubeId:'3sTzGQc5q1M',
    title:'Gemini 1 — Launch Video',
    client:'Gemini',
    year:'2024',
    category:'Brand Launch · Motion Graphics · Visual Effects',
    description: `"Among the first launch videos I created at the time. I really enjoyed writing the script and narration as well as the edit. Most of the beautiful static renders given by the client needed just a little motion. I really enjoyed this one."`,
    screenDimensions:'1920×1080',
    aspectRatio:'16:9',
    format:'Full HD',
    duration:null,
  },
  {
    id:'ev-real-08',
    thumb:'/thumbnails/ev_kps.png',
    youtubeId:'zUo5aqxEE3M',
    title:'KPS Strategic Plan 2023–2027 — Book Launch',
    client:'Ministry of Interior & National Administration',
    year:'2023',
    category:'Government · Book Launch · Motion Graphics',
    description: `"There\'s short notice, and then there is \'short notice\'. No excuse given — the video was edited in time. Had to think fast on this one, and I loved the result. And as per my title, 3D had to be added regardless. Animation is the craft, motion is its cornerstone."`,
    screenDimensions:'1920×1080',
    aspectRatio:'16:9',
    format:'Full HD',
    duration:null,
  },
  {
    id:'ev-real-09',
    thumb:'/thumbnails/ev_makini.png',
    youtubeId:'_6W3lWi5p0k',
    title:'Makini Schools — Logo Hologram Launch',
    client:'Makini Schools',
    year:'2024',
    category:'Hologram · Logo Animation · Projection Mapping',
    description: `"This was a 2nd piece to the main show. There was screen content, and then there is hologram content for the main launch moment. This was really fun to create. Holograms have to be in 3D in order to get that look — hence this was really fun to create."`,
    screenDimensions:'3840×2160',
    aspectRatio:'16:9',
    format:'4K UHD',
    duration:null,
  },
  {
    id:'ev-real-10',
    thumb:'/thumbnails/ev_mcc2026.png',
    youtubeId:'Jx4G4F6DjV8',
    title:'Mashariki Cooperation Conference 2026 — Event Opener',
    client:'Mashariki Cooperation Conference',
    year:'2026',
    category:'Conference · Event Opener · Motion Graphics',
    description: `"This was an event opener video. It was to be a laser show with screen content. Had real fun. The beauty of it all — the combination of 2 mediums — tests your skillset to measure your understanding of how both function and their constraints as they merge to tell a story."`,
    screenDimensions:'3840×2160',
    aspectRatio:'16:9',
    format:'4K UHD',
    duration:null,
  },
  {
    id:'ev-real-11',
    thumb:'/thumbnails/ev_sic.png',
    youtubeId:'KWFt4py_YJ8',
    title:'SIC Investment Co-operative — Screen & Projection Launch',
    client:'SIC Investment Co-operative',
    year:'2024',
    category:'Corporate Launch · Screen Content · Projection',
    description: `"This was one of the first event launch edits. At the time I first did this project, I had to immerse myself into a different mindset. The content was both for the screen as well as a projection on the logo initials — a truly unique setup and idea. Not to mention the video had to be edited to incorporate a dancer moving part of the logo. Truly mind-boggling. I really loved this."`,
    screenDimensions:'1920×1080',
    aspectRatio:'16:9',
    format:'Full HD',
    duration:null,
  },
  {
    id:'ev-real-12',
    thumb:'/thumbnails/ev_thandiwe_atong.png',
    youtubeId:'pl5ZGZh1mqI',
    title:'Thandiwe & Atong — Double Exposure Projection',
    client:'Darwin Street Art Festival / Good Times Africa',
    year:'2025',
    category:'Projection Mapping · International Collaboration · Art Festival',
    description: `"This is one of those projects you wish you could meet the artist on the other side. I truly loved these artworks. My part in this was to edit a building projection video sequence to announce their show. These artworks are really beautiful. I am glad I had a part to play, even if it was for a few nights."`,
    screenDimensions:'1080×1920',
    aspectRatio:'9:16',
    format:'Vertical Full HD',
    duration:null,
  },
  {
    id:'ev-real-13',
    thumb:'/thumbnails/ev_tusker.png',
    youtubeId:'5xSvwoB-snI',
    title:'Tusker Lite — Projection Launch Video',
    client:'Kenya Breweries Limited (KBL)',
    year:'2024',
    category:'Brand Launch · Projection · Product Visualization',
    description: `"This was one of those projects whose simple concept allowed me to understand the power of projection mapping. This was a building projection mapping video done on different buildings and surfaces along Thika Road as well as Nairobi CBD. I truly loved it. A major incorporation was the Bifrost simulation which I had a really fun time diving into. I loved this one."`,
    screenDimensions:'1920×1080',
    aspectRatio:'16:9',
    format:'Full HD',
    duration:null,
  },
  {
    id:'ev-real-14',
    thumb:'/thumbnails/ev_virtualpay.png',
    youtubeId:'hwMfJFKejnY',
    title:'Virtual Pay — Visa Launch Video',
    client:'Virtual Pay',
    year:'2024',
    category:'Fintech · Corporate Launch · Motion Graphics',
    description: `"This is one of those projects where the edit and elements are to feel futuristic. Some would even say techy. I really loved this one — combining finance and technology. I love projects that just make you think differently, breaking away from the usual edit mould."`,
    screenDimensions:'1920×1080',
    aspectRatio:'16:9',
    format:'Full HD',
    duration:null,
  },
  {
    id:'ev-real-15',
    thumb:'/thumbnails/ev_jabali.png',
    youtubeId:'lvArJrydaHw',
    title:'Jabali Tower — Launch Video',
    client:'Jabali Towers',
    year:'2025',
    category:'Property Launch · Compositing · 3D Motion',
    description: `"This was one of those time crunch videos where I couldn't just dive into 3D because of render time, so I relied heavily on compositing the scenes from images to provide a 3D feel. I still heavily enjoyed it. The video was made for a 6 × 3m screen."`,
    screenDimensions:'1920×1080',
    aspectRatio:'16:9',
    format:'Full HD',
    duration:null,
  },
  {
    id:'ev-real-16',
    thumb:'/thumbnails/ev_kwal_county.png',
    youtubeId:'rjvmdliESTo',
    title:'KWAL County Kwaruza Ushinde — Launch Video',
    client:'KWAL',
    year:'2026',
    category:'Brand Launch · 3D Compositing · AI Workflow',
    description: `"This is one of those videos that's a mental game-changer. From doing the scenes in Maya, to rendering out frames and exploring the capabilities of AI, and even playing with 3D obj/glb files in After Effects, this video had me rethinking how to be more efficient and change my workflow, especially when it comes to long render times in Maya as opposed to 3D integrated models in AE."`,
    screenDimensions:'1920×1080',
    aspectRatio:'16:9',
    format:'Full HD',
    duration:null,
  },
];
/* ── REAL VIDEO SECTIONS — Portfolio Page ─────────── */

export const EVENT_VIZ_REAL = [
  { img:'/thumbnails/ev_viz_bmb.png',             title:'BMB Event Visualization',               sub:'Event Setup · 3D Pre-vis',        youtubeId:'HozR7DilnX4' },
  { img:'/thumbnails/ev_viz_heineken.png',         title:'Heineken Mass House Visualization',     sub:'Brand Event · Pre-vis',           youtubeId:'kjKh3XfnG_k' },
  { img:'/thumbnails/ev_viz_martell_aura.png',     title:'Martell Aura by Kadi Visualization',   sub:'Luxury Event · Pre-vis',          youtubeId:'YkmzfPuv91U' },
  { img:'/thumbnails/ev_viz_martell_brunch.png',   title:'Martell Brunch — Junction Mall',       sub:'Brand Event · Pre-vis',           youtubeId:'YFBOtIH-_Bg' },
  { img:'/thumbnails/ev_viz_martell_redroom.png',  title:'Martell Redroom Event Visualization',  sub:'Event Setup · Pre-vis',           youtubeId:'i-Hj7F86PSQ' },
  { img:'/thumbnails/ev_viz_martell_xxo.png',      title:'Martell XXO Launch 1st Visualization', sub:'Luxury Brand · Pre-vis',          youtubeId:'iiLE51ZZ8Dg' },
  { img:'/thumbnails/ev_viz_xiaomi.png',           title:'Xiaomi Redmi Visualization',           sub:'Product Launch · Pre-vis',        youtubeId:'hUa0Qv7QEhc' },
];

export const HOLOGRAM_REAL = [
  { img:'/thumbnails/ev_hologram_safaricom.png',   title:'Safaricom Emerald Hologram BTS',       sub:'Hologram · BTS · Safaricom',      youtubeId:'1VyJpDsTG9c' },
  { img:'/thumbnails/ev_hologram_xiaomi.png',      title:'Xiaomi Redmi Note 14 Hologram',        sub:'Product Hologram · Xiaomi',       youtubeId:'_m7PEg7vFK8' },
];

export const PRODUCT_VIZ_REAL = [
  { img:'/thumbnails/ev_prod_asili.png',            title:'Asili Homes 3D Visualization',         sub:'Property · Twinmotion',           youtubeId:'4mUtipeiTCI' },
  { img:'/thumbnails/ev_prod_better_living.png',    title:'Better Living — 3D Sachet Render',     sub:'Product Render · 3D',             youtubeId:'-9KBgvsCPF0' },
  { img:'/thumbnails/ev_prod_better_living_brown.png', title:'Better Living Brown — 3D Sachet',  sub:'Product Render · 3D',             youtubeId:'qvXD4uweI_w' },
  { img:'/thumbnails/ev_prod_lamborghini.png',      title:'Lamborghini 3D Visualization',         sub:'Vehicle · Twinmotion',            youtubeId:'GMFj7HMfBPQ' },
];

export const PROJECTION_REAL = [
  { img:'/thumbnails/ev_proj_africa_summit.png',  title:'Africa Summit Building Projection 2026', sub:'Architectural Mapping · Summit 2026',  youtubeId:'T2ULW6GWciM' },
  { img:'/thumbnails/ev_proj_kicc_xmas.png',      title:'KICC Christmas Projection Video',         sub:'Architectural · Festive Mapping',      youtubeId:'SnVOUKtUV4M' },
  { img:'/thumbnails/ev_proj_kicc_raila.png',     title:'KICC Raila Memorial Projection',          sub:'Commemorative · Architectural Mapping', youtubeId:'gjEAIJEYa9I' },
  { img:'/thumbnails/ev_proj_tusker.png',         title:'Tusker Lite Launch CBD Projection',       sub:'Brand Launch · Thika Road · Nairobi CBD', youtubeId:'j_x2hXqsGUc' },
  { img:'/thumbnails/ev_proj_chrome.png',         title:'Chrome Party KICC Projection',            sub:'Event · Architectural Mapping · KICC',  youtubeId:'MvdeIPAZNrU' },
  { img:'/thumbnails/ev_proj_wedding_cake.png',   title:'Wedding Cake Projection',                 sub:'Event · Object Projection Mapping',     youtubeId:'CShG6bQusms' },
  { img:'/thumbnails/ev_proj_wedding_dress.png',  title:'Wedding Dress Projection',                sub:'Event · Object Projection Mapping',     youtubeId:'i-uNaEs5ORQ' },
];

/* ── OLDER REELS ─────────────────────────────────── */
export const OLDER_REELS = [
  { img:'/thumbnails/reel_2023_2024.png', title:'2023–2024 Motion Graphics Reel', sub:'Emmanuel Chege · Motion Graphics Artist', youtubeId:'uhDvjdieXvE' },
  { img:'/thumbnails/reel_2020_2023.png', title:'2020–2023 3D Generalist Reel',   sub:'Emmanuel Chege · 3D Generalist',          youtubeId:'AIEFJXTwYcU' },
];

/* ── SOCIAL MEDIA CONTENT (21 items — 2 rows) ─────── */
export const SOCIAL_MEDIA_ROW1 = [
  { img:'/thumbnails/soc_nuvita.png',          title:'15th Anniversary Nuvita Lockup',         sub:'Motion Graphics · Social',  youtubeId:'ErLYELN2MNE' },
  { img:'/thumbnails/soc_nuvita_lockup1.png',  title:'Nuvita Lock Up Animation',               sub:'Motion Graphics · Social',  youtubeId:'GkrcFG2UWaY' },
  { img:'/thumbnails/soc_nuvita_lockup2.png',  title:'Nuvita Lock Up Animation 2',             sub:'Motion Design · Social',    youtubeId:'FpfbNvzG_0c' },
  { img:'/thumbnails/soc_nuvita_revup.png',    title:'Nuvita Rev Up Animation',                sub:'GIF Animation · Social',    youtubeId:'yEH9dMnoRD0' },
  { img:'/thumbnails/soc_nuvita_snack.png',    title:"Nuvita Snack O'Clock Animation",         sub:'GIF Animation · Social',    youtubeId:'ZmvIQh1samg' },
  { img:'/thumbnails/soc_nuvita_styd.png',     title:'Nuvita STYD GIF Animation',              sub:'GIF Motion · Social',       youtubeId:'SdhyBrgDpSg' },
  { img:'/thumbnails/soc_aar_card.png',        title:'AAR Access Card Inhouse Explainer',      sub:'Explainer · Motion',        youtubeId:'3S-p91lO6w0' },
  { img:'/thumbnails/soc_aar_eldoret.png',     title:'AAR Eldoret OPC Explainer',              sub:'Explainer · Motion',        youtubeId:'AobvpX9d2zg' },
  { img:'/thumbnails/soc_biriani.png',         title:'Biriani Karata Animation',               sub:'GIF Animation · Social',    youtubeId:'4iEk32heLOU' },
  { img:'/thumbnails/soc_masterchef.png',      title:'Master Chef Find the Pack',              sub:'Motion Graphics · Social',  youtubeId:'4QDKBI1kxtA' },
  { img:'/thumbnails/soc_rwandair.png',        title:'RwandAir Dream Miles Animation & VFX',   sub:'Animation · VFX · Social',  youtubeId:'mTFp7rxXWYo' },
];

export const SOCIAL_MEDIA_ROW2 = [
  { img:'/thumbnails/soc_daawat_battery.png',  title:'Daawat Battery Food Animation',          sub:'GIF Animation · Social',    youtubeId:'ttrPBJMBjiM' },
  { img:'/thumbnails/soc_daawat_feast.png',    title:'Daawat Feast Food GIF Animation',        sub:'GIF Motion · Social',       youtubeId:'SIjQThS4MuQ' },
  { img:'/thumbnails/soc_daawat_fortune.png',  title:'Daawat Fortune Wheel GIF',               sub:'GIF Animation · Social',    youtubeId:'vaYQ7-DjtkU' },
  { img:'/thumbnails/soc_daawat_loop.png',     title:'Daawat Meal on a Loop Animation',        sub:'GIF Motion · Social',       youtubeId:'ihgivsvnZy8' },
  { img:'/thumbnails/soc_daawat_roulette.png', title:'Daawat Roulette Wheel Animation',        sub:'GIF Animation · Social',    youtubeId:'PKvYNF6PVkQ' },
  { img:'/thumbnails/soc_her_future.png',      title:'Her Future is Bright Lockup Animation',  sub:'Motion Design · Social',    youtubeId:'dW734YdcW1M' },
  { img:'/thumbnails/soc_pembe_donut.png',     title:'Pembe Donut GIF Animation',              sub:'GIF Animation · Social',    youtubeId:'-894dXg84X0' },
  { img:'/thumbnails/soc_vipingo_dad1.png',    title:"Vipingo Father's Day Animation",         sub:'Motion Design · Social',    youtubeId:'CzYBAP7a6WE' },
  { img:'/thumbnails/soc_vipingo_dad2.png',    title:"Vipingo Father's Day Animation 2",       sub:'Motion Design · Social',    youtubeId:'gTQWGEL8YsM' },
  { img:'/thumbnails/soc_vipingo_tuspin.png',  title:'Vipingo Tuspin Ki Master GIF',           sub:'GIF Animation · Social',    youtubeId:'qU4SMeoDHrk' },
];

/* ── DRONE SHOWS ─────────────────────────────────── */
export const DRONE_SHOWS = [
  {
    id:'ds-01', slug:'mcc-drone-show',
    title:`M.C.C. Drone Show Concept`,
    client:`Mashariki Cooperation Conference`,
    year:'2026', location:`Diani, Kenya`,
    status:'completed',
    conceptYoutubeId:'d3tHKHMC_dk',
    visualizerYoutubeId:'Uf7Qa9oGWvM',
    tagline:`A geopolitical aerial narrative for Africa's premier security forum.`,
    description:`A large-scale drone show concept designed for the Mashariki Cooperation Conference 2026 in Diani — a forum uniting African nations around security, intelligence and regional stability. The show traces a narrative arc from the continent's rising power to a call for collective vigilance, closing with a promise of continued partnership.`,
    script:[
      {section:``, text:`"In a world redefined by shifting alliances, emerging powers, and evolving threats, the pursuit of peace can no longer be passive. It must be deliberate. It must be courageous."`},
      {section:``, text:`"Tonight, we look upon one world; interconnected, interdependent and expectant."`},
      {section:``, text:`"As the global lens narrows, it focuses on this continent rising with purpose and undeniable potential. It focuses on Africa."`},
      {section:``, text:`"At the heart of this continent stands us, the African nations defined by dialogue, partnership and progress. African Nations, draped in the colors of resilience, unity and hope. And from the joint contribution and like minds of the visions of today and tomorrow, of the African people, we have gathered together for this convergence of like minded initiatives and strategies."`},
      {section:``, text:`"But first we extend a welcome. From these shores we say, 'Welcome to Diani,....Karibu Diani,.... where we join hands and minds, for this forum.'"`},
      {section:``, text:`"We gather for a forum unlike any other. The Mashariki Cooperation Conference 2026."`},
      {section:``, text:`"The Mashariki Cooperation Conference is where intelligence meets insight. Where policy meets strategy. Where the architects of security, diplomacy and intelligence unite to design the future."`},
      {section:``, text:`"Like the lion; vigilant, powerful and sovereign, we attendees of the Mashariki Cooperation Conference stand watch over regional stability. We recognize a fundamental truth; without stability there can be no prosperity; and without prosperity, peace cannot endure. We do not view security as a distant aspiration, but as a binding commitment to the lives and livelihoods of our African citizens."`},
      {section:``, text:`"Peace is not a silent state; it is an active build. It is forged through shared intelligence, collective vigilance and the refining of our frameworks to confront the shadows of tomorrow. Together, we safeguard African borders and strengthen Africa's collective resilience, ensuring our continent is not just a spectator, but a leader in the evolving dynamics of the global order."`},
      {section:``, text:`"Under the stewardship of visionary leadership and the shared resolve of regional partners, this Mashariki Cooperation Conference marks the path forward. It is here that intelligence transforms into cooperation, cooperation into strategy, and strategy into security."`},
      {section:``, text:`"From our African coastlines to our African capitals, the message is resolute: we are stronger together. We are more secure together. We are more resilient together. This is the essence of collective vigilance. This is the spirit of the Mashariki Cooperation Conference."`},
      {section:``, text:`"As the night sky bears witness to our unity, and the waters of Diani reflect this historic moment, we do not say 'Kwaheri' as a final farewell. We say it as a promise — a promise that the work continues, the partnership deepens and the mission of the Mashariki Cooperation Conference endures."`},
      {section:``, text:`"Mashariki Cooperation Conference 2026. Advancing Africa's Security Architecture in an Era of Emerging Geopolitical Dynamics. Together, for a secure, stable and prosperous Africa."`},
    ],
  },
  {
    id:'ds-02', slug:'kampala-museveni-swearing-in',
    title:`Kampala 1st Drone Show Concept`,
    client:`NRM / Government of Uganda`,
    year:'2026', location:`Kololo, Kampala, Uganda`,
    status:'completed',
    conceptYoutubeId:'cpQiuOn73zE',
    visualizerYoutubeId:'zsRliK41Dus',
    tagline:`Uganda's first drone show — a national story written in the Kampala sky.`,
    description:`Commissioned as Uganda's inaugural large-scale drone show for President Yoweri Museveni's swearing-in ceremony at Kololo. The narrative traces Uganda's transformation journey — from the Karuma Dam and Kiira Electric Bus, through digital connectivity and healthcare progress, to a celebration of NRM leadership and a personal message from the President.`,
    script:[
      {section:`Ugandan Map`, text:`"Here, in the Pearl of Africa, is Uganda, a nation driven by unity, resilience, vision and boundless potential; standing firm, charting its path toward prosperity. A nation anchored in peace, stability, and independence; symbolized by the vigilant crested crane. A guardian of dignity and progress."`},
      {section:`Karuma Dam — Infrastructure Revolution`, text:`"Through projects like the Karuma Dam; powering industries, lighting homes, and energizing a nation ready to transform."`},
      {section:`Kiira Motors Electric Bus`, text:`"As well as the Electric Bus project by Kiira Motors and the Uganda government, carrying not just people and goods, but the promise of a faster, stronger economy. From these foundations we have built, rises a new era of industrialization. Where Uganda adds value, manufactures, and competes on the global stage."`},
      {section:`Aviation`, text:`"Through innovation and development, we have built; not only modern roads but an aviation marvel that connects people, trade, and opportunity. Exporting the best of the hardworking hands of Uganda to the world, multiplying gains, creating wealth for the people, driving income, empowering farmers, youth and business people, and building a nation of producers."`},
      {section:`Healthcare & Social Progress`, text:`"With improved livelihoods, comes better access to education, healthcare, and dignity for every Ugandan."`},
      {section:`Digital Connections`, text:`"A digitally connected Uganda, where innovation thrives, youth lead, and ideas travel beyond borders. Empowering Ugandans, giving skills, educating and allowing us to shape our future."`},
      {section:`NRM Logo`, text:`"Guided by the principles of patriotism, pan-Africanism, socio-economic transformation, and democracy. The National Resistance Movement leads the journey forward, true to our slogan: A New Era, Protecting and Consolidating the Gains, as we make a Qualitative Leap into High Middle-Income Status. THE NRM IS GRATEFUL, to Ugandans for voting for us."`},
      {section:`President Yoweri Museveni`, text:`"With tested leadership and a vision for a new era, Uganda steps boldly into the future; confident, self-reliant, and unstoppable. With a vision of peace, unity and transformation for prosperity. And from him: To my fellow countrymen, countrywomen, and especially Bazukulu, I greet you all......."`},
      {section:`Thank You`, text:`"To the people of Uganda — THANK YOU FOR TRUSTING US TO PROTECT THE GAINS. Together, as one nation, one people… we rise."`},
      {section:`Finishing Note`, text:`"Welcome to Kololo, Tomorrow, 12th May 2026, 7am."`},
    ],
  },
  {
    id:'ds-03', slug:'la-mada-drone-show',
    title:`La Mada Drone Show Concept`,
    client:`NIS — National Intelligence Service`,
    year:'2025', location:`Kenya`,
    status:'completed',
    conceptYoutubeId:'_MZahXi2uck',
    visualizerYoutubeId:'XcnjwO4LLlc',
    tagline:`A Swahili tribute to unity, service and the birth of Kenya's intelligence guardians.`,
    description:`A drone show concept created for Kenya's National Intelligence Service — code-named "Huduma" — delivered entirely in Swahili. Centred on the colours of the Kenyan flag as unifying thread, the show celebrates cultural identity, NIS's founding spirit and their motto: Twategemewa. Tuko. Twaweza. A rare and personal commission closing with New Year's wishes for 2026.`,
    script:[
      {section:``, text:`"Katika taifa lililojaa utajiri wa tamaduni mbalimbali,
Rangi na michoro yetu husukwa pamoja kusimulia hadithi yetu.
Tukiunganishwa na rangi za bendera moja inayotuvuta karibu,
Ardhi moja inayoturuzuku sote."`},
      {section:`Rangi za Bendera`, text:`"Nyeusi kwa watu wake,
Nyekundu kwa damu ya mapambano yetu,
Kijani kwa ardhi yetu yenye uhai na ustawi,
na Nyeupe kwa amani tunayochagua kuishi nayo."`},
      {section:`Kuzaliwa kwa Huduma`, text:`"Kutokana na rangi na michoro hii inayolisuka taifa letu,
Kikosi kilizaliwa — Huduma, kundi la wanaume na wanawake,
Imara katika umoja — Strong in Unity —
Waliojitolea kwa watu na taifa."`},
      {section:``, text:`"Huduma iliyo thabiti katika wajibu wake,
Isiyoyumba katika dhamira yake.
Steadfast in Duty."`},
      {section:`Kauli Mbiu ya NIS`, text:`"Hivyo basi, NIS ilizaliwa —
Ulinzi wa juu kabisa wa taifa letu, Walinda usalama wetu.
Wanaishi kwa kauli mbiu yao:
Twategemewa. Tuko. Twaweza."`},
      {section:``, text:`"Kauli mbiu inayoakisi dhamira thabiti ya kuhudumia
Ushonaji unaopita katika tamaduni, nyakati, maeneo, hadhi, tabaka na rangi —
Muundo wa kudumu unaotuunganisha, kutulinda na kutuleta pamoja."`},
      {section:`Misingi ya Taifa`, text:`"Kwa kuwa tumeunganishwa na bendera na ardhi, tunaishi kwa misingi ya:
Amani, Upendo, Na Umoja."`},
      {section:``, text:`"Heri ya Sikukuu kwenu nyote, Happy Holidays na Heri ya Mwaka Mpya 2026. Happy New Year 2026."`},
    ],
  },
  {
    id:'ds-04', slug:'eu-kenya-relations',
    title:`EU–Kenya Relations Drone Show Concept`,
    client:`European Union / Kenya`,
    year:'2025', location:`Kenya`,
    status:'completed',
    conceptYoutubeId:'AgCrVkj5FRQ',
    visualizerYoutubeId:'PYodpMWMOFo',
    tagline:`50 years of partnership written in light — a bilateral story across the night sky.`,
    description:`A commemorative drone show concept celebrating 50 years of diplomatic and development partnership between the European Union and Kenya. The narrative begins with a spark in the dark and moves through shared milestones, symbols and values, closing with the Swahili word "Pamoja" — Together — as the defining message for the next half-century.`,
    script:[
      {section:`Take Off`, text:`"From shared values, shared dreams and a shared future; tonight we celebrate a remarkable journey."`},
      {section:`50 Years Logo`, text:`"For fifty years, Kenya and the European Union have walked a journey of partnership, friendship, and progress. Fifty years of growing together."`},
      {section:`EU–Kenya Flags`, text:`"Across generations, our partnership has evolved; creating opportunities, strengthening communities, and building lasting connections."`},
      {section:`EU–Kenya Text & Symbols`, text:`"Two identities. Two histories. One enduring partnership. Bound by cooperation, strengthened by trust."`},
      {section:`Umoja`, text:`"In Kenya, we call it Umoja. Unity. The spirit that reminds us that progress is strongest when built together."`},
      {section:`Pamoja`, text:`"A future full of possibility ahead. European Union and Kenya; Pamoja — Together — shaping tomorrow."`},
      {section:`Landing`, text:`"Celebrating fifty years of partnership, and the many more still to come. Asante sana."`},
    ],
  },
  {
    id:'ds-05', slug:'hfck-drone-show',
    title:`HFCK Drone Show Concept`,
    client:`HFCK`, year:'2025', location:`Kenya`,
    status:'concept',
    conceptYoutubeId:'z3jYN-6Ym_8',
    visualizerYoutubeId:null,
    tagline:`A brand evolution story — from a founding spark to the cheetah that defines HFCK.`,
    description:`A drone show concept developed for HFCK's brand relaunch — a narrative journey from the very first spark of inception, through a timeline of milestones and previous identities, to the cheetah emerging as the defining symbol of HFCK's speed, precision and forward momentum. The show culminates in the new brand reveal. As of publication, this concept awaits production.`,
    script:[
      {section:`The Spark and Blast`, text:`"In the beginning, a spark. A single pulse in the dark; small, yet filled with promise. And in an instant, it ignites. The birth of our journey."`},
      {section:`Timeline Wave + Previous Names/Logos`, text:`"From that moment, time begins to move, and as the waves of time ripple outwards, each line a story, each arc a milestone. Across the years, through change and growth, we see the marks of where we have been. The legacy that has helped shape who we are today."`},
      {section:`Kenya Map + Locations`, text:`"Now, the journey finds us home, here in Kenya. Across the land, where we are touching lives, building futures, reaching every corner with purpose."`},
      {section:`Vortex`, text:`"But progress never stands still. What was once a single path… begins to evolve."`},
      {section:`Cheetah Emergence`, text:`"And from this force… emerges speed. Precision. Power. Moving with purpose, each stride faster than the last, carrying the momentum of everything we've built."`},
      {section:`The Final Reveal`, text:`"Behold… the future. Refined. Bold. Unstoppable. The mark of progress, redefined. This… is HFCK. Rooted in legacy, driven by innovation, and moving always forward. Creating great."`},
    ],
  },
  {
    id:'ds-06', slug:'our-oceans-conference',
    title:`Our Oceans Conference Drone Show Concept`,
    client:`Our Ocean Conference`,
    year:'2025', location:`Mombasa, Kenya`,
    status:'concept',
    conceptYoutubeId:'_-eVseiaA7g',
    visualizerYoutubeId:null,
    tagline:`A maritime narrative for Africa's first hosting of the world's premier ocean action conference — regrettably cancelled.`,
    description:`A drone show concept developed for Kenya's hosting of the Our Ocean Conference 2025 — the world's premier ocean action summit. The show traces a journey from the depths of the Indian Ocean through Africa's rising voice in global conservation, closing with a collective commitment to protect 30% of the world's oceans by 2030. The show was regrettably cancelled before production.`,
    script:[
      {section:`The Blue Planet`, text:`"From the depths of the Indian Ocean to the shores of every continent, our blue planet connects us all. The ocean is our life support system. It shapes our climate, feeds our communities, and carries our shared future."`},
      {section:`Africa Rising`, text:`"For the first time, Africa hosts the world's premier ocean action conference. Here in Kenya, a continent rich in heritage and innovation welcomes the world."`},
      {section:`Kenya's Coast`, text:`"For centuries, the waters of the Western Indian Ocean have carried cultures, commerce and stories. These waters are not only our heritage. They are our responsibility."`},
      {section:`The Coral Reef`, text:`"Beneath the surface lies a world of extraordinary beauty. Coral reefs shelter life. They protect our shores and sustain millions of livelihoods."`},
      {section:`Threats to the Ocean`, text:`"Yet our oceans face unprecedented challenges. Pollution; Overfishing; Climate change; Every year, the balance of marine life grows more fragile."`},
      {section:`Climate Action`, text:`"But there is hope. Around the world, nations, communities, and innovators are taking action. Together, we can restore what has been damaged."`},
      {section:`Protected Oceans`, text:`"Marine protected areas safeguard biodiversity. They create resilience. They preserve ecosystems for generations yet to come."`},
      {section:`Sustainable Blue Economy`, text:`"A sustainable blue economy balances prosperity with stewardship. Protecting the ocean does not limit opportunity. It creates it."`},
      {section:`Global Partnership`, text:`"No nation can protect the ocean alone. Progress depends upon partnership. Science. Investment. Innovation. And collective commitment."`},
      {section:`Our Ocean Conference`, text:`"Today, leaders, scientists, entrepreneurs, and communities gather with a common purpose. To turn ambition into action. And commitments into measurable impact."`},
      {section:`30% by 2030`, text:`"Together, we advance the global vision of protecting thirty percent of our ocean by 2030. A promise to future generations. A commitment to our shared home."`},
      {section:`Grand Finale`, text:`"The story of the ocean is the story of humanity. What we choose today will shape the world of tomorrow. Let us protect what sustains us. Let us preserve what inspires us. Let us build a future worthy of the generations to come. Our Ocean. Our Heritage. Our Future."`},
    ],
  },
];

