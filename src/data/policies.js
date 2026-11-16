/* ─────────────────────────────────────────────────────────────
   SITE POLICIES · Terms, Privacy, Copyright, Cookies, Rights & Use,
   No AI Use. One entry per page, rendered by src/pages/PolicyPage.jsx
   and registered for search in src/seo/pages.js.

   Block vocabulary, kept deliberately small:
     { t:'p',  body }                    paragraph (string, or {parts:[…]})
     { t:'h',  text }                    sub-heading
     { t:'ul' | 'ol', items:[…] }        list
     { t:'table', head:[…], rows:[[…]] } table
     { t:'quote', title, body }          the notice blocks
   A paragraph part is a string or { text, href } for an inline link.

   Keep this text in step with what the site actually does. If the site
   starts collecting something new, or stops, the wording changes here.
   ───────────────────────────────────────────────────────────── */

export const POLICY_EMAIL = 'emmanuelchege777@gmail.com';
export const POLICY_UPDATED = '10 November 2026';
export const POLICY_YEAR = '2026';

const mail = (text = POLICY_EMAIL) => ({ text, href: `mailto:${POLICY_EMAIL}` });
const CREDIT = 'Emmanuel Chege · emmanuelchege.com';

/* ── 1 · TERMS OF USE ──────────────────────────────── */
const TERMS = [
  { t:'h', text:'1. Who we are' },
  { t:'p', body:'This website is owned and run by Emmanuel Chege, a 3D generalist and motion graphics artist based in Nairobi, Kenya ("I", "me", "my"). By using the site you agree to these terms. If you do not agree, please do not use the site.' },

  { t:'h', text:'2. What the site is for' },
  { t:'p', body:'The site shows my portfolio and lets you contact me about commissions, collaborations and roles. Nothing on the site is an offer to sell; any work we do together is agreed in a separate written agreement.' },

  { t:'h', text:'3. Ownership of the content' },
  { t:'p', body:'All artwork, 3D renders, drawings, illustrations, videos, breakdowns, text and design on this site are my original work, or are used with permission, and are protected by the Copyright Act of Kenya and international copyright treaties. Some works were made for clients. Brand names, logos and products shown in that work belong to their owners and appear only to show my role in the project.' },

  { t:'h', text:'4. What you may do' },
  { t:'p', body:`You may view the site, and share links to its pages, for personal and non-commercial purposes. You may share a single image on social media or in an article if you credit "${CREDIT}" and link back to the page it came from.` },

  { t:'h', text:'5. What you may not do without my written permission' },
  { t:'ul', items:[
    'download, copy, reproduce, print, sell or license any work on the site;',
    'edit, crop out credits, recolour or otherwise alter my work, or present it as your own;',
    'use my work, my name or my likeness to advertise or endorse anything;',
    'use my work, in whole or in part, to train, fine-tune or prompt any artificial intelligence or machine learning system, or to create a dataset;',
    'scrape or harvest content from the site with automated tools;',
    'use the site in a way that breaks the law, harms the site, or interferes with other visitors.',
  ]},

  { t:'h', text:'6. Licensing requests' },
  { t:'p', body:{ parts:[
    'To use any work beyond section 4, email ', mail(),
    ' with the work, the intended use, and the duration. A licence exists only once I confirm it in writing.',
  ]}},

  { t:'h', text:'7. Third-party services and links' },
  { t:'p', body:'The site embeds videos from YouTube, loads some images from Google Drive, and links to ArtStation, Instagram, TikTok, LinkedIn and WhatsApp. Those services have their own terms and privacy policies, and I am not responsible for their content or practices.' },

  { t:'h', text:'8. No warranty' },
  { t:'p', body:'The site is provided as it is. I try to keep it accurate and available but do not promise it will be error-free or always online.' },

  { t:'h', text:'9. Limit of liability' },
  { t:'p', body:'To the extent allowed by law, I am not liable for any loss arising from your use of the site or from relying on its content.' },

  { t:'h', text:'10. Reporting misuse' },
  { t:'p', body:{ parts:['If you see my work used without credit or permission, please tell me at ', mail(), '.'] }},

  { t:'h', text:'11. Changes' },
  { t:'p', body:'I may update these terms. The date at the top shows the latest version, and continued use of the site means you accept the updated terms.' },

  { t:'h', text:'12. Law and disputes' },
  { t:'p', body:'These terms are governed by the laws of Kenya. Any dispute will be handled by the courts of Kenya, after we have first tried to resolve it in good faith.' },

  { t:'h', text:'13. Contact' },
  { t:'p', body:{ parts:['Emmanuel Chege, Nairobi, Kenya · ', mail()] }},
];

