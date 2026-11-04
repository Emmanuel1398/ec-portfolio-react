/* WhatsApp contact without publishing the number.
   The number is never written into the page, the prerendered HTML, the sitemap,
   llms.txt or the structured data. It is stored here in reversed pieces so
   number-harvesting bots scanning the code do not find it as a phone number,
   and it is only assembled in the visitor's browser at the moment they click.
   To change the number, edit WA_PARTS: the number's digits written backwards,
   split into any number of pieces. */
const WA_PARTS = ['2379', '6736', '7452'];

const waNumber = () => WA_PARTS.join('').split('').reverse().join('');

/* Opens a WhatsApp chat (app on phones, WhatsApp Web on desktop), optionally
   with a pre-filled message. */
export function openWhatsApp(text = '') {
  if (typeof window === 'undefined') return;
  const q = text ? `?text=${encodeURIComponent(text)}` : '';
  window.open(`https://wa.me/${waNumber()}${q}`, '_blank', 'noopener,noreferrer');
}
