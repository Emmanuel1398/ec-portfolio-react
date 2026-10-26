/* ─────────────────────────────────────────────────────────────
   CHARACTER BLOGS · data-driven "Odungi breakdown" model
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
    { t:'callout', title:'Why this matters · melanated skin' },

    { t:'head', num:'05', title:'Shading ·', accent:'Hypershade' },
    { t:'prose' },
    { t:'frames', cols:2, items: pad(g('shading'), 2, 'Lookdev', 'Shading Study', 'skin response') },
    { t:'nodegraph', label:'aiStandardSurface Network', spec:'Hypershade · full graph capture' },
    { t:'valueTable', caption:'Skin Shader, aiStandardSurface', chip:'values coming soon', rows: SHADER_ROWS },

    { t:'head', num:'06', title:'Grooming ·', accent:'XGen' },
    { t:'prose' },
    { t:'chips', items: XGEN_CHIPS },
    { t:'frames', cols:2, items: pad(g('xgen'), 2, 'XGen', 'Grooming Pass', 'guides / density') },
    { t:'video', label:'Grooming Process · XGen', spec:'process video', youtubeId:null },

    { t:'head', num:'07', title:'Lighting &', accent:'Colour Management' },
    { t:'prose' },
    { t:'lightRig', caption:'Light Rig, Scene Setup', chip:'values coming soon', rows: LIGHT_ROWS },
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
    intro: meta.intro || null,
    status: meta.status || null,
    statusAlways: !!meta.statusAlways,
    thumb: meta.thumb || meta.hero || null,
    hero: meta.hero || null,
    heroBg: meta.heroBg || null,
    outro: meta.outro || null,
    outroYoutubeId: meta.outroYoutubeId || null,
    outroPending: !!meta.outroPending,
    specs: meta.specs || {},
    keywords: meta.keywords || [],
    blocks: meta.blocks || buildBlocks(meta.img),
    /* optional SEO fields · real values only (see docs/aeo/README.md) */
    summary: meta.summary || '', faqs: meta.faqs || [],
    published: meta.published || null, updated: meta.updated || null,
  };
}


/* ── ODUNGI — bespoke case study, built as the pipeline progresses ── */
const O = (n) => `/odungi/${n}.jpg`;
const OF = (n, tag, label, spec) => F(O(n), tag, label, spec);

const ODUNGI_BLOCKS = [
  { t:'head', num:'01', title:'Reference &', accent:'Intent' },
  { t:'prose', body:[
    'If Hollywood can build entire cinematic universes around folklore and mythology, Africa can too. And honestly, our stories are just as powerful; maybe even more unsettling. This is only the beginning.',
  ]},
  { t:'prose', body:[
    { parts:[
      'I tend to still use a background of african cultures as a background in my characters. Some of my references were the same as those i used to bring to life ',
      { text:'Lolungu', href:'/characters/lolungu-the-turkana' },
      '.',
    ]},
  ]},
  { t:'frames', cols:1, items:[ OF('reference_board','Reference','Reference Board','body \u00b7 melanin skin \u00b7 horns \u00b7 scarification \u00b7 teeth') ]},

  { t:'head', num:'02', title:'Blockout &', accent:'Sculpt' },
  { t:'video', label:'Sculpting Timelapse', spec:'ZBrush \u00b7 process video', youtubeId:'sEM1QkKo_O8', poster:O('poster_timelapse') },
  { t:'frames', layout:'row', items:[
    OF('sculpt_01','Sculpt','Front \u00b7 Horns and Ears','ZBrush'),
    OF('sculpt_02','Sculpt','Three Quarter \u00b7 Ornaments','ZBrush'),
    OF('sculpt_03','Sculpt','Face \u00b7 Scarification Detail','ZBrush'),
    OF('sculpt_04','Sculpt','Bust \u00b7 Neck and Shoulders','ZBrush'),
  ]},
  { t:'videoRow', items:[
    { youtubeId:'--HBYdq_fUw', label:'First Sculpt Turntable', portrait:true, auto:false, poster:O('poster_turntable_first') },
    { youtubeId:'WwTesoY2ADA', label:'Sculpting Occlusion Pass', portrait:true, auto:false },
    { youtubeId:'cscfhP0BWj0', label:'ZBrush SubDiv Pass \u00b7 Head', portrait:true, auto:false },
    { youtubeId:'HeL-sR7W6Sk', label:'ZBrush SubDiv Pass \u00b7 Bust', portrait:true, auto:false },
    { youtubeId:'yjcjgmMX1J0', label:'Final Turntable \u00b7 Scarification + Fibermesh Groom', portrait:true, auto:false, poster:O('poster_turntable_final') },
  ]},

  { t:'head', num:'03', title:'Retopo &', accent:'UVs' },
  { t:'prose', body:[
    'I normally use my own custom made base mesh from Sankofa Asili Productions. That way i already have a base to start working on, especially because i wanted to have some african looking characters that can incorporate ornaments well.',
    'Odungi\u2019s body is laid out across ten UDIM tiles.',
  ]},
  { t:'frames', layout:'row', items:[
    OF('udim_1001_1004','UVs','UDIM Layout \u00b7 Head and Face','tiles 1001 to 1004'),
    OF('udim_1005_1008','UVs','UDIM Layout \u00b7 Torso, Arms and Hands','tiles 1005 to 1008'),
    OF('udim_1007_1010','UVs','UDIM Layout \u00b7 Limbs and Feet','tiles 1007 to 1010'),
  ]},

  { t:'head', num:'04', title:'Texturing &', accent:'Map Authoring' },
  { t:'prose', body:[
    { parts:[
      'After developing the primary sculpt and surface detailing in ZBrush, I moved into look development and texture creation inside Mari, using the same ACES workflow pipeline I previously used on my 3D character project, ',
      { text:'Arya', href:'/characters/arya' },
      '. The goal was to maintain physically accurate values while preserving rich melanated skin tones and realistic material breakup under cinematic lighting.',
    ]},
    'For the character body, I created diffuse and albedo, specular, roughness, normal, broad displacement and fine displacement. For the ram horns and mouth assets, I created diffuse maps, displacement maps, normal maps and specular maps.',
    'I intentionally chose not to create dedicated roughness maps for the horns and mouth, because I could achieve the exact response I wanted using controlled shader values together with coat layering inside the Arnold aiStandardSurface shader.',
    'The node graph carries a few branches I built and then chose not to use. Odungi is purely organic, so no metallic response was needed. The nails were baked onto the skin maps rather than carried separately. And for the horns, the specular map did the job just as well on its own, so the roughness branch was left as is.',
    'I also skipped creating a separate SSS map. The default SSS radius values already produced a strong result for the melanated skin tones, and preserved the balance between realism and stylization without overcomplicating the shader network.',
    'One of the biggest goals with this project is learning how to push African character look development further into high end cinematic territory, while still retaining grounded cultural texture and identity.',
  ]},
  { t:'frames', cols:1, items:[ OF('mari_nodegraph','Node Graph','Mari \u00b7 Shading Network','skin \u00b7 horns \u00b7 nails \u00b7 per channel groups') ]},
  { t:'frames', cols:1, items:[ OF('mari_viewport','Mari','Mari Viewport','ACES 1.0 SDR') ]},
  { t:'frames', cols:3, items:[
    OF('maps_body','Maps','Body \u00b7 Six Passes','diffuse \u00b7 roughness \u00b7 specular \u00b7 normal \u00b7 broad and fine displacement'),
    OF('maps_horns','Maps','Ram Horns \u00b7 Four Passes','diffuse \u00b7 specular \u00b7 normal \u00b7 displacement'),
    OF('maps_teeth','Maps','Mouth and Teeth \u00b7 Four Passes','diffuse \u00b7 specular \u00b7 normal \u00b7 displacement'),
  ]},

  { t:'head', num:'05', title:'', accent:'Lighting' },
  { t:'prose', body:[
    'The rig is a three point lighting system, extended with an HDRI skydome and a spotlight. A gobo of leaves sits on the spotlight, so the key breaks across the face the way light does through cover rather than arriving clean. A studio backdrop closes the set behind him.',
  ]},
  { t:'frames', layout:'row', items:[
    OF('maya_viewport','Setup','Maya Viewport','sculpt in scene'),
    OF('light_setup','Setup','Light Rig Placement','three point \u00b7 HDRI \u00b7 spotlight \u00b7 backdrop'),
    OF('light_editor','Setup','Light Editor','intensity \u00b7 exposure \u00b7 samples'),
  ]},

  { t:'head', num:'06', title:'Shading &', accent:'Look Development' },
  { t:'prose', body:[
    'The Maya side of the shader is deliberately lean. One aiStandardSurface carries the skin, fed by the Mari passes, with the broad and fine displacement combined before they reach the displacement shader rather than being stacked blindly on top of one another.',
    'These renders are the skin test. They are where the texture work, the displacement and the light rig finally have to agree with each other, and where melanated skin either holds up under close range or falls apart.',
  ]},
  { t:'frames', cols:1, items:[ OF('hypershade','Hypershade','Maya \u00b7 aiStandardSurface Network','diffuse \u00b7 specular \u00b7 roughness \u00b7 normal \u00b7 broad and fine displacement') ]},
  { t:'frames', layout:'row', items:[
    OF('lookdev_01','Look Dev','Three Quarter \u00b7 Horns and Ear','skin test'),
    OF('lookdev_02','Look Dev','Front \u00b7 Bust','skin test'),
    OF('lookdev_03','Look Dev','Close Up \u00b7 Eyes and Pore Detail','skin test'),
    OF('lookdev_04','Look Dev','Three Quarter \u00b7 Expression','teeth, tusks and beadwork'),
  ]},

  { t:'head', num:'07', title:'', accent:'Rigging' },
  { t:'prose', body:[
    'Odungi was rigged using a MetaHuman method, which carries the facial control set and keeps the character compatible with mocap further down the line.',
  ]},
  { t:'callout', title:'Rigging by Darius Gitonga', body:{ parts:[
    'Odungi was rigged by Darius Gitonga, a friend and fellow member of Sankofa Asili Productions. The full MetaHuman rig, facial control set included, is his work. You can see more of what he does on ',
    { text:'YouTube', href:'https://www.youtube.com/@Darius.K_Gitonga' },
    ' and ',
    { text:'LinkedIn', href:'https://www.linkedin.com/in/darius-gitonga/' },
    '.',
  ]}},  { t:'video', label:'Rigging Breakdown', spec:'MetaHuman rig', youtubeId:'qwlULYporE8' },

  { t:'head', num:'08', title:'Grooming \u00b7', accent:'XGen' },
  { t:'prose' },
  { t:'chips', items: XGEN_CHIPS },
  { t:'frames', cols:3, items: pad([], 3, 'XGen', 'Grooming Pass', 'guides / density') },
  { t:'video', label:'Grooming Process \u00b7 XGen', spec:'process video', youtubeId:null },

  { t:'head', num:'09', title:'', accent:'Clothes' },
  { t:'prose' },
  { t:'frames', cols:3, items: pad([], 3, 'Cloth', 'Garment Pass', 'Marvelous Designer / nCloth') },
  { t:'video', label:'Cloth Simulation', spec:'process video', youtubeId:null },

  { t:'head', num:'10', title:'', accent:'Animation' },
  { t:'prose' },
  { t:'video', label:'Animation Test', spec:'process video', youtubeId:null },
];


