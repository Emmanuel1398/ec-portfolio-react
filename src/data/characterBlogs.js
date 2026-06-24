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
    hero: meta.hero || null,
    specs: meta.specs || {},
    blocks: buildBlocks(meta.img),
  };
}

export const CHARACTER_BLOGS = [
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
    slug:'arya', name:'Arya', epithet:'A Character Odyssey',
    category:'Hyperrealistic Character', year:'2026',
    tagline:'A full character odyssey — from lighting and surfacing through grooming to a finished lookdev.',
    specs:{ software:['Maya','ZBrush','Mari','XGen'] },
    hero: img('154hEbtArTuXpCv7pLYkf-q1qeDqmo3sJ','w1600'),
    img:{
      xgen:[
        F(img('17zBw0X5SlEzmNGbKXq19y4CzTCycNxAB'),'XGen','Viewport — XGen Hair','grooming'),
        F(img('1t3me5UyYeYBq25WS5wloPSBvE56VHwek'),'XGen','Hair Guides','guide curves'),
      ],
      lookdev:[
        F(img('1WEgvxO2_2nw_gU3AP1gK2iuRWgf71yqQ'),'Render','Final','lookdev'),
        F(img('1YZei8tcq_x7RZCEdaCO-dhaNqt1ot36M'),'Render','Final','lookdev'),
        F(img('1CCacvM-AD6HSVPzIY_PO91S-qsrQVuZm'),'Render','Final','lookdev'),
      ],
    },
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
