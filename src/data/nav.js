/* Site sections, in nav order. Shared by <Nav/> and the prerendered
   HTML (src/seo/pages.js) so crawlers see the same links visitors do. */
export const NAV_LINKS = [
  { to:'/',             label:'Home'         },
  { to:'/characters',   label:'3D Characters'},
  { to:'/events',       label:'Event Videos' },
  { to:'/projection',   label:'Projection'   },
  { to:'/visualization',label:'Visualization'},
  { to:'/hologram',     label:'Hologram'     },
  { to:'/drawings-illustrations', label:'Drawings & Illustrations' },
  { to:'/social',       label:'Social'       },
  { to:'/drone-shows',  label:'Drone Shows'  },
  { to:'/contact',      label:'About'        },
];