/* ── LOLUNGU · bespoke case study, rebuilt from scratch (v85) ── */
const L = (n) => `/lolungu/${n}.jpg`;
const LF = (n, tag, label, spec) => F(L(n), tag, label, spec);

const LOLUNGU_BLOCKS = [
  { t:'head', num:'01', title:'Reference &', accent:'Intent' },
  { t:'prose', body:[
    'His references were drawn from images of older men and, truthfully, from other character artists’ sculpts of older people. Though not the best anatomical reference, they gave me an understanding of what other artists look out for.',
    'His main reference was centred on Turkana culture: their beadwork, their clothes, ornaments and hairstyles. Gathering beard reference was also a first for me, as I was working out how to approach it in XGen.',
    'The reference board was put together in PureRef.',
  ]},
  { t:'frames', cols:1, items:[ LF('reference_board','Reference','Reference Board · PureRef','body · main · ornaments · beard') ]},

  { t:'head', num:'02', title:'Blockout &', accent:'Sculpt' },
  { t:'prose', body:[
    'Sculpting Lolungu made me realise I needed to break the work down into forms: primary, secondary and tertiary. While other artists would layer these individually, finishing all of the body’s primary forms before moving on, I tend to navigate by individual parts. I would, for example, finish the face, both its primary and secondary forms, before moving to another part.',
    'This approach helped me understand and cross reference different anatomy books, and apply as much of that information as I could understand at the time. All of the sculpting was done in ZBrush.',
  ]},
  { t:'videoRow', items:[
    { youtubeId:'kiKkK2McD6o', label:'Sculpting Timelapse · Part 1', auto:false },
    { youtubeId:'ep1hiOgr8sQ', label:'Sculpting Timelapse · Part 2', auto:false },
    { youtubeId:'zpJCodXZS0o', label:'Sculpting Timelapse · Part 3', auto:false },
    { youtubeId:'vv2CtnDUnAo', label:'Sculpting Timelapse · Part 4', auto:false },
    { youtubeId:'eRDK1Xss3XY', label:'Sculpting Timelapse · Part 5', auto:false },
  ]},
  { t:'frames', cols:3, items:[
    LF('clay_01','Clay','Front · Head','ZBrush final clay'),
    LF('clay_02','Clay','Three Quarter · Head','ZBrush final clay'),
    LF('clay_03','Clay','Bust · Beaded Collar','ZBrush final clay'),
  ]},
  { t:'videoRow', items:[
    { youtubeId:'1T2KXKscz34', label:'Final Sculpt Turntable · Head', auto:false },
    { youtubeId:'cRfRNliO0HI', label:'Skin Detail Sculpt Turntable', auto:false },
  ]},

  { t:'head', num:'03', title:'Retopo &', accent:'UVs' },
  { t:'prose', body:[
    'A particularly hard part I encountered when sculpting was the ear holes. In many African cultures, holes are made in the ears, the lips and sometimes the nose, to hold ornaments that represent beauty and initiation practices.',
    'During retopology these became a real problem to figure out, and so did laying out the UVs around them.',
  ]},
  { t:'frames', layout:'row', items:[
    F(img('1rz93YvxtVcTsno8USjxGU9l6-XYdlc6Q'),'Wire','Lowpoly · Game','retopo'),
    F(img('14R85bqAcwNeBy53ux4OtxL6zIPXGGkfI'),'Wire','Lowpoly · Film','retopo'),
    LF('uv_layout','UVs','UV Layout · Checker','body shells'),
  ]},

  { t:'head', num:'04', title:'Texturing &', accent:'Map Authoring' },
  { t:'prose', body:[
    'My main software for texturing at the time was Substance 3D Painter. The timelapse below is a simple explainer of the texturing process.',
    'The maps created during texturing were base colour, roughness, specular level, ambient occlusion, displacement and normal, shown here in the viewport and across the UV layout, followed by the final texturing renders.',
  ]},
  { t:'video', label:'Texturing Timelapse', spec:'Substance 3D Painter · process video', youtubeId:'HYDXaCEuoIg' },
  { t:'maps', items:[
    LF('map_basecolor','Map','Base Colour','Substance 3D Painter'),
    LF('map_roughness','Map','Roughness','Substance 3D Painter'),
    LF('map_specular','Map','Specular Level','Substance 3D Painter'),
    LF('map_ao','Map','Ambient Occlusion','Substance 3D Painter'),
    LF('map_displacement','Map','Displacement','Substance 3D Painter'),
    LF('map_normal','Map','Normal · Height · Mesh','Substance 3D Painter'),
  ]},
  { t:'frames', cols:2, items:[
    LF('texture_01','Render','Three Quarter · Face Paint','final texturing render'),
    LF('texture_02','Render','Close Up · Eye and Skin','final texturing render'),
  ]},

  { t:'head', num:'05', title:'Shading ·', accent:'Hypershade' },
  { t:'prose', body:[
    'In Maya I used an aiLayerShader to separate the skin and the paint, so I could control each layer individually, especially the displacement.',
    'The first layer carries the skin shader and the second carries the paint shader, each with its own maps, and a mask decides where the paint sits on top of the skin.',
  ]},
  { t:'frames', cols:1, items:[ LF('hypershade','Hypershade','Maya · aiLayerShader Network','layer 1 skin · layer 2 paint · mask') ]},

  { t:'head', num:'06', title:'', accent:'Lighting' },
  { t:'prose', body:[
    'The scene is lit with a three point setup, a key light and two backlights, with an HDRI skydome added on top.',
    'The four renders below show how the character reads under different lighting setups.',
  ]},
  { t:'frames', cols:1, items:[ LF('light_setup','Setup','Three Point Setup + HDRI','key · backlight 1 · backlight 2 · aiSkyDomeLight') ]},
  { t:'chips', items:['Key Light','Backlight 1','Backlight 2','HDRI Skydome'] },
  { t:'frames', cols:2, items:[
    LF('light_01','Lighting','Three Quarter · Head','cool setup'),
    LF('light_02','Lighting','Three Quarter · Head','warm setup'),
    LF('light_03','Lighting','Bust · Shuka','cool setup'),
    LF('light_04','Lighting','Bust · Shuka','warm setup'),
  ]},

  { t:'head', num:'07', title:'Look', accent:'Development' },
  { t:'prose', body:[
    'Lolungu was rendered in Arnold using an sRGB colour management workflow. I was not aware of the ACES workflow back then, and it is something I only moved to in later projects.',
  ]},
  { t:'callout', title:'Colour management · then and now', body:{ parts:[
    'This build sits in sRGB. The move to ACES came later, and you can follow that shift in ',
    { text:'Arya', href:'/characters/arya' },
    '.',
  ]}},
  { t:'frames', cols:2, items:[
    LF('lookdev_01','Look Dev','Three Quarter · Head','Arnold · sRGB'),
    LF('lookdev_02','Look Dev','Bust · Shuka','Arnold · sRGB'),
    LF('lookdev_03','Look Dev','Full Figure · Spear and Shield','Arnold · sRGB'),
    LF('lookdev_04','Look Dev','Macro · Eye and Beard','Arnold · sRGB'),
  ]},

  { t:'head', num:'08', title:'Grooming ·', accent:'XGen' },
  { t:'prose', body:[
    'This was my first time actually using XGen. I used the XGen Interactive Grooming tools in particular, as I was not aware of the traditional XGen workflow at the time.',
    'XGen Interactive was much easier and more straightforward to understand at that stage. It allowed me to be more artistic, without the complexity of learning too many technicalities in scripting and expressions.',
  ]},
  { t:'chips', items:['Eyebrows','Upper Lashes','Lower Lashes','Beard Stubble','Peach Fuzz','Braid Root Base','Braids'] },
  { t:'frames', cols:2, items:[
    LF('xgen_descriptions','XGen','Interactive Groom · Descriptions','eyebrows · lashes · beard · peach fuzz · braids'),
    LF('xgen_guides','XGen','Interactive Groom · Viewport','braids · beard · ornaments'),
  ]},

  { t:'head', num:'09', title:'', accent:'Rigging' },
  { t:'callout', title:'Rigging and animation by Darius Gitonga', body:{ parts:[
    'Lolungu was rigged and animated by ',
    { text:'Darius Gitonga', href:'https://www.youtube.com/@darius.k_gitonga' },
    '.',
  ]}},
  { t:'video', label:'Rigging Breakdown', spec:'Lolungu rig', youtubeId:'0AyGoHsaE7s' },

  { t:'head', num:'10', title:'', accent:'Animation' },
  { t:'video', label:'Animation', spec:'animated by Darius Gitonga', youtubeId:'drlOQfbbk8g' },

  { t:'head', num:'11', title:'', accent:'Props' },
  { t:'prose', body:[
    'All the props carry a cultural background, with patterns common to the local culture: masks, animals and abstract drawings.',
    'Akalas are made from leather, rubber and stitching. They are a common traditional wear among many cultures in Kenya.',
  ]},
  { t:'frames', cols:2, items:[
    LF('prop_akala_01','Prop','Akala · Shoes','leather · rubber · stitching'),
    LF('prop_akala_02','Prop','Akala · Side View','leather · rubber · stitching'),
  ]},
  { t:'prose', body:[
    'The clothes are mainly textured with local Turkana and Maasai patterns.',
  ]},
  { t:'frames', cols:2, items:[
    LF('prop_clothes_01','Prop','Clothes · Front','Turkana and Maasai patterns'),
    LF('prop_clothes_02','Prop','Clothes · Back','Turkana and Maasai patterns'),
  ]},
  { t:'prose', body:[
    'Most of the ear ornaments were made from copper and metal alloys, with patterns sculpted onto the pieces to signify different things. The mouth ornament is a shell with sisal rope attachments.',
  ]},
  { t:'frames', cols:2, items:[
    LF('prop_face_ornaments_01','Prop','Face Ornaments · Front','copper · metal alloys · shell and sisal'),
    LF('prop_face_ornaments_02','Prop','Face Ornaments · Side','copper · metal alloys · shell and sisal'),
  ]},
  { t:'prose', body:[
    'The shield is made from wood and covered with cow hide, with African patterns added all over it.',
  ]},
  { t:'frames', cols:2, items:[
    LF('prop_shield_front','Prop','Shield · Front','cow hide'),
    LF('prop_shield_back','Prop','Shield · Back','carved wood'),
  ]},
  { t:'prose', body:[
    'One set of arm ornaments is made from coloured beads and strings, while the other is made from wood, with copper for the bracelets. The spear and the walking stick are carved with African inscriptions and patterns.',
  ]},
  { t:'frames', cols:3, items:[
    LF('prop_arm_ornaments','Prop','Arm Ornaments','beads · strings · wood · copper'),
    LF('prop_spear','Prop','Spear','carved inscriptions'),
    LF('prop_walking_stick','Prop','Walking Stick','carved inscriptions'),
  ]},

  { t:'head', num:'12', title:'', accent:'Retrospective' },
  { t:'pullquote', text:'Every skin fold, wrinkle and pore became a piece of my identity.' },
  { t:'prose', body:[
    'Lolungu was the first character that made me fall in love with 3D characters and realism. He was a stepping stone, and every other character began with him.',
    'He made me love melanated skin and African culture more deeply. Every skin fold, wrinkle and skin pore became a piece of my identity, an imprint of my personal life that I could sculpt and mould.',
    'While most people would shy away from showing their first character sculpt, I embrace it, because it reminds me how I started.',
  ]},
];


