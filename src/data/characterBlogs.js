/* ─────────────────────────────────────────────────────────────
   CHARACTER BLOGS — data-driven "Odungi breakdown" model
   Each character = ordered blocks rendered by <BlockRenderer/>.
   Images pulled from Google Drive by file id. Empty slots render
   as dashed placeholder frames, to be filled in future builds.
   ───────────────────────────────────────────────────────────── */

const img = (id, sz = 'w1200') => `https://drive.google.com/thumbnail?id=${id}&sz=${sz}`;

/* frame helper: {src,tag,label,spec} — src null => dashed placeholder */
const F = (src, tag, label, spec) => ({ src: src || null, tag, label, spec });
/* pad an array of frames up to n with dashed placeholders */
const pad = (frames, n, tag, label, spec) => {
  const out = frames.slice();
  while (out.length < n) out.push(F(null, tag, label, spec));
  return out;
};

/* skeleton rows for spec tables (values filled in future builds) */
const SHADER_ROWS = ['Base Weight','Base Color','Specular Weight','Specular Roughness','Specular IOR',
  'Subsurface Weight','Subsurface Color','Subsurface Radius (mm)','Coat Weight','Coat Roughness','Displacement']
  .map(k => ({ k, v: '' }));
const SAMPLING_ROWS = ['Camera (AA)','Diffuse','Specular','SSS','Transmission','Ray Depth (total)','Adaptive Threshold']
  .map(k => ({ k, v: '' }));
const COLOUR_ROWS = ['Rendering Space','View Transform','Albedo / SSS Color in','Data maps in','Key principle']
  .map(k => ({ k, v: '' }));
const LIGHT_ROWS = ['Key','Fill','Rim / Kicker','Bounce','Skydome / HDRI']
  .map(name => ({ name, type: '', intensity: '', colour: '', samples: '' }));
const MAP_SET = ['Albedo','Displacement','Spec Roughness','SSS Color','Cavity','Normal']
  .map(label => F(null, 'Map', label, ''));
const XGEN_CHIPS = ['Guides','Density map','Clump','Cut + noise','Region masks','Vellus'];
const AOV_CHIPS = ['beauty','diffuse','specular','SSS','coat','N · P · Z','cryptomatte','multi-pass EXR'];

