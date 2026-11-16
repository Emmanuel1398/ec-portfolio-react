/* ── Illustration breakdowns. Same block vocabulary as the character blogs. ── */

const C = (n) => `/crackers/${n}.jpg`;
const CF = (n, tag, label, spec) => ({ src: C(n), tag, label, spec });

/* Christmas set · own asset folder */
const X = (n) => `/xmas-crackers/${n}.jpg`;
const XF = (n, tag, label, spec) => ({ src: X(n), tag, label, spec });

/* Daniel Ngatia designed two of the four Christmas crackers. Same credit
   treatment as the character blogs: name linked to his LinkedIn. */
const DANIEL = { text: 'Daniel Ngatia', href: 'https://www.linkedin.com/in/danielngatia/' };

const CRACKER_BLOCKS = [
  { t:'head', num:'01', title:'The', accent:'Brief' },
  { t:'prose', body:[
    'Walk through any shop here in the festive season and the crackers on the shelf carry pattern histories from somewhere else. Holly, snowflakes, Victorian scrollwork, reindeer. All of it beautiful, none of it ours. I wanted a cracker that an African table could recognise itself in.',
    'That was the whole starting point. Not a cracker with African motifs applied on top of a European object, but one whose visual language begins in African pattern and works outward. There are hints of foreign influence in these, and I did not fight that, because the form itself is borrowed. But the taste and the imagination had to stay African.',
  ]},
  { t:'frames', cols:1, items:[ CF('brief','Renders','The Three New Year Crackers','Binti Afrika · The Moran · Malkia') ]},
  { t:'prose', body:[
    'The artwork was drawn in Illustrator. From those exported designs I built metallic and roughness maps, then took the whole set into Maya for the 3D visualizations, so the foil bands, the gloss on the printed panels and the matt of the crimped ends all read as different materials rather than one flat wrap.',
    'Three designs, each carrying its own colour and its own idea. The names are mine. They are in the Kenyan market under other names, but these are what I called them while I was making them, and they are closer to what the artwork is actually about.',
  ]},
  { t:'callout', title:'A note on the structure',
    body:'Each cracker carries three panels along its length. The two ends mirror each other and frame a centrepiece that appears once. That was deliberate, and it is the same arrangement on all three.' },

  { t:'head', num:'02', title:'Binti', accent:'Afrika' },
  { t:'prose', body:[
    'Binti Afrika translates as Lady Africa, and it was the first of the three to come to life. It began with the broadest question: what makes African art recognisably African. The answer I worked from was kanga and leso cloth, which is why the pattern wraps the entire cracker rather than sitting politely inside a panel. The colours had to be bold and saturated, because that is what the reference demands.',
    'Then the constraint. This is a festive cracker, so it needed to lean toward New Year without abandoning Christmas, which is where the wreaths and the dandelions come from. The leaves scattered around the centre are simply nature, kept plain so they do not compete.',
    'The women came last and carry the meaning. African women as a figure of fruitfulness and bearing, the same way the African earth produces. The two figures on the ends dance to the occasion. The centre figure holds still in a kanga headwrap, dazzling in jewellery and heritage.',
    'The gold running through all three crackers is the wealth in the ground. Look closely at the strips and some of them carry African tribal patterning of their own.',
  ]},
  { t:'frames', cols:1, items:[ CF('binti-main','Render','Binti Afrika','full cracker \u00b7 teal') ]},
  { t:'frames', layout:'row', items:[
    CF('binti-centre','Centre','The Kanga Headwrap','centrepiece'),
    CF('binti-end-1','End','Wreaths and Dandelions','end panel'),
    CF('binti-end-2','End','The Dancer','end panel'),
  ]},

  { t:'head', num:'03', title:'The', accent:'Moran' },
  { t:'prose', body:[
    'The Moran was second, and unlike the first it did not start from a theme. It started from a picture I had in my head: a young Maasai walking through the skyscrapers of a foreign city.',
    'So the young warrior is the centrepiece, and the buildings sit behind him in gold. Underneath both is African tribal pattern, holding the ground. That mattered. The audience for these is African, and even with a foreign skyline in frame, the foundation had to stay where it belongs.',
    'The end panels return to the woman, dressed in ornament and carrying a gourd on her head. Fruitfulness again, as in Binti Afrika, but grounded here in an ordinary rural chore rather than a symbol. The second end figure is a Maasai warrior with spear and shield. He looks like he is standing. He is not. He is caught at the beginning of a jump, the adumu, which is easy to miss and worth knowing.',
    'The red came from Maasai leso and kanga cloth. The gold strips carry tribal patterning here too.',
  ]},
  { t:'frames', cols:1, items:[ CF('moran-main','Render','The Moran','full cracker \u00b7 red') ]},
  { t:'frames', layout:'row', items:[
    CF('moran-centre','Centre','Warrior and Skyline','centrepiece'),
    CF('moran-gourd','End','Lady With A Gourd','end panel'),
    CF('moran-jump','End','The Beginning Of A Jump','adumu'),
  ]},

  { t:'head', num:'04', title:'', accent:'Malkia' },
  { t:'prose', body:[
    'Malkia means queen. The design came out of rewatching Black Panther after many years, but what it settled into was a question about African identity.',
    'Purple and gold throughout. The woman holds a spear and wears not only the gold ornament that marks her standing but an African crown. A leopard sits behind her as homage to the film, and the tribal patterning in the background mirrors the visual language that film built its own artwork from.',
    'Then the masks on the ends, which are the part of this design that is actually about something. They are West African masks, and they are being held on. Hands press them onto the faces beneath. That is the psychology of people wearing a mask to hide who they really are, and it came directly out of where my head was at the time, questioning identity and working through imposter syndrome. It is the most personal thing in the whole set, sitting on a party favour.',
    'On the finale render there is also a buffalo and a lion, carrying African wildlife heritage into the same frame.',
  ]},
  { t:'frames', cols:1, items:[ CF('malkia-main','Render','Malkia','full cracker \u00b7 purple') ]},
  { t:'frames', layout:'row', items:[
    CF('malkia-centre','Centre','The Queen and The Leopard','centrepiece'),
    CF('malkia-mask-1','End','Mask, Held On','West African mask'),
    CF('malkia-mask-2','End','Mask, Held On','West African mask'),
  ]},

  { t:'head', num:'05', title:'', accent:'Afterword' },
  { t:'prose', body:[
    'The three names sit together on purpose. Binti Afrika is Lady Africa, the land and what it yields. The Moran is the young Maasai warrior, carrying where he is from into somewhere that is not. Malkia is the queen, and the question of who you are when nobody is looking.',
    'They are small objects that get pulled apart and thrown away in a second. That is exactly why the detail is in them.',
  ]},
];