/* ── ARYA — bespoke case study (custom blocks, not the 10-part template) ── */
const A = (n) => `/arya/${n}.jpg`;
const AF = (n, tag, label, spec) => F(A(n), tag, label, spec);

const ARYA_BLOCKS = [
  { t:'head', num:'01', title:'Where it', accent:'began' },
  { t:'prose', body:[
    'Sometimes the process takes you somewhere unexpected, and that is where the real growth happens.',
    'While studying Mari texturing across different sources, I came across a character by FlippedNormals, which I named Arya. What started as a focus on VFX-level photorealistic texturing eventually shifted into something deeper: an understanding of how light behaves across the surface detail I had created.',
    'The character was first prepared in ZBrush. Using ZWrap, I morphed a realistic human female scan onto the facial geometry, giving me a clean, anatomically grounded base to build on. From there I moved into Mari for the texture transfers, then painted my own custom texture work on top, correcting, refining, and making the maps my own.',
    'I challenged myself to understand lighting more intentionally, beyond the classic setup I learnt years back, key, fill, backlight and HDRI. I experimented with spotlights and gobos, shaping light to create mood, depth and a more cinematic realism.',
    'I am still learning and refining lighting until it fits my art style and language, until it speaks.',
  ]},
  { t:'prose', body:[
    'The reference board below is what the whole build was measured against, flat twists and cornrows for the head, long braid work, brows and lashes, peach fuzz across the jaw and hairline, and the skin plate that everything else had to sit convincingly beside.',
  ]},
  { t:'frames', cols:1, items:[ AF('reference_board','Reference','Reference Board','skin \u00b7 hair \u00b7 brows \u00b7 lashes \u00b7 peach fuzz') ]},

  { t:'head', num:'02', title:'Light before', accent:'skin' },
  { t:'prose', body:[
    'These clay renders test how the lighting holds up across form and angle. I wanted to see whether the mood stays consistent even as the character shifts, before any texture work could flatter it.',
    'The goal was never complexity. It was control: enough command of the light to keep a photoreal feel while the surface was still untextured.',
  ]},
  { t:'frames', cols:3, items:[
    AF('clay_01','Clay','Three-Quarter','form test'),
    AF('clay_02','Clay','Front · Raised','light hold'),
    AF('clay_03','Clay','Front','symmetry'),
    AF('clay_04','Clay','Front · Soft','falloff'),
    AF('clay_05','Clay','Profile Turn','shadow shape'),
    AF('clay_06','Clay','Eyes · Detail','terminator'),
    AF('clay_07','Clay','Nose & Lips','micro form'),
    AF('clay_08','Clay','Edge Profile','rim read'),
  ]},
  { t:'callout', title:'The rig · studio setup plus one spotlight',
    body:'A standard studio setup, skydome, two umbrella lights and a backlight, with one addition that changed the image: an extra spotlight carrying a leaf gobo, throwing dappled shadow across the face and crown. That single light is what gives the portrait its sense of place.' },
  { t:'frames', layout:'row', items:[
    AF('setup_light_editor','Setup','Light Editor','intensity / exposure'),
    AF('setup_viewport','Setup','Lighting Viewport','rig placement'),
    AF('setup_gobo','Setup','Spotlight + Gobo','aiGobo filter'),
  ]},
  { t:'autovideo', label:'Lighting Breakdown', youtubeId:'kHZDXohh_yw' },

  { t:'head', num:'03', title:'Bringing Arya to life,', accent:'one layer at a time' },
  { t:'prose', body:[
    'The head is laid out across three UDIM tiles, the face and ears on the first, the skull and neck split across the other two, which is what allowed the pore and displacement detail to hold at close range without a single map having to carry everything.',
    'Substance Painter is what I reach for in daily production work, and Mari is a different way of thinking. Before starting here I went back through FlippedNormals\u2019 Intro to Mari to get my bearings again, not because the tool is unfamiliar, but because realistic character work asks more of it than the projection and stencil passes I use it for occasionally. Getting reacquainted with the layer stack and the projection workflow first saved a great deal of undoing later.',
  ]},
  { t:'prose', body:[
    'With the lighting established, this stage focuses on how the maps I built in Mari begin to shape the realism of the character. Albedo and subsurface, roughness, displacement, and micro-detail through normals, each map plays its own part in how light interacts with skin.',
    'From a lit model to believable skin, rendered in Arnold: the transition happens here. Depth, texture and subtle imperfection revealed through natural light response.',
    'For me, look development is less about adding detail, and more about those details responding to your light, still pushing toward realism, and toward storytelling.',
  ]},
  { t:'prose', body:[
    'The Mari graph behind the head is where most of that work actually lives. Base colour is built up in stages, colour textures, then make-up, then the white paint pass, with separate branches carrying roughness, normals, the metallic gold, subsurface amount and a set of procedurals feeding the imperfections. Keeping each of those readable and grouped is what made the ACES rebuild survivable later.',
  ]},
  { t:'frames', cols:1, items:[ AF('udim_layout','UVs','UDIM Layout · Three Tiles','1001 \u00b7 1002 \u00b7 1003') ]},
  { t:'frames', cols:1, items:[ AF('mari_nodegraph','Node Graph','Mari · Head Shading Network','base colour \u00b7 roughness \u00b7 normal \u00b7 SSS \u00b7 procedurals') ]},
  { t:'autovideo', label:'Texture & Look Dev', youtubeId:'HF8l3l7bcqY' },
  { t:'frames', cols:3, items:[
    AF('lookdev_01','Render','Front · Hero','Arnold'),
    AF('lookdev_02','Render','Three-Quarter','Arnold'),
    AF('lookdev_03','Render','Eyes · Macro','gold detail'),
    AF('lookdev_04','Render','Lips · Macro','SSS response'),
    AF('lookdev_05','Render','Half Profile','edge light'),
    AF('lookdev_06','Render','Cheek Detail','gold leaf work'),
    AF('lookdev_07','Render','Bust · Wide','gobo shadow'),
    AF('lookdev_08','Render','Front · Lit','falloff study'),
    AF('lookdev_09','Render','Front · Alt','tonal test'),
  ]},

  { t:'head', num:'04', title:'The detail that sent me', accent:'back to the start' },
  { t:'prose', body:[
    'Just before jumping into XGen for grooming, I came across a video about colour management and realised something that completely shifted my workflow: I had been working in an sRGB pipeline instead of ACES.',
    'At first I tried the quick fix, simply switching the colour management settings in Mari. Predictably, that created a strange hybrid where my textures were sitting somewhere between sRGB and ACES. It looked fine at a glance, but it was not technically correct.',
    'So I went back and did it properly. I re-imported the texture maps into fresh paint nodes and rebuilt the setup under ACES. That is when the real difference became obvious: a much wider colour range, and reds in the skin that were far more pronounced.',
    'That discovery pushed me to revisit the entire look development process. I began exploring how far I could push melanin levels in the skin while keeping the result physically believable, a full 360 revisit of the textures, adjusting the makeup, refining the subsurface scattering attributes, and pushing toward a richer representation of darker skin tones.',
    'On the shading side I moved to an aiLayerShader setup in Arnold, separating skin, eyeshadow, lipstick, eyeliner and gold paint so each layer could respond to light with its own physical properties.',
    'It is interesting how a single pipeline detail can send you back through multiple stages of a project. But that is part of the process, constantly learning, refining, and pushing the work further. Every step forward reveals something new.',
  ]},
  { t:'autovideo', label:'Colour Management · sRGB to ACES', youtubeId:'dzT0cf48VUk' },

  { t:'head', num:'05', title:'Rebuilt in ACES ·', accent:'grooming, part one' },
  { t:'prose', body:[
    'After a few weeks of relearning and rebuilding my workflow around ACES, I finally reached a result with Arya\u2019s skin that I am genuinely satisfied with.',
    'That shift pushed me to rethink everything. I stripped back most of the makeup, keeping only the eyeliner, and replaced the gold elements with a simpler white tribal pattern. It is a different direction from where I started, but it felt necessary. Once the lighting and colour pipeline became physically grounded, I had to go back to the drawing board and rebuild the majority of the maps from scratch.',
    'This version also marks part one of the grooming: peach fuzz, eyelashes, nose hair and eyebrows, all built in XGen.',
  ]},
  { t:'frames', cols:3, items:[
    AF('aces_01','ACES','Front · Daylight','rebuilt maps'),
    AF('aces_02','ACES','Front · Turn','skin response'),
    AF('aces_03','ACES','Three-Quarter','white pattern'),
    AF('aces_04','ACES','Macro · Eyes','peach fuzz / lashes'),
    AF('aces_05','ACES','Soft Three-Quarter','natural light'),
  ]},

  { t:'head', num:'06', title:'The makeup version,', accent:'revisited' },
  { t:'prose', body:[
    { parts:[
      'A friend and colleague in the 3D industry, ',
      { text:'Daniel Ngatia', href:'https://www.linkedin.com/in/danielngatia/' },
      ', convinced me to share these renders of Arya with the makeup on, so here they are.',
    ]},
    'This version brings back some of the earlier artistic direction, and it has been interesting to see how it compares with the more recent skin-focused look dev. Different approach, same character · just viewed through a more refined pipeline.',
    'No head hair yet, but it already offers a solid comparison point between where this project started and where it is heading.',
  ]},
  { t:'frames', cols:3, items:[
    AF('makeup_01','Render','Front · Red Crown','ACES pipeline'),
    AF('makeup_02','Render','Front · Turn','layered shader'),
    AF('makeup_03','Render','Three-Quarter','daylight'),
    AF('makeup_04','Render','Macro · Eyes','pattern detail'),
    AF('makeup_05','Render','Macro · Cheek','dot work'),
    AF('makeup_06','Render','Portrait','full look'),
  ]},

  { t:'head', num:'07', title:'Look Development', accent:'Two' },
  { t:'prose', body:[
    'Underneath everything on the face sits a single aiLayerShader carrying six layers, skin, make-up, eyeshadow, eyeliner, face paint and lipstick. Each one is its own shader feeding its own slot, so any of them can be soloed, dialled back or switched off without touching the others. That separation is what made the makeup revisions survivable: changing the eyeliner never meant re-authoring skin, and the gold face paint could be pushed or pulled long after the base was locked.',
    'The eyes are built on the technique from Tom Newbury\u2019s Creating a Realistic Eye 3.0, which I bought from Gumroad. Sclera, iris, pupil and the meniscus each get their own shader, layered and mixed rather than solved in one material, the same logic as the skin, applied at a much smaller scale.',
    'The skin displacement setup also comes from Tom Newbury, from his course on the TextureXYZ YouTube page. I did not take it across untouched. Melanated skin responds differently to several of those settings, and the values that read correctly on lighter reference went flat or plastic here, so the displacement height, the subsurface radii and the specular response were all recalibrated against test renders until the surface behaved the way it should.',
  ]},
  { t:'callout', title:'Credit where it is due',
    body:'The eye technique is from Tom Newbury\u2019s Creating a Realistic Eye 3.0 (Gumroad), and the displacement approach from his TextureXYZ course. The adjustments for melanated skin are mine, arrived at through test rendering.' },
  { t:'frames', cols:1, items:[
    AF('hypershade_skin','Hypershade','Skin · aiLayerShader','six layers: skin \u00b7 make-up \u00b7 eyeshadow \u00b7 eyeliner \u00b7 face paint \u00b7 lipstick'),
    AF('hypershade_eye','Hypershade','Eye · Layered Shader Network','sclera \u00b7 iris \u00b7 pupil \u00b7 meniscus'),
  ]},

  { t:'head', num:'08', title:'Meet', accent:'Arya' },
  { t:'prose', body:[
    'Final renders from a character odyssey exploring realism, texture, grooming and presence.',
    'What began as a study in texturing evolved into a full workflow transformation, spanning Mari, ACES colour management, and advanced grooming using XGen and Maya Groomer\u2019s tools alongside a rebuilt look development pipeline.',
  ]},
  { t:'callout', title:'The gap this project sat in',
    body:'One challenge stood out: the limited reference and learning resources for melanated African skin, especially in a field built around 3D hyperrealism. This project became a space for experimentation, iteration and deeper understanding, and a reason to keep going.' },
  { t:'frames', cols:3, items:[
    AF('final_01','Final','Hero Portrait','braided groom'),
    AF('final_02','Final','Three-Quarter','daylight'),
    AF('final_03','Final','Front · Direct','full groom'),
    AF('final_04','Final','Turn · Soft','environment light'),
    AF('final_05','Final','Profile','braid detail'),
    AF('final_06','Final','Macro · Eyes','lashes / brows'),
    AF('final_07','Final','Macro · Cheek','pattern + skin'),
    AF('final_08','Final','Macro · Lips','micro detail'),
    AF('final_09','Final','Half Frame','depth of field'),
    AF('final_10','Final','Red Crown · Front','alt look'),
    AF('final_11','Final','Portrait · Wide','final grade'),
  ]},
  { t:'prose', body:[
    'Below, the XGen collection behind the groom, head, eyebrows, nose hair, peach fuzz, lashes and braids, built as separate descriptions so each could be controlled independently.',
  ]},
  { t:'frames', cols:1, items:[ AF('groom_viewport','XGen','Grooming Setup','collection + guides') ]},
  { t:'chips', items:['Autodesk Maya','ZBrush','ZWrap','Foundry Mari','XGen','Maya Groomer\u2019s Tools','Arnold','Photoshop'] },
  { t:'autovideo', label:'Arya · Final Breakdown', youtubeId:'Ul4Q-TlgnW8' },

  { t:'head', num:'09', title:'', accent:'Retrospective' },
  { t:'pullquote', text:'Look development is less about adding detail, and more about those details responding to your light.' },
  { t:'prose', body:[
    'Arya started as a texturing study and turned into a rebuild of how I work, colour management, lighting intent, layered shading, and grooming, each one forcing a return to something I thought was already finished.',
    'Built with production-ready workflows, and still in progress. The head hair is next.',
  ]},
];