/* ── 2 · PRIVACY POLICY ────────────────────────────── */
const PRIVACY = [
  { t:'h', text:'1. Who is responsible' },
  { t:'p', body:{ parts:[
    'Emmanuel Chege, Nairobi, Kenya, is the data controller for this website. Contact: ', mail(), '.',
  ]}},

  { t:'h', text:'2. What I collect and why' },
  { t:'table',
    head:['Data', 'How it is collected', 'Why', 'Legal basis'],
    rows:[
      ['Pages visited, time on page, device and browser type, approximate location (city or country), referring site',
       'Google Analytics cookies',
       'To understand which work people view and improve the site',
       'Legitimate interest. You can block or delete these cookies in your browser at any time'],
      ['Your name, email, company, chosen service and project brief',
       'You send it by email or WhatsApp using the contact page; the site itself does not store it',
       'To reply and discuss your project',
       'Your request / steps before a contract'],
      ['Your phone number and messages',
       'When you message me on WhatsApp',
       'To reply',
       'Your request'],
      ['Basic technical logs (IP address, time, page requested)',
       'Kept briefly by the hosting provider for security',
       'To keep the site secure and working',
       'Legitimate interest'],
    ]},
  { t:'p', body:'I do not sell your data, use it for advertising, or collect sensitive personal data.' },

  { t:'h', text:'3. Third parties who process data for the site' },
  { t:'ul', items:[
    'Google Analytics (Google LLC): visitor statistics.',
    'YouTube (Google LLC): embedded reels and videos; YouTube may set its own cookies when you play a video.',
    'Google Drive: some images are loaded from it.',
    'Vercel Inc.: website hosting.',
    'WhatsApp (Meta) and your email provider: only when you choose to contact me. These companies may store data outside Kenya, including in the United States. They are bound by their own privacy commitments and safeguards for international transfers.',
  ]},

  { t:'h', text:'4. How long I keep it' },
  { t:'p', body:'Analytics data: 14 months, then deleted automatically by Google. Enquiries and messages: as long as needed to handle your request, and up to 2 years after our last contact, unless we work together, in which case project records are kept as required for tax and contract purposes.' },

  { t:'h', text:'5. Your rights' },
  { t:'p', body:{ parts:[
    'Under the Data Protection Act 2019 you have the right to be told how your data is used, to see the data I hold about you, to have it corrected or deleted, to object to its use, to withdraw consent at any time, and to receive it in a portable form. Email ', mail(),
    ' and I will respond within 14 days. If you are not satisfied, you can complain to the Office of the Data Protection Commissioner (',
    { text:'odpc.go.ke', href:'https://www.odpc.go.ke' }, ').',
  ]}},

  { t:'h', text:'6. Cookies' },
  { t:'p', body:{ parts:[
    'See the ', { text:'Cookie Notice', href:'/cookie-notice' },
    ' for the full list. Your browser settings are the control: you can block or delete cookies there at any time, and the site works fully without them.',
  ]}},

  { t:'h', text:'7. Security' },
  { t:'p', body:'The site runs over HTTPS and stores no form submissions. My phone number is not shown on the site.' },

  { t:'h', text:'8. Children' },
  { t:'p', body:'The site is not aimed at children under 18, and I do not knowingly collect their data.' },

  { t:'h', text:'9. Changes' },
  { t:'p', body:'I will update the date above when this policy changes.' },
];