/* build the standard 10-section breakdown for one character */
function buildBlocks(s = {}) {
  const g = (k) => Array.isArray(s[k]) ? s[k] : [];
  return [
    { t:'head', num:'01', title:'Reference &', accent:'Intent' },
    { t:'prose' },
    { t:'frames', cols:3, items: pad(g('ref'), 3, 'Ref', 'Reference', 'reference plate') },

    { t:'head', num:'02', title:'Blockout &', accent:'Sculpt' },
    { t:'prose' },
    { t:'callout', title:'Subdivision Strategy' },
    { t:'frames', cols:3, items: pad(g('sculpt'), 3, 'Sculpt', 'ZBrush Sculpt', 'subdivision pass') },
    { t:'video', label:'Sculpting Timelapse', spec:'process video', youtubeId:null },

    { t:'head', num:'03', title:'Retopo &', accent:'UVs' },
    { t:'prose' },
    { t:'frames', cols:2, items: pad(g('uv'), 2, 'UV', 'UDIM Layout / Wireframe', 'topology') },

    { t:'head', num:'04', title:'Texturing &', accent:'Map Authoring' },
    { t:'prose' },
    { t:'frames', cols:2, items: pad(g('tex'), 2, 'Texture', 'Texturing Pass', 'Mari / Substance') },
    { t:'maps', items: MAP_SET },
    { t:'callout', title:'Why this matters — melanated skin' },

    { t:'head', num:'05', title:'Shading —', accent:'Hypershade' },
    { t:'prose' },
    { t:'frames', cols:2, items: pad(g('shading'), 2, 'Lookdev', 'Shading Study', 'skin response') },
    { t:'nodegraph', label:'aiStandardSurface Network', spec:'Hypershade — full graph capture' },
    { t:'valueTable', caption:'Skin Shader — aiStandardSurface', chip:'values coming soon', rows: SHADER_ROWS },

    { t:'head', num:'06', title:'Grooming —', accent:'XGen' },
    { t:'prose' },
    { t:'chips', items: XGEN_CHIPS },
    { t:'frames', cols:2, items: pad(g('xgen'), 2, 'XGen', 'Grooming Pass', 'guides / density') },
    { t:'video', label:'Grooming Process — XGen', spec:'process video', youtubeId:null },

    { t:'head', num:'07', title:'Lighting &', accent:'Colour Management' },
    { t:'prose' },
    { t:'lightRig', caption:'Light Rig — Scene Setup', chip:'values coming soon', rows: LIGHT_ROWS },
    { t:'valueTable', caption:'Colour Pipeline', chip:'OCIO / ACES', rows: COLOUR_ROWS },

    { t:'head', num:'08', title:'Render', accent:'Settings' },
    { t:'prose' },
    { t:'valueTable', caption:'Sampling', chip:'coming soon', rows: SAMPLING_ROWS },
    { t:'chips', items: AOV_CHIPS },

    { t:'head', num:'09', title:'Lookdev &', accent:'Realtime' },
    { t:'prose' },
    { t:'video', label:'Turntable', spec:'realtime / path-traced', youtubeId:null },
    { t:'frames', cols:2, items: pad(g('lookdev'), 2, 'Render', 'Final Render', 'lookdev') },

    { t:'head', num:'10', title:'', accent:'Retrospective' },
    { t:'pullquote' },
    { t:'prose' },
  ];
}

function cBlog(meta) {
  return {
    slug: meta.slug, name: meta.name, epithet: meta.epithet,
    category: meta.category, year: meta.year, tagline: meta.tagline,
    thumb: meta.thumb || meta.hero || null,
    hero: meta.hero || null,
    heroBg: meta.heroBg || null,
    outro: meta.outro || null,
    specs: meta.specs || {},
    blocks: meta.blocks || buildBlocks(meta.img),
  };
}


/* ── ARYA — bespoke case study (custom blocks, not the 10-part template) ── */
const A = (n) => `/arya/${n}.jpg`;
const AF = (n, tag, label, spec) => F(A(n), tag, label, spec);