/* ── AFREZIA · bespoke case study, Safaricom Emerald hologram launch ── */
const AZ = (n) => `/afrezia/${n}.jpg`;
const AZF = (n, tag, label, spec) => F(AZ(n), tag, label, spec);

const AFREZIA_BLOCKS = [
  { t:'head', num:'01', title:'Reference &', accent:'Intent' },
  { t:'prose', body:[
    'In trying to create this character, we ended up incorporating AI into the referencing, as well as into parts of the facial animation.',
    'The reference looks the way it does because it follows what the client shared as the main reference.',
    'Afrezia was meant to look both human and relatable, and like a droid or machine at the same time. One of the inspirations I referenced for the idea was Alita: Battle Angel.',
    'Another key element was to retain an African look, while adapting the character to the brand.',
  ]},
  { t:'frames', cols:1, items:[ AZF('reference_board','Reference','Reference Board','client reference · cybernetic design · emissive lines') ]},

  { t:'head', num:'02', title:'Blockout &', accent:'Sculpt' },
  { t:'prose', body:[
    'I used one of my base meshes as a starting point. It was also my first time working on hard surface concepts, and every alpha and brush felt like a new experiment.',
    'I am used to organic shapes, but this one felt like a new style that I was happily experimenting with, on short notice. I remember it being less than two days and nights of work for the whole project.',
  ]},
  { t:'video', label:'Sculpting Process', spec:'ZBrush · process video', youtubeId:'f5Mj8s8_i7c' },
  { t:'frames', cols:3, items:[
    AZF('sculpt_front','Sculpt','Front · Head','ZBrush · hard surface'),
    AZF('sculpt_profile','Sculpt','Profile · Head and Torso','ZBrush · hard surface'),
    AZF('sculpt_apose','Sculpt','A-Pose · Clothed','ZBrush'),
  ]},
  { t:'frames', cols:1, items:[ AZF('sculpt_turnaround','Sculpt','Turnaround · Front, Three Quarter, Back','ZBrush · hard surface') ]},
  { t:'video', label:'Sculpt Short', spec:'ZBrush', youtubeId:'eIADYGW5uAA', portrait:true },
  { t:'head', num:'03', title:'Retopo &', accent:'UVs' },
  { t:'prose', body:[
    'The UVs were laid out across three UDIM tiles. It was a deliberate choice, because I wanted to render the character fast, as opposed to how long it would take to render one huge texture map.',
  ]},
  { t:'frames', cols:1, items:[ AZF('uv_layout','UVs','UDIM Layout · Three Tiles','1001 head and neck · 1002 torso and legs · 1003 arms and hands') ]},

  { t:'head', num:'04', title:'Texturing &', accent:'Map Authoring' },
  { t:'prose', body:[
    'Texturing was done in Substance 3D Painter. Below are the eight maps authored for the character, each shown on the model in the viewport alongside the three UDIM tiles, followed by the Iray renders straight out of Substance 3D Painter.',
  ]},
  { t:'video', label:'Substance 3D Painter Viewport', spec:'texturing preview', youtubeId:'IkNVWZHleMA' },
  { t:'frames', cols:2, items:[
    AZF('map_basecolor','Map','Base Colour','Substance 3D Painter'),
    AZF('map_roughness','Map','Roughness','Substance 3D Painter'),
    AZF('map_metallic','Map','Metallic','Substance 3D Painter'),
    AZF('map_normal','Map','Normal','Substance 3D Painter'),
    AZF('map_height','Map','Height','Substance 3D Painter'),
    AZF('map_emissive','Map','Emissive','Substance 3D Painter'),
    AZF('map_ao','Map','Ambient Occlusion','Substance 3D Painter'),
    AZF('map_curvature','Map','Curvature','Substance 3D Painter'),
  ]},
  { t:'frames', cols:3, items:[
    AZF('iray_01','Iray','Three Quarter · Head','Substance 3D Painter Iray'),
    AZF('iray_02','Iray','Front · Head','Substance 3D Painter Iray'),
    AZF('iray_03','Iray','Three Quarter · Bust','Substance 3D Painter Iray'),
    AZF('iray_04','Iray','Front · Face and Neck','Substance 3D Painter Iray'),
    AZF('iray_05','Iray','Close Up · Face','Substance 3D Painter Iray'),
    AZF('iray_06','Iray','Macro · Cheek and Ear','Substance 3D Painter Iray'),
    AZF('iray_07','Iray','Profile · Back of Head','Substance 3D Painter Iray'),
    AZF('iray_08','Iray','Side · Torso and Arm','Substance 3D Painter Iray'),
    AZF('iray_09','Iray','Forearm and Hand','Substance 3D Painter Iray'),
  ]},
  { t:'head', num:'05', title:'Shading ·', accent:'Hypershade' },
  { t:'prose', body:[
    'I tried to keep the node network quite simple, and used textures of 2K at most across the character, for faster rendering and texture loading.',
  ]},
  { t:'frames', cols:1, items:[ AZF('hypershade','Hypershade','Maya · aiStandardSurface Networks','skin · body · base colour · metallic · roughness · normal · emissive') ]},

  { t:'head', num:'06', title:'Grooming ·', accent:'XGen' },
  { t:'prose', body:[
    'When it came to grooming, I stuck to simple grooming groups, the lashes and the brows, to still retain the human look.',
  ]},
  { t:'chips', items:['Eyebrows','Eyelashes'] },
  { t:'frames', cols:1, items:[
    AZF('xgen_face','XGen','Brows and Lashes · Viewport','density mask · spline primitives'),
    AZF('xgen_body','XGen','Groom in Scene · Viewport','eyebrow and eyelash description'),
  ]},

  { t:'head', num:'07', title:'', accent:'Lighting' },
  { t:'prose', body:[
    { parts:[
      'For lighting, I stuck to the same three point studio setup I used on ',
      { text:'Lolungu', href:'/characters/lolungu-the-turkana' },
      ', plus an HDRI.',
    ]},
  ]},
  { t:'chips', items:['Area Light 1','Area Light 2','Area Light 3','HDRI Skydome'] },
  { t:'frames', cols:1, items:[ AZF('light_setup','Setup','Three Point Setup + HDRI','three aiAreaLights · aiSkyDomeLight') ]},

  { t:'head', num:'08', title:'Look', accent:'Development' },
  { t:'prose', body:[
    'Afrezia was rendered in Arnold. Subsurface scattering was not needed, because we were trying to achieve a droid look, and we followed an sRGB colour management workflow.',
  ]},
  { t:'frames', cols:2, items:[
    AZF('lookdev_01','Render','Front · Head','Arnold · sRGB'),
    AZF('lookdev_02','Render','Three Quarter · Bust','Arnold · sRGB'),
  ]},

  { t:'head', num:'09', title:'', accent:'Rigging' },
  { t:'prose', body:[
    { parts:[
      'I rigged the character using MetaHuman from Unreal Engine, just like ',
      { text:'Lolungu', href:'/characters/lolungu-the-turkana' },
      '.',
    ]},
  ]},
  { t:'callout', title:'Rigging support from Daniel Ngatia', body:{ parts:[
    'This time a lot of the help came from ',
    { text:'Daniel Ngatia', href:'https://www.linkedin.com/in/danielngatia/' },
    '.',
  ]}},
  { t:'video', label:'Animation Rig Test', spec:'MetaHuman rig', youtubeId:'Z7kFA-hvVn8' },

  { t:'head', num:'10', title:'', accent:'Animation' },
  { t:'prose', body:[
    'Because of the time we had, we posed Afrezia in various poses and rendered the images out. The images were then uploaded to an AI platform of choice, Kling being one of them, and animated to match each pose.',
    'The animation felt more human than machine, but we could easily get away with it, because it was going to play as a hologram.',
  ]},
  { t:'video', label:'AI Animation · Output Compilation', spec:'posed renders animated with Kling', youtubeId:'vMO6lU8vg9A', portrait:true },

  { t:'head', num:'11', title:'', accent:'Retrospective' },
  { t:'pullquote', text:'This project tested both my patience and my adaptability.' },
  { t:'prose', body:[
    'My workflow had to be interrupted at the time to embrace AI workflows, a fairly new way of working back then. It cut render time by a big chunk, which allowed faster video editing towards the final delivery video.',
  ]},
];