/* ── 3 · COPYRIGHT & IMAGE USE ─────────────────────── */
const COPYRIGHT = [
  { t:'p', body:'Every render, drawing, illustration, animation, video and breakdown on this site is the original work of Emmanuel Chege, unless stated otherwise, and is protected by copyright in Kenya and internationally.' },

  { t:'h', text:'You are welcome to' },
  { t:'ul', items:[
    'share a link to any page;',
    `share one image on social media or in an article, unedited, with the credit "${CREDIT}" and a link to the page;`,
    'reference my work for personal study, with credit.',
  ]},

  { t:'h', text:'Please ask first before you' },
  { t:'ul', items:[
    'use any work in a commercial project, advertisement, print, merchandise or NFT;',
    'edit, crop, combine or remix my work;',
    'use a character design, likeness or style study as the basis for your own work;',
    'use any of my work to train, fine-tune or prompt an AI model, or include it in a dataset.',
  ]},

  { t:'h', text:'Client work' },
  { t:'p', body:'Some pieces were made for clients and show their brands. Those brands belong to their owners. Licensing for client pieces may need the client’s approval.' },

  { t:'h', text:'Licensing' },
  { t:'p', body:{ parts:[
    'Email ', mail(), ' with the work, how you want to use it, where, and for how long. I usually reply within 3 working days.',
  ]}},

  { t:'h', text:'Seen my work used without credit?' },
  { t:'p', body:{ parts:['Thank you for telling me at ', mail(), '.'] }},
];

/* ── 4 · COOKIE NOTICE ─────────────────────────────── */
const COOKIES = [
  { t:'p', body:'Cookies are small files a website stores in your browser. This site uses very few, and none of them identify you personally.' },
  { t:'table',
    head:['Name', 'Set by', 'Purpose', 'Kept for'],
    rows:[
      ['Back-button memory (ec:back, browser storage)', 'This site',
       'Returns you to the Work section when you go back', 'Until you close the tab'],
      ['_ga, _ga_[ID]', 'Google Analytics',
       'Counts visits and pages viewed, anonymously', 'Up to 2 years'],
      ['YouTube cookies', 'YouTube (Google)',
       'Set only when you play an embedded video', 'Set by YouTube'],
    ]},

  { t:'h', text:'Your choice' },
  { t:'p', body:'You can block or delete cookies in your browser settings, or use a private window. The site works fully without analytics cookies: nothing on it is hidden behind them.' },

  { t:'p', body:{ parts:[
    'More detail is in the ', { text:'Privacy Policy', href:'/privacy-policy' },
    '. Questions: ', mail(), '.',
  ]}},
];

/* ── 5 · RIGHTS & USE ──────────────────────────────── */
const RIGHTS = [
  { t:'p', body:'Not every piece on this site sits under the same rights. Three notices cover the work the Rights and Policies links appear on. Where a page carries none of them, no licence is offered or implied, and the brands shown belong to their owners.' },

  { t:'quote', title:'Work I own',
    body:`All characters, renders, drawings and breakdowns on these pages are original works by Emmanuel Chege, © ${POLICY_YEAR}. All rights reserved. You may share a link, or one unedited image with the credit "${CREDIT}". Any other use, including commercial use, editing, merchandise or fan reproductions of these characters, needs my written permission. Licensing: ${POLICY_EMAIL}.` },

  { t:'quote', title:'Collaborations and shared commissions',
    body:`Some visualizations were created by Emmanuel Chege with or for a partner, and the copyright is shared or held by that partner, © ${POLICY_YEAR}. They are shown here as part of my portfolio. They may not be copied, reused or edited without written permission from the owners. Enquiries: ${POLICY_EMAIL}.` },

  { t:'quote', title:'Renders of third-party brands',
    body:`Where a visualization is a personal study of a vehicle, product or property, the render is © ${POLICY_YEAR} Emmanuel Chege, but the designs, names and logos shown are trademarks and property of their owners. Those pieces are not official works and are not sponsored or endorsed by the brands shown. They may not be reused or redistributed.` },

  { t:'h', text:'Copyright term in Kenya' },
  { t:'p', body:'Artistic works such as drawings and 3D renders are protected for my lifetime plus 50 years. Photographs and audiovisual works such as the reels last 50 years from creation or first publication, whichever is later.' },

  { t:'p', body:{ parts:[
    'The ', { text:'No AI Use', href:'/no-ai-use' }, ' reservation applies on top of all three notices, on every page of this site. Full terms are in the ',
    { text:'Terms of Use', href:'/terms-of-use' }, ' and the ',
    { text:'Copyright & Image Use', href:'/copyright-image-use' }, ' notice.',
  ]}},
];