const ARYA_BLOCKS = [
  { t:'head', num:'01', title:'Where it', accent:'began' },
  { t:'prose', body:[
    'Sometimes the process takes you somewhere unexpected — and that is where the real growth happens.',
    'While studying Mari texturing across different sources, I came across a character by FlippedNormals, which I named Arya. What started as a focus on VFX-level photorealistic texturing eventually shifted into something deeper: an understanding of how light behaves across the surface detail I had created.',
    'The character was first prepared in ZBrush. Using ZWrap, I morphed a realistic human female scan onto the facial geometry, giving me a clean, anatomically grounded base to build on. From there I moved into Mari for the texture transfers, then painted my own custom texture work on top — correcting, refining, and making the maps my own.',
    'I challenged myself to understand lighting more intentionally, beyond the classic setup I learnt years back — key, fill, backlight and HDRI. I experimented with spotlights and gobos, shaping light to create mood, depth and a more cinematic realism.',
    'I am still learning and refining lighting until it fits my art style and language — until it speaks.',
  ]},
  { t:'prose', body:[
    'The reference board below is what the whole build was measured against — flat twists and cornrows for the head, long braid work, brows and lashes, peach fuzz across the jaw and hairline, and the skin plate that everything else had to sit convincingly beside.',
  ]},
  { t:'frames', cols:1, items:[ AF('reference_board','Reference','Reference Board','skin \u00b7 hair \u00b7 brows \u00b7 lashes \u00b7 peach fuzz') ]},

  { t:'head', num:'02', title:'Light before', accent:'skin' },
  { t:'prose', body:[
    'These clay renders test how the lighting holds up across form and angle. I wanted to see whether the mood stays consistent even as the character shifts — before any texture work could flatter it.',
    'The goal was never complexity. It was control: enough command of the light to keep a photoreal feel while the surface was still untextured.',
  ]},
  { t:'frames', cols:3, items:[
    AF('clay_01','Clay','Three-Quarter','form test'),
    AF('clay_02','Clay','Front — Raised','light hold'),
    AF('clay_03','Clay','Front','symmetry'),
    AF('clay_04','Clay','Front — Soft','falloff'),
    AF('clay_05','Clay','Profile Turn','shadow shape'),
    AF('clay_06','Clay','Eyes — Detail','terminator'),
    AF('clay_07','Clay','Nose & Lips','micro form'),
    AF('clay_08','Clay','Edge Profile','rim read'),
  ]},
  { t:'callout', title:'The rig — studio setup plus one spotlight',
    body:'A standard studio setup — skydome, two umbrella lights and a backlight — with one addition that changed the image: an extra spotlight carrying a leaf gobo, throwing dappled shadow across the face and crown. That single light is what gives the portrait its sense of place.' },
  { t:'frames', layout:'row', items:[
    AF('setup_light_editor','Setup','Light Editor','intensity / exposure'),
    AF('setup_viewport','Setup','Lighting Viewport','rig placement'),
    AF('setup_gobo','Setup','Spotlight + Gobo','aiGobo filter'),
  ]},
  { t:'autovideo', label:'Lighting Breakdown', youtubeId:'kHZDXohh_yw' },

  { t:'head', num:'03', title:'Bringing Arya to life,', accent:'one layer at a time' },
  { t:'prose', body:[
    'The head is laid out across three UDIM tiles \u2014 the face and ears on the first, the skull and neck split across the other two \u2014 which is what allowed the pore and displacement detail to hold at close range without a single map having to carry everything.',
    'Substance Painter is what I reach for in daily production work, and Mari is a different way of thinking. Before starting here I went back through FlippedNormals\u2019 Intro to Mari to get my bearings again \u2014 not because the tool is unfamiliar, but because realistic character work asks more of it than the projection and stencil passes I use it for occasionally. Getting reacquainted with the layer stack and the projection workflow first saved a great deal of undoing later.',
  ]},
  { t:'prose', body:[
    'With the lighting established, this stage focuses on how the maps I built in Mari begin to shape the realism of the character. Albedo and subsurface, roughness, displacement, and micro-detail through normals — each map plays its own part in how light interacts with skin.',
    'From a lit model to believable skin, rendered in Arnold: the transition happens here. Depth, texture and subtle imperfection revealed through natural light response.',
    'For me, look development is less about adding detail, and more about those details responding to your light — still pushing toward realism, and toward storytelling.',
  ]},
  { t:'prose', body:[
    'The Mari graph behind the head is where most of that work actually lives. Base colour is built up in stages \u2014 colour textures, then make-up, then the white paint pass \u2014 with separate branches carrying roughness, normals, the metallic gold, subsurface amount and a set of procedurals feeding the imperfections. Keeping each of those readable and grouped is what made the ACES rebuild survivable later.',
  ]},
  { t:'frames', cols:1, items:[ AF('udim_layout','UVs','UDIM Layout \u2014 Three Tiles','1001 \u00b7 1002 \u00b7 1003') ]},
  { t:'frames', cols:1, items:[ AF('mari_nodegraph','Node Graph','Mari \u2014 Head Shading Network','base colour \u00b7 roughness \u00b7 normal \u00b7 SSS \u00b7 procedurals') ]},
  { t:'autovideo', label:'Texture & Look Dev', youtubeId:'HF8l3l7bcqY' },
  { t:'frames', cols:3, items:[
    AF('lookdev_01','Render','Front — Hero','Arnold'),
    AF('lookdev_02','Render','Three-Quarter','Arnold'),
    AF('lookdev_03','Render','Eyes — Macro','gold detail'),
    AF('lookdev_04','Render','Lips — Macro','SSS response'),
    AF('lookdev_05','Render','Half Profile','edge light'),
    AF('lookdev_06','Render','Cheek Detail','gold leaf work'),
    AF('lookdev_07','Render','Bust — Wide','gobo shadow'),
    AF('lookdev_08','Render','Front — Lit','falloff study'),
    AF('lookdev_09','Render','Front — Alt','tonal test'),
  ]},

  { t:'head', num:'04', title:'The detail that sent me', accent:'back to the start' },
  { t:'prose', body:[
    'Just before jumping into XGen for grooming, I came across a video about colour management and realised something that completely shifted my workflow: I had been working in an sRGB pipeline instead of ACES.',
    'At first I tried the quick fix — simply switching the colour management settings in Mari. Predictably, that created a strange hybrid where my textures were sitting somewhere between sRGB and ACES. It looked fine at a glance, but it was not technically correct.',
    'So I went back and did it properly. I re-imported the texture maps into fresh paint nodes and rebuilt the setup under ACES. That is when the real difference became obvious: a much wider colour range, and reds in the skin that were far more pronounced.',
    'That discovery pushed me to revisit the entire look development process. I began exploring how far I could push melanin levels in the skin while keeping the result physically believable — a full 360 revisit of the textures, adjusting the makeup, refining the subsurface scattering attributes, and pushing toward a richer representation of darker skin tones.',
    'On the shading side I moved to an aiLayerShader setup in Arnold, separating skin, eyeshadow, lipstick, eyeliner and gold paint so each layer could respond to light with its own physical properties.',
    'It is interesting how a single pipeline detail can send you back through multiple stages of a project. But that is part of the process — constantly learning, refining, and pushing the work further. Every step forward reveals something new.',
  ]},
  { t:'autovideo', label:'Colour Management — sRGB to ACES', youtubeId:'dzT0cf48VUk' },

  { t:'head', num:'05', title:'Rebuilt in ACES —', accent:'grooming, part one' },
  { t:'prose', body:[
    'After a few weeks of relearning and rebuilding my workflow around ACES, I finally reached a result with Arya\u2019s skin that I am genuinely satisfied with.',
    'That shift pushed me to rethink everything. I stripped back most of the makeup — keeping only the eyeliner — and replaced the gold elements with a simpler white tribal pattern. It is a different direction from where I started, but it felt necessary. Once the lighting and colour pipeline became physically grounded, I had to go back to the drawing board and rebuild the majority of the maps from scratch.',
    'This version also marks part one of the grooming: peach fuzz, eyelashes, nose hair and eyebrows, all built in XGen.',
  ]},
  { t:'frames', cols:3, items:[
    AF('aces_01','ACES','Front — Daylight','rebuilt maps'),
    AF('aces_02','ACES','Front — Turn','skin response'),
    AF('aces_03','ACES','Three-Quarter','white pattern'),
    AF('aces_04','ACES','Macro — Eyes','peach fuzz / lashes'),
    AF('aces_05','ACES','Soft Three-Quarter','natural light'),
  ]},

  { t:'head', num:'06', title:'The makeup version,', accent:'revisited' },
  { t:'prose', body:[
    { parts:[
      'A friend and colleague in the 3D industry, ',
      { text:'Daniel Ngatia', href:'https://www.linkedin.com/in/danielngatia/' },
      ', convinced me to share these renders of Arya with the makeup on — so here they are.',
    ]},
    'This version brings back some of the earlier artistic direction, and it has been interesting to see how it compares with the more recent skin-focused look dev. Different approach, same character — just viewed through a more refined pipeline.',
    'No head hair yet, but it already offers a solid comparison point between where this project started and where it is heading.',
  ]},
  { t:'frames', cols:3, items:[
    AF('makeup_01','Render','Front — Red Crown','ACES pipeline'),
    AF('makeup_02','Render','Front — Turn','layered shader'),
    AF('makeup_03','Render','Three-Quarter','daylight'),
    AF('makeup_04','Render','Macro — Eyes','pattern detail'),
    AF('makeup_05','Render','Macro — Cheek','dot work'),
    AF('makeup_06','Render','Portrait','full look'),
  ]},

  { t:'head', num:'07', title:'Look Development', accent:'Two' },
  { t:'prose', body:[
    'Underneath everything on the face sits a single aiLayerShader carrying six layers \u2014 skin, make-up, eyeshadow, eyeliner, face paint and lipstick. Each one is its own shader feeding its own slot, so any of them can be soloed, dialled back or switched off without touching the others. That separation is what made the makeup revisions survivable: changing the eyeliner never meant re-authoring skin, and the gold face paint could be pushed or pulled long after the base was locked.',
    'The eyes are built on the technique from Tom Newbury\u2019s Creating a Realistic Eye 3.0, which I bought from Gumroad. Sclera, iris, pupil and the meniscus each get their own shader, layered and mixed rather than solved in one material \u2014 the same logic as the skin, applied at a much smaller scale.',
    'The skin displacement setup also comes from Tom Newbury, from his course on the TextureXYZ YouTube page. I did not take it across untouched. Melanated skin responds differently to several of those settings, and the values that read correctly on lighter reference went flat or plastic here \u2014 so the displacement height, the subsurface radii and the specular response were all recalibrated against test renders until the surface behaved the way it should.',
  ]},
  { t:'callout', title:'Credit where it is due',
    body:'The eye technique is from Tom Newbury\u2019s Creating a Realistic Eye 3.0 (Gumroad), and the displacement approach from his TextureXYZ course. The adjustments for melanated skin are mine, arrived at through test rendering.' },
  { t:'frames', cols:1, items:[
    AF('hypershade_skin','Hypershade','Skin \u2014 aiLayerShader','six layers: skin \u00b7 make-up \u00b7 eyeshadow \u00b7 eyeliner \u00b7 face paint \u00b7 lipstick'),
    AF('hypershade_eye','Hypershade','Eye \u2014 Layered Shader Network','sclera \u00b7 iris \u00b7 pupil \u00b7 meniscus'),
  ]},

  { t:'head', num:'08', title:'Meet', accent:'Arya' },
  { t:'prose', body:[
    'Final renders from a character odyssey exploring realism, texture, grooming and presence.',
    'What began as a study in texturing evolved into a full workflow transformation — spanning Mari, ACES colour management, and advanced grooming using XGen and Maya Groomer\u2019s tools alongside a rebuilt look development pipeline.',
  ]},
  { t:'callout', title:'The gap this project sat in',
    body:'One challenge stood out: the limited reference and learning resources for melanated African skin, especially in a field built around 3D hyperrealism. This project became a space for experimentation, iteration and deeper understanding — and a reason to keep going.' },
  { t:'frames', cols:3, items:[
    AF('final_01','Final','Hero Portrait','braided groom'),
    AF('final_02','Final','Three-Quarter','daylight'),
    AF('final_03','Final','Front — Direct','full groom'),
    AF('final_04','Final','Turn — Soft','environment light'),
    AF('final_05','Final','Profile','braid detail'),
    AF('final_06','Final','Macro — Eyes','lashes / brows'),
    AF('final_07','Final','Macro — Cheek','pattern + skin'),
    AF('final_08','Final','Macro — Lips','micro detail'),
    AF('final_09','Final','Half Frame','depth of field'),
    AF('final_10','Final','Red Crown — Front','alt look'),
    AF('final_11','Final','Portrait — Wide','final grade'),
  ]},
  { t:'prose', body:[
    'Below, the XGen collection behind the groom — head, eyebrows, nose hair, peach fuzz, lashes and braids, built as separate descriptions so each could be controlled independently.',
  ]},
  { t:'frames', cols:1, items:[ AF('groom_viewport','XGen','Grooming Setup','collection + guides') ]},
  { t:'chips', items:['Autodesk Maya','ZBrush','ZWrap','Foundry Mari','XGen','Maya Groomer\u2019s Tools','Arnold','Photoshop'] },
  { t:'autovideo', label:'Arya — Final Breakdown', youtubeId:'Ul4Q-TlgnW8' },

  { t:'head', num:'09', title:'', accent:'Retrospective' },
  { t:'pullquote', text:'Look development is less about adding detail, and more about those details responding to your light.' },
  { t:'prose', body:[
    'Arya started as a texturing study and turned into a rebuild of how I work — colour management, lighting intent, layered shading, and grooming, each one forcing a return to something I thought was already finished.',
    'Built with production-ready workflows, and still in progress. The head hair is next.',
  ]},
];

