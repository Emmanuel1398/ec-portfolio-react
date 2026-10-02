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
    outroPending: !!meta.outroPending,
    specs: meta.specs || {},
    blocks: meta.blocks || buildBlocks(meta.img),
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

export const CHARACTER_BLOGS = [
  cBlog({
    slug:'arya', name:'Arya', epithet:'A Character Texturing Odyssey',
    category:'Hyperrealistic Character', year:'2026',
    tagline:'A texturing study that became a full pipeline rebuild, ZBrush and ZWrap to Mari, sRGB to ACES, and a search for how melanated skin should truly respond to light.',
    status:'Complete',
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
    category:'Hyperrealistic Character', year:'2025',
    tagline:'A Turkana portrait, weathered skin, beadwork and the optical truth of melanin under hard northern light.',
    thumb:'/characters/lolungu.jpg',
    status:'Being Revamped',
    specs:{ software:['ZBrush','Maya','Mari','Arnold'] },
    hero: img('1Cxe3diwxEJQeTehn-Kg10Pw8o-ILHE8e','w1600'),
    img:{
      ref:[
        F(img('13kroEdCEDYOSYQKLpqZU2JbFpUDJoPtG'),'Ref','Quarter Shape','blockout'),
        F(img('1YT3Ylaa13yK3UZ-2ivtSNSLxOnNmQ7VZ'),'Ref','Quarter · Beads','adornment'),
      ],
      sculpt:[
        F(img('1kkHNOLC_m-vXd2m6QWeVnyiwADqhpecl'),'Sculpt','ZBrush Clay','primary forms'),
        F(img('1_wnl4z6a4lBO8XGqlKh86TU_nHKgdVwd'),'Sculpt','ZBrush Clay','secondary'),
        F(img('1Pad3JgiaQpoKCGmU2oGruquu1PXb2lQ1'),'Sculpt','ZBrush Clay','detail'),
      ],
      uv:[
        F(img('1rz93YvxtVcTsno8USjxGU9l6-XYdlc6Q'),'Wire','Lowpoly · Game','retopo'),
        F(img('14R85bqAcwNeBy53ux4OtxL6zIPXGGkfI'),'Wire','Lowpoly · Film','retopo'),
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
    tagline:'A jewel-toned hyperreal portrait, emerald adornment against deep skin.',
    status:'Pending',
    specs:{ software:['Maya','ZBrush','Mari'] },
    hero: img('1A3CdSQkLq1gEYtTpIjz0OvamB8oavEBp','w1600'),
    img:{
      lookdev:[ F(img('1A3CdSQkLq1gEYtTpIjz0OvamB8oavEBp'),'Render','Hero Render','final') ],
    },
  }),
  cBlog({
    slug:'omolara-the-omo', name:'Omolara', epithet:'The Omo',
    category:'Hyperrealistic Character', year:'2024',
    tagline:'An Omo Valley portrait, ceremonial paint, ornament and skin under natural light.',
    thumb:'/characters/omolara.jpg',
    status:'Being Revamped',
    specs:{ software:['ZBrush','Maya','Mari'] },
    hero: img('1vZme7yIW7VbUOlTw5CtYTV00zFObasrs','w1600'),
    img:{
      lookdev:[ F(img('1vZme7yIW7VbUOlTw5CtYTV00zFObasrs'),'Render','Hero Render','final') ],
    },
  }),
  cBlog({
    slug:'ndirangu-the-farmer', name:'Ndirangu', epithet:'The Farmer',
    category:'Stylized Character', year:'2026',
    tagline:'A stylized character study, exaggerated form, hand-crafted appeal, a farmer\u2019s story.',
    thumb:'/characters/ndirangu.jpg',
    status:'In Progress',
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
    specs:{ software:['ZBrush','Maya','Houdini'] },
    hero: null,
    img:{},
  }),
];

export const getCharacterBlog = (slug) => CHARACTER_BLOGS.find(c => c.slug === slug);