/* ── OMOLARA · bespoke case study ── */
const OM = (n) => `/omolara/${n}.jpg`;
const OMF = (n, tag, label, spec) => F(OM(n), tag, label, spec);

const OMOLARA_BLOCKS = [
  { t:'head', num:'01', title:'Reference &', accent:'Intent' },
  { t:'prose', body:[
    'The reference board covers different Ethiopian cultures, especially the Omo tribe. For this character I leaned into actual photographs: a main reference, hair and ornament references for XGen, render poses, background ideas and traditional attire.',
    'I have come to understand that the smoother someone’s face is, the harder it becomes to texture. Their skin has no folds to carry the story, so the story has to be told subtly, through the skin itself: light blemishes, light scars, a subtle sunburn.',
  ]},
  { t:'frames', cols:1, items:[ OMF('reference_board','Reference','Reference Board','main reference · XGen and ornaments · render poses · background · attire') ]},

  { t:'head', num:'02', title:'Blockout &', accent:'Sculpt' },
  { t:'prose', body:[
    'Guilty to say, I forgot to render the sculpt. What I do have is the ZBrush viewport, the hair blockouts and a turntable of the character.',
  ]},
  { t:'frames', layout:'row', items:[
    OMF('sculpt_01','Sculpt','ZBrush · Curled Hair Blockout','viewport'),
    OMF('sculpt_02','Sculpt','ZBrush · Twisted Locs and Lashes','viewport'),
  ]},
  { t:'video', label:'ZBrush Turntable', spec:'Omolara sculpt', youtubeId:'225cVlSaIvU', portrait:true },

  { t:'head', num:'03', title:'Retopo &', accent:'UVs' },
  { t:'prose', body:[
    'The character is laid out across ten UDIM tiles.',
  ]},
  { t:'frames', cols:1, items:[
    OMF('topology','Topology','Wireframe · Head','Maya'),
    OMF('uv_layout','UVs','UDIM Layout · Ten Tiles','1001 to 1010'),
  ]},

  { t:'head', num:'04', title:'Texturing &', accent:'Map Authoring' },
  { t:'prose', body:[
    'The skin started with a texture transfer: I used ZWrap to wrap a scan onto the head, then moved into Mari for the skin textures. My colour management was sRGB at this particular time.',
    'Mari has been a very useful tool, especially when trying to achieve very detailed textures. It allows a non destructive workflow, so I can correct very specific details without starting over.',
  ]},
  { t:'frames', cols:1, items:[
    OMF('mari_nodegraph','Node Graph','Mari · Channel Groups','diffuse · specular · roughness · normal · displacement'),
    OMF('mari_viewport','Mari','Mari · Viewport','sRGB'),
  ]},
  { t:'frames', cols:2, items:[
    OMF('map_diffuse','Map','Diffuse','Mari'),
    OMF('map_specular','Map','Specular','Mari'),
    OMF('map_roughness','Map','Roughness','Mari'),
    OMF('map_normal','Map','Normal','Mari'),
    OMF('map_displacement','Map','Displacement','Mari · graded'),
  ]},

  { t:'head', num:'05', title:'Shading ·', accent:'Hypershade' },
  { t:'prose', body:[
    'I kept the shading quite simple: a single aiStandardSurface shader carrying the skin, fed by the Mari maps.',
  ]},
  { t:'frames', cols:1, items:[ OMF('hypershade','Hypershade','Maya · aiStandardSurface Network','diffuse · specular · roughness · normal · displacement') ]},

  { t:'head', num:'06', title:'', accent:'Lighting' },
  { t:'prose', body:[
    { parts:[
      'For lighting, I stuck to the same three point setup with an HDRI that I used on ',
      { text:'Lolungu', href:'/characters/lolungu-the-turkana' },
      ' and ',
      { text:'Afrezia', href:'/characters/afrezia-the-emerald' },
      '.',
    ]},
  ]},
  { t:'chips', items:['Key Light','Fill Light','Back Light','HDRI Skydome'] },
  { t:'head', num:'07', title:'Grooming ·', accent:'XGen' },
  { t:'prose', body:[
    'A particularly hard one to figure out was the head hair. I was rendering on a laptop, an Intel i7 with an RTX 3050 (4GB VRAM) and 16GB of RAM, and XGen really gave me a hard time rendering and handling the many small braids.',
    'Omo hairstyles are made with a mixture of red soil and mud that preserves the hair. Because of that, the hair had to be more of a mesh with strands of hair over it, and the shiny specular of the wet mud had to be heightened.',
  ]},
  { t:'chips', items:['Head Hair · Mesh + Strands','Eyebrows','Eyelashes','Peach Fuzz'] },
  { t:'frames', cols:1, items:[
    OMF('xgen_bust','XGen','Groom in Scene · Bust','braids · ornaments · cowrie shells'),
  ]},
  { t:'frames', cols:2, items:[
    OMF('xgen_face','XGen','Brows and Lashes · Collections','eye area · eyebrow and eyelash descriptions'),
    OMF('xgen_editor','XGen','Eyebrow Description · Editor','density mask · spline primitives'),
  ]},

  { t:'head', num:'08', title:'Look', accent:'Development' },
  { t:'prose', body:[
    'The beadwork was particularly hard to attain. I used a MASH network to distribute the cowrie shells across the ornaments.',
    'Following Omo culture, the clothes and the cowrie shell neck ornaments were added in this pass. The attire is made of cow hide.',
  ]},
  { t:'frames', cols:2, items:[
    OMF('lookdev_01','Look Dev','Split · Textured and Clay','Arnold'),
    OMF('lookdev_03','Look Dev','Split · Three Quarter','Arnold'),
    OMF('lookdev_04','Look Dev','Front · Head and Ornaments','Arnold'),
    OMF('lookdev_02','Look Dev','Macro · Eye and Skin','Arnold'),
  ]},
  { t:'frames', layout:'row', items:[
    OMF('clothes','Attire','Cow Hide Garment','cowrie shell ornament · Arnold'),
  ]},

  { t:'head', num:'09', title:'', accent:'Retrospective' },
  { t:'pullquote', text:'A study that inspired me to test other cultures I can try crafting.' },
  { t:'prose', body:[
    'Omolara was an exploration, a test of how well I could portray a culture I am not very knowledgeable about. It was a study that inspired me to try crafting other cultures too.',
    'The melanin was acceptable against the reference, but this is definitely a project I can revamp and test again in future.',
  ]},
];