export const CHARACTER_BLOGS = [
  cBlog({
    slug:'arya', name:'Arya', epithet:'A Character Texturing Odyssey',
    category:'Hyperrealistic Character', year:'2026',
    tagline:'A texturing study that became a full pipeline rebuild — ZBrush and ZWrap to Mari, sRGB to ACES, and a search for how melanated skin should truly respond to light.',
    specs:{ software:['Maya','ZBrush','ZWrap','Mari','XGen','Arnold','Photoshop'] },
    thumb:'/arya/cover.jpg',
    hero:'/arya/final_01.jpg',
    heroBg:'/arya/hero_bg.jpg',
    outro:'/arya/hero_bg.jpg',
    blocks: ARYA_BLOCKS,
  }),
  cBlog({
    slug:'odungi-the-fairytale', name:'Odungi', epithet:'The Fairytale',
    category:'Hyperrealistic Character', year:'2026',
    tagline:'A cinematic study in rendering deep, melanated skin honestly — subsurface, specular, and a colour pipeline built for skin most pipelines were never tuned for.',
    specs:{ software:['ZBrush','Maya','Mari','Unreal 5'] },
    hero: img('1QHUvKzFXAqHdwlHEoQDhsHJjD2xDNQVu','w1600'),
    img:{
      ref:[ F(img('1uhJQGJWV8QRu8bcvYs3qdiNde-w_c0Oy'),'Ref','Face Study','cinematic close-up') ],
      lookdev:[
        F(img('1QHUvKzFXAqHdwlHEoQDhsHJjD2xDNQVu'),'Render','Hero Render','UE5'),
        F(img('1_gF34MBLHG1D385AX-6-T6zDGakkB0Mv'),'Render','Alternate Lighting','UE5'),
      ],
    },
  }),
  cBlog({
    slug:'lolungu-the-turkana', name:'Lolungu', epithet:'The Turkana',
    category:'Hyperrealistic Character', year:'2025',
    tagline:'A Turkana portrait — weathered skin, beadwork and the optical truth of melanin under hard northern light.',
    specs:{ software:['ZBrush','Maya','Mari','Arnold'] },
    hero: img('1Cxe3diwxEJQeTehn-Kg10Pw8o-ILHE8e','w1600'),
    img:{
      ref:[
        F(img('13kroEdCEDYOSYQKLpqZU2JbFpUDJoPtG'),'Ref','Quarter Shape','blockout'),
        F(img('1YT3Ylaa13yK3UZ-2ivtSNSLxOnNmQ7VZ'),'Ref','Quarter — Beads','adornment'),
      ],
      sculpt:[
        F(img('1kkHNOLC_m-vXd2m6QWeVnyiwADqhpecl'),'Sculpt','ZBrush Clay','primary forms'),
        F(img('1_wnl4z6a4lBO8XGqlKh86TU_nHKgdVwd'),'Sculpt','ZBrush Clay','secondary'),
        F(img('1Pad3JgiaQpoKCGmU2oGruquu1PXb2lQ1'),'Sculpt','ZBrush Clay','detail'),
      ],
      uv:[
        F(img('1rz93YvxtVcTsno8USjxGU9l6-XYdlc6Q'),'Wire','Lowpoly — Game','retopo'),
        F(img('14R85bqAcwNeBy53ux4OtxL6zIPXGGkfI'),'Wire','Lowpoly — Film','retopo'),
      ],
      tex:[
        F(img('1mvrj2XAf-qFnZHz4N36Gm9D5JfVwJ56S'),'Texture','Body + Paint','Mari'),
        F(img('1AsmBR9zHXiChdK80k3bL-jCfzUL9wxMW'),'Texture','Shoulder Detail','2K'),
      ],
      shading:[
        F(img('1g0mYexlAlcoYgiAH7NQ_-xOZv029wDmz'),'Lookdev','SSS Calibration','skin response'),
        F(img('1cZPB92mP4mbhztpxqwhZPleyDXyqznOf'),'Lookdev','Eye Close-up','detail'),
      ],
      lookdev:[
        F(img('1Cxe3diwxEJQeTehn-Kg10Pw8o-ILHE8e'),'Render','Front Camera','final'),
        F(img('11rKJl1g-jWJdfI9ciMSOF3Lqrx3ISsU4'),'Render','Half Shot','final'),
      ],
    },
  }),
  cBlog({
    slug:'afrezia-the-emerald', name:'Afrezia', epithet:'The Emerald',
    category:'Hyperrealistic Character', year:'2025',
    tagline:'A jewel-toned hyperreal portrait — emerald adornment against deep skin.',
    specs:{ software:['Maya','ZBrush','Mari'] },
    hero: img('1A3CdSQkLq1gEYtTpIjz0OvamB8oavEBp','w1600'),
    img:{
      lookdev:[ F(img('1A3CdSQkLq1gEYtTpIjz0OvamB8oavEBp'),'Render','Hero Render','final') ],
    },
  }),
  cBlog({
    slug:'omolara-the-omo', name:'Omolara', epithet:'The Omo',
    category:'Hyperrealistic Character', year:'2024',
    tagline:'An Omo Valley portrait — ceremonial paint, ornament and skin under natural light.',
    specs:{ software:['ZBrush','Maya','Mari'] },
    hero: img('1vZme7yIW7VbUOlTw5CtYTV00zFObasrs','w1600'),
    img:{
      lookdev:[ F(img('1vZme7yIW7VbUOlTw5CtYTV00zFObasrs'),'Render','Hero Render','final') ],
    },
  }),
  cBlog({
    slug:'ndirangu-the-farmer', name:'Ndirangu', epithet:'The Farmer',
    category:'Stylized Character', year:'2026',
    tagline:'A stylized character study — exaggerated form, hand-crafted appeal, a farmer\u2019s story.',
    specs:{ software:['ZBrush','Maya','Substance'] },
    hero: null,
    img:{},
  }),
  cBlog({
    slug:'moombi-the-angel', name:'Moombi', epithet:'The Angel',
    category:'Hyperrealistic Character', year:'2025',
    tagline:'A winged hyperreal figure — feather grooming, luminous skin, a celestial study.',
    specs:{ software:['ZBrush','Substance','Mari','XGen'] },
    hero: img('1Ro5J75-KlaowzZf1-97LLJDZCgiAj61O','w1600'),
    img:{
      lookdev:[ F(img('1Ro5J75-KlaowzZf1-97LLJDZCgiAj61O'),'Render','Hero Render','final') ],
    },
  }),
  cBlog({
    slug:'otugi-the-dragon', name:'Otugi', epithet:'The Dragon',
    category:'Creature', year:'2026',
    tagline:'A creature build — scale displacement, anatomy and a reptilian shading study.',
    specs:{ software:['ZBrush','Maya','Houdini'] },
    hero: null,
    img:{},
  }),
];

export const getCharacterBlog = (slug) => CHARACTER_BLOGS.find(c => c.slug === slug);