/* ── Christmas set · four crackers, two designed by Daniel Ngatia ── */
const XMAS_BLOCKS = [
  { t:'head', num:'01', title:'The', accent:'Set' },
  { t:'prose', body:[
    'Four Christmas crackers, made as one collection. Two of the designs are mine, The Savannah Mirror and Wafalme Kijani. The other two, Africa Asili and Nyimbo Halua, were designed by my friend and colleague Daniel Ngatia, and I had the privilege of building and rendering their 3D crackers.',
    'The set runs on the same idea as the New Year crackers: a festive object whose pattern language starts in Africa rather than borrowing a European one wholesale. Here the brief was narrower, because Christmas carries its own fixed vocabulary. Wreaths, baubles, stockings, snow, a sled. The work was in finding the African equivalent of each of those without losing the season.',
  ]},
  { t:'frames', cols:1, items:[ XF('bg','Set','The Four Christmas Crackers','flat artwork · all four designs') ]},
  { t:'prose', body:[
    'Each cracker carries three panels along its length, the two ends mirroring each other around a centrepiece that appears once. That is the same structure as the New Year set, and it holds across all four designs here.',
    'The artwork was drawn in Illustrator. From the exported designs I built the metallic and roughness maps, then took the whole set into Maya for the visualizations, so the foil bands, the gloss on the printed panels and the matt of the crimped ends read as different materials rather than one flat wrap.',
  ]},

  { t:'head', num:'02', title:'The Savannah', accent:'Mirror' },
  { t:'prose', body:[
    'The name comes from the centrepiece: a circular mirror holding an African savannah with African wildlife inside it. That was never just a picture. The artwork was made at a time of great personal reflection, and the mirror is the piece carrying it.',
    'The design had to do two things at once. Embrace Africa, and still read as Christmas, while holding together as an aesthetic object in its own right. That is where the Santa symbolism comes in, except the sled is not pulled by reindeer. It is pulled by wildebeest and giraffes.',
    'The patterns are referenced from other African patterns, fabric and clothing patterns above all, which is why the borders behave like printed cloth rather than like ornament added on top.',
  ]},
  { t:'frames', cols:1, items:[ XF('sm-main','Render','The Savannah Mirror','full cracker · midnight blue') ]},
  { t:'frames', layout:'row', items:[
    XF('sm-mirror','Centre','The Mirror','savannah and wildlife'),
    XF('sm-sled','End','The Sled','Santa, carried African'),
    XF('sm-wildebeest','End','Wildebeest In Flight','end panel'),
    XF('sm-giraffes','End','Giraffes In Flight','end panel'),
    XF('sm-sled-giraffe','Panel','Sled And Giraffe','gold on blue'),
    XF('sm-wildebeest-pair','Panel','The Pair','gold on blue'),
  ]},

  { t:'head', num:'03', title:'Wafalme', accent:'Kijani' },
  { t:'prose', body:[
    'Wafalme Kijani translates as green kings, and the kings are the Big Five. Getting Kenya’s big five around the centrepiece was the whole aim, and the way in was the bauble. A bauble is already a Christmas object, so putting each animal inside one let the wildlife arrive without an argument.',
    'The Santa concept carries over from The Savannah Mirror, sled and all, still pulled by wildebeest and giraffes.',
    'Green is the base colour, which forced a decision on the plant illustrations. African plants drawn in green on a green cracker disappear, so they are drawn in other vibrant colours instead, and the tribal patterning is pushed out to the edges where it can hold its own.',
    'The Christmas tree is the clearest swap in the set. Convention wants a conifer. I used a baobab, because that is what the tree looks like where I am from.',
    'The gold bands carry their own illustrations, small pieces of common Christmas symbolism worked into the foil rather than printed over it.',
  ]},
  { t:'frames', cols:1, items:[ XF('wk-main','Render','Wafalme Kijani','full cracker · green') ]},
  { t:'frames', layout:'row', items:[
    XF('wk-baobab-centre','Centre','The Baobab','the tree, made African'),
    XF('wk-lion','Bauble','Lion','the Big Five'),
    XF('wk-buffalo','Bauble','Buffalo','the Big Five'),
    XF('wk-elephant','Bauble','Elephant','the Big Five'),
    XF('wk-rhino-leopard','Bauble','Rhino and Leopard','the Big Five'),
    XF('wk-baobab-bauble','Bauble','Baobab','bauble panel'),
    XF('wk-sled','End','The Sled','gold on green'),
    XF('wk-giraffes','End','Giraffes','gold on green'),
    XF('wk-wildebeest','End','Wildebeest','gold on green'),
  ]},

  { t:'head', num:'04', title:'Africa', accent:'Asili' },
  { t:'prose', body:[
    { parts:[
      'Africa Asili was designed by ',
      DANIEL,
      ', a friend and colleague. The artwork is his, so the thinking behind it is his to tell rather than mine to summarise.',
    ]},
    'What I can speak to is the build. I had the privilege of modelling and rendering the 3D cracker from his design, carrying the same material treatment used across the rest of the set so the four read as one collection: foil bands, printed panels and matt crimped ends all behaving as separate surfaces under the same light.',
  ]},
  { t:'callout', title:'Design by Daniel Ngatia', body:{ parts:[
    'The Africa Asili and Nyimbo Halua designs are the work of ',
    DANIEL,
    '. My role on both was the 3D model and the render.',
  ]}},
  { t:'frames', cols:1, items:[ XF('aa-main','Render','Africa Asili','full cracker · olive green') ]},
  { t:'frames', layout:'row', items:[
    XF('aa-savannah','Centre','The Savannah','centrepiece panel'),
    XF('aa-lion','Panel','Lion','wreath panel'),
    XF('aa-leopard','Panel','Leopard','wreath panel'),
    XF('aa-buffalo','Panel','Buffalo','wreath panel'),
    XF('aa-rhino','Panel','Rhino','wreath panel'),
    XF('aa-baobab','Panel','The Baobab','end panel'),
    XF('aa-baobab-night','Panel','Baobab At Night','end panel'),
  ]},

  { t:'head', num:'05', title:'Nyimbo', accent:'Halua' },
  { t:'prose', body:[
    { parts:[
      'Nyimbo Halua is the fourth in the collection and also a ',
      DANIEL,
      ' design. Again, the account of the artwork belongs to him.',
    ]},
    'It is the only one in the set that leaves the green and blue behind for black and gold, which made it the most demanding of the four to render. Most of the design reads as metal, and metal only reads as metal when the reflections have something to reflect, so the lighting had to do more work here than on the printed panels of the other three.',
  ]},
  { t:'frames', cols:1, items:[ XF('nh-main','Render','Nyimbo Halua','full cracker · black and gold') ]},
  { t:'frames', layout:'row', items:[
    XF('nh-dancers','Centre','The Dancers','centrepiece panel'),
    XF('nh-djembe','Panel','Djembe','end panel'),
    XF('nh-drum','Panel','Drum','end panel'),
    XF('nh-marimba','Panel','Marimba','end panel'),
    XF('nh-mbira','Panel','Mbira','end panel'),
    XF('nh-kora','Panel','Gourd And Strings','end panel'),
    XF('nh-kora-flute','Panel','Strings And Flute','end panel'),
  ]},

  { t:'head', num:'06', title:'', accent:'Afterword' },
  { t:'prose', body:[
    'Four crackers, two hands, one collection. The pleasure of a set like this is that the designs have to argue with each other a little and still sit on the same table, which is why the structure, the material treatment and the lighting stay constant across all four while the colour and the subject change completely.',
    'They are small objects that get pulled apart in a second. That is still exactly why the detail is in them.',
  ]},
];

