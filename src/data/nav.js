/* Site sections. NAV_LINKS is the full flat list, shared by the prerendered
   HTML (src/seo/pages.js, scripts/generate-share-pages.js) and the 404 page,
   so crawlers see every link visitors can reach. The visible nav (<Nav/>)
   groups the eight work sections under a "Work" dropdown (WORK_LINKS). */
export const WORK_LINKS = [
  { to:'/characters',   label:'3D Characters'},
  { to:'/events',       label:'Event Videos' },
  { to:'/projection',   label:'Projection'   },
  { to:'/visualization',label:'Visualization'},
  { to:'/hologram',     label:'Hologram'     },
  { to:'/drone-shows',  label:'Drone Shows'  },
  { to:'/drawings-illustrations', label:'Drawings & Illustrations', short:'Drawings' },
  { to:'/social',       label:'Social'       },
];

export const NAV_LINKS = [
  { to:'/',             label:'Home'         },
  { to:'/showreel',     label:'Showreel'     },
  ...WORK_LINKS.map(({ to, label }) => ({ to, label })),
  { to:'/contact',      label:'Contact'      },
];