/* ── 6 · NO AI USE ─────────────────────────────────── */
const NO_AI = [
  { t:'quote', title:'No AI use',
    body:'No permission is given to use any work on this site, in whole or in part, to train, fine-tune, test or prompt any artificial intelligence or machine learning system, to build a dataset, or to generate imitations of it, without the prior written consent of the rights holder. Automated scraping of this site is not permitted. This is an express reservation of rights against text and data mining.' },

  { t:'p', body:'This reservation applies to every page of emmanuelchege.com and to every image, video, drawing, render and written breakdown on it. It applies whoever holds the copyright in a given piece, because it says only that no permission is given through this website, which is true in every case.' },

  { t:'h', text:'What backs this up technically' },
  { t:'ul', items:[
    'robots.txt asks the AI crawlers that publish a user agent, including GPTBot, ClaudeBot, CCBot, Google-Extended, PerplexityBot, Bytespider, Amazonbot, Applebot-Extended, Meta-ExternalAgent, Diffbot, Omgili, Timpibot and ImagesiftBot, to stay out.',
    'Every page carries a noai, noimageai robots directive, and a text-and-data-mining reservation in its metadata.',
    'Right-click and drag saving are disabled on the artwork. That slows casual copying; it is not a lock, and it is not meant to be one.',
  ]},
  { t:'p', body:'The major AI companies honour the crawler rules. Not every scraper does. The written reservation above is what the rules point at, and it is what matters in a dispute.' },

  { t:'h', text:'Search and answer engines' },
  { t:'p', body:'Search crawlers and answer engines that cite their sources are welcome. Indexing this site, quoting from it and linking back to it is not AI training, and nothing here asks them to stop.' },

  { t:'h', text:'Permission' },
  { t:'p', body:{ parts:[
    'If you want to use any of this work with an AI system, ask first: ', mail(),
    '. A permission exists only once I confirm it in writing.',
  ]}},
];

/* ── registry ──────────────────────────────────────── */
export const POLICIES = [
  { slug:'terms-of-use', label:'Terms of Use', title:'Terms of', accent:'Use',
    lede:'The rules for using this site and the work on it.', dated:true, blocks:TERMS },
  { slug:'privacy-policy', label:'Privacy Policy', title:'Privacy', accent:'Policy',
    lede:'What this site collects, why, and what you can ask me to do about it.', dated:true, blocks:PRIVACY },
  { slug:'copyright-image-use', label:'Copyright & Image Use', title:'Copyright &', accent:'Image Use',
    lede:'What you may do with the artwork on this site, and what needs permission first.', dated:true, blocks:COPYRIGHT },
  { slug:'cookie-notice', label:'Cookie Notice', title:'Cookie', accent:'Notice',
    lede:'The few cookies this site uses, and how to turn them off.', dated:true, blocks:COOKIES },
  { slug:'rights-and-use', label:'Rights & Use', title:'Rights &', accent:'Use',
    lede:'Who owns what on the project pages, and the terms each piece is shown under.', dated:true, blocks:RIGHTS },
  { slug:'no-ai-use', label:'No AI Use', title:'No AI', accent:'Use',
    lede:'An express reservation of rights against AI training and text and data mining.', dated:true, blocks:NO_AI },
];

export const getPolicy = (slug) => POLICIES.find(p => p.slug === slug) || null;

/* The footnote links shown at the bottom of the project pages that carry
   rights language. Order is the order they appear in the footnote. */
export const POLICY_FOOTER_LINKS = [
  'terms-of-use', 'privacy-policy', 'copyright-image-use',
  'cookie-notice', 'rights-and-use', 'no-ai-use',
].map(slug => POLICIES.find(p => p.slug === slug));