export const ILLUSTRATION_BLOGS = [
  {
    slug: 'christmas-crackers',
    name: 'Christmas Crackers',
    epithet: 'Savannah Mirror · Wafalme Kijani · Africa Asili · Nyimbo Halua',
    category: 'Illustration & Product Visualization',
    year: '2026',
    tagline: 'A set of four Christmas crackers built on African pattern, wildlife and instruments, drawn in Illustrator and visualized in Maya. Two designs mine, two by Daniel Ngatia.',
    specs: { software: ['Illustrator', 'Maya', 'Arnold', 'Photoshop'] },
    keywords: ['African Christmas crackers design','Savannah Mirror cracker','Wafalme Kijani cracker','Africa Asili cracker','Nyimbo Halua cracker','African Christmas packaging design','Big Five Christmas design','baobab Christmas tree illustration','Illustrator packaging design','Maya product visualization','Christmas cracker design Kenya','African tribal pattern packaging'],
    thumb: '/xmas-crackers/thumb.jpg',
    hero: '/xmas-crackers/opening.jpg',
    heroBg: '/xmas-crackers/bg.jpg',
    outro: '/xmas-crackers/finale.jpg',
    blocks: XMAS_BLOCKS,
  },
  {
    slug: 'new-year-crackers',
    name: 'New Year Crackers',
    epithet: 'Binti Afrika \u00b7 The Moran \u00b7 Malkia',
    category: 'Illustration & Product Visualization',
    year: '2026',
    tagline: 'Three festive crackers designed from African pattern outward, drawn in Illustrator and visualized in Maya.',
    specs: { software: ['Illustrator', 'Maya', 'Arnold', 'Photoshop'] },
    keywords: ['African New Year crackers design','Binti Afrika cracker','The Moran cracker','Malkia cracker','African pattern packaging design','Illustrator packaging design','Maya product visualization','festive cracker design Kenya'],
    thumb: '/crackers/thumb.jpg',
    hero: '/crackers/opening.jpg',
    heroBg: '/crackers/bg.jpg',
    outro: '/crackers/finale.jpg',
    blocks: CRACKER_BLOCKS,
  },
];

export const getIllustrationBlog = (slug) =>
  ILLUSTRATION_BLOGS.find((b) => b.slug === slug) || null;