export const CHARACTER_BLOGS = [
  cBlog({
    slug:'arya', name:'Arya', epithet:'A Character Texturing Odyssey',
    category:'Hyperrealistic Character', year:'2026',
    tagline:'A texturing study that became a full pipeline rebuild, ZBrush and ZWrap to Mari, sRGB to ACES, and a search for how melanated skin should truly respond to light.',
    status:'Complete',
    keywords:['Arya 3D character','realistic Black woman 3D character','melanated skin rendering','Mari skin texturing','ACES colour management in Maya','sRGB to ACES workflow','Arnold aiLayerShader makeup','XGen grooming braids and peach fuzz','ZWrap texture transfer','realistic 3D eyes','spotlight gobo lighting','3D character artist Kenya'],
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
    tagline:'A dark African fantasy being, drawn from the mystery, fear and symbolism embedded in traditional African fables.',
    status:'In Progress',
    keywords:['Odungi African creature','African dark fantasy character','African folklore 3D character','ZBrush creature sculpt','ram horns creature design','scarification sculpt','Mari texturing ACES','melanated skin creature','MetaHuman creature rig','Sankofa Asili Productions','African mythology character design','3D creature artist Kenya'],
    specs:{ software:['ZBrush','Maya','Mari','Arnold','XGen','Photoshop'] },
    thumb:'/characters/odungi.jpg', hero:null, heroBg:null, outro:null, outroPending:true,
    intro:[
      'African fantasy has always existed. It just rarely gets visualized. Growing up, many of us heard stories whispered around fires, in villages, at home, in school compounds and from our grandparents. Stories about three eyed ogres, talking animals, spirits, cursed lands, ancient beings, shape shifters and creatures people feared to even describe openly.',
      'Those stories have shaped imaginations across Africa. But somewhere along the way, our film and visual storytelling industries became afraid of exploring them visually, because of cultural taboos, religious sensitivity, or the idea that African audiences only want realism or comedy; much less the skillset that lacked to tell them. I disagree. Hence this is Odungi, my next character project.',
      'A dark African fantasy being, inspired by the mystery, fear, symbolism and folklore embedded in traditional African fables. Part of an ongoing exploration into cinematic African creature design, melanated skin, high end character development and worldbuilding for film, games and VFX.',
      'The goal is bigger than just creating a creature. It is about pushing African storytelling into spaces we rarely see: African dark fantasy, mythological horror, indigenous creature design, cinematic worldbuilding, AAA level African visual development.',
    ],
    blocks: ODUNGI_BLOCKS,
  }),
  cBlog({
    slug:'lolungu-the-turkana', name:'Lolungu', epithet:'The Turkana',
    category:'Hyperrealistic Character', year:'2023',
    tagline:'A Turkana portrait, weathered skin, beadwork and the optical truth of melanin under hard northern light.',
    thumb:'/characters/lolungu.jpg',
    status:'Complete',
    keywords:['Lolungu Turkana 3D character','Turkana culture 3D','first ZBrush character sculpt','realistic old man sculpt','Substance 3D Painter skin texturing','XGen Interactive Grooming beard','Arnold aiLayerShader skin and paint','African beadwork 3D props','Marvelous Designer clothes','Turkana and Maasai patterns','MetaHuman rig and animation','Kenyan 3D character artist'],
    specs:{ software:['PureRef','Autodesk Maya','ZBrush','Photoshop','Substance 3D Painter','Marvelous Designer','Arnold'] },
    hero:'/lolungu/hero.jpg',
    heroBg:'/lolungu/hero_bg.jpg',
    outro:'/lolungu/exit_render.jpg',
    intro:[
      'Lolungu was my first ZBrush character sculpt, and my first real attempt at realism. Most artists would shy away from showing their first attempt, but I embrace it.',
      'It wasn’t just about figuring out how to sculpt realism. It was also my first time working through skin and cloth texturing, XGen and 3D cloth, all for a character.',
      'I chose to sculpt Lolungu in retrospect of what I wanted to achieve. I particularly chose an older man because I was trying to figure out what I wanted to achieve long term in 3D, and whether my original reason for switching from 2D fine art pencil drawing to 3D could reach the level of realistic detail I was looking for.',
    ],
    blocks: LOLUNGU_BLOCKS,
  }),
  cBlog({
    slug:'afrezia-the-emerald', name:'Afrezia', epithet:'The Emerald',
    category:'Hyperrealistic Character', year:'2025',
    tagline:'A cybernetic character built in under two days and nights for the Safaricom Emerald hologram launch, embracing AI-assisted techniques inside a traditional CGI workflow.',
    status:'Complete',
    keywords:['Afrezia hologram character','Safaricom Emerald hologram launch','3D hologram character Kenya','AI assisted CGI workflow','Kling AI animation','African cyborg droid character','hard surface sculpting ZBrush','Substance 3D Painter Iray renders','MetaHuman rig','Alita Battle Angel inspired character','hologram content Nairobi'],
    specs:{ software:['ZBrush','Maya','Substance 3D Painter','XGen','Arnold','MetaHuman','Kling'] },
    hero: img('1A3CdSQkLq1gEYtTpIjz0OvamB8oavEBp','w1600'),
    heroBg:'/afrezia/hero_bg.jpg',
    outroYoutubeId:'pjqOpzNLG2U',
    intro:[
      'Afrezia was a project for a hologram launch for Emerald by Safaricom. It came in last minute, and we had only a few nights to create a fully working 3D character.',
      'Afrezia was made to be an embrace of modern techniques within traditional CGI workflows.',
    ],
    blocks: AFREZIA_BLOCKS,
  }),
  cBlog({
    slug:'omolara-the-omo', name:'Omolara', epithet:'The Omo',
    category:'Hyperrealistic Character', year:'2024',
    tagline:'An Omo Valley portrait, ceremonial paint, ornament and skin under natural light.',
    thumb:'/characters/omolara.jpg',
    status:'Complete',
    keywords:['Omolara Omo 3D character','Omo Valley culture 3D portrait','Ethiopian culture 3D character','realistic African woman 3D character','ZWrap texture transfer','Mari skin texturing','melanated skin rendering','XGen braids with red soil mud','MASH cowrie shell beadwork','cow hide attire 3D','Arnold sRGB look development','3D character artist Kenya'],
    specs:{ software:['ZBrush','ZWrap','Maya','Mari','XGen','MASH','Arnold'] },
    hero:'/omolara/hero.jpg',
    heroBg:'/omolara/hero_bg.jpg',
    outro:'/omolara/exit_render.jpg',
    intro:[
      'Omolara was a character inspired by a deep dive into Ethiopian culture, and a chance to polish a few 3D techniques, like texture transfer and skin texturing in Mari.',
    ],
    blocks: OMOLARA_BLOCKS,
  }),
  cBlog({
    slug:'ndirangu-the-farmer', name:'Ndirangu', epithet:'The Farmer',
    category:'Stylized Character', year:'2026',
    tagline:'A stylized character study, exaggerated form, hand-crafted appeal, a farmer\u2019s story.',
    thumb:'/characters/ndirangu.jpg',
    status:'In Progress',
    keywords:['Ndirangu stylized character','stylized farmer 3D character','ZBrush stylized sculpt','Kenyan stylized character design','3D character artist Kenya'],
    specs:{ software:['ZBrush','Maya','Substance'] },
    hero: null,
    img:{},
  }),
  cBlog({
    slug:'moombi-the-angel', name:'Moombi', epithet:'The Angel',
    category:'Hyperrealistic Character', year:'2025',
    tagline:'A winged hyperreal figure, feather grooming, luminous skin, a celestial study.',
    thumb:'/characters/moombi.jpg',
    status:'In Progress',
    keywords:['Moombi angel character','winged 3D character','XGen feather grooming','hyperreal skin rendering','3D character artist Kenya'],
    specs:{ software:['ZBrush','Substance','Mari','XGen'] },
    hero: img('1Ro5J75-KlaowzZf1-97LLJDZCgiAj61O','w1600'),
    img:{
      lookdev:[ F(img('1Ro5J75-KlaowzZf1-97LLJDZCgiAj61O'),'Render','Hero Render','final') ],
    },
  }),
  cBlog({
    slug:'otugi-the-dragon', name:'Otugi', epithet:'The Dragon',
    category:'Creature', year:'2027',
    tagline:'A creature build, scale displacement, anatomy and a reptilian shading study.',
    thumb:'/characters/otugi.jpg',
    status:'2027 Project', statusAlways:true,
    keywords:['Otugi dragon creature','3D dragon creature design','scale displacement','reptilian shading study','3D creature artist Kenya'],
    specs:{ software:['ZBrush','Maya','Houdini'] },
    hero: null,
    img:{},
  }),
];

export const getCharacterBlog = (slug) => CHARACTER_BLOGS.find(c => c.slug === slug);
