/* ── Illustration breakdowns. Same block vocabulary as the character blogs. ── */

const C = (n) => `/crackers/${n}.jpg`;
const CF = (n, tag, label, spec) => ({ src: C(n), tag, label, spec });

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

export const ILLUSTRATION_BLOGS = [
  {
    slug: 'new-year-crackers',
    name: 'New Year Crackers',
    epithet: 'Binti Afrika \u00b7 The Moran \u00b7 Malkia',
    category: 'Illustration & Product Visualization',
    year: '2026',
    tagline: 'Three festive crackers designed from African pattern outward, drawn in Illustrator and visualized in Maya.',
    specs: { software: ['Illustrator', 'Maya', 'Arnold', 'Photoshop'] },
    thumb: '/crackers/thumb.jpg',
    hero: '/crackers/opening.jpg',
    heroBg: '/crackers/bg.jpg',
    outro: '/crackers/finale.jpg',
    blocks: CRACKER_BLOCKS,
  },
];

export const getIllustrationBlog = (slug) =>
  ILLUSTRATION_BLOGS.find((b) => b.slug === slug) || null;
