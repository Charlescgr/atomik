/* eslint-disable linebreak-style */

const list = [
  { a: '&lt;', b: '<' },
  { a: '&#060;', b: '<' },
  { a: '&gt;', b: '>' },
  { a: '&#062;', b: '>' },
  { a: '&amp;', b: '&' },
  { a: '&#038;', b: '&' },
  { a: '&#x26;', b: '&' },
  { a: '/&#0*39;/', b: '&#039;' },
  { a: '/&#x0*27;/i', b: '&#x27;' },
  { a: '/&#0*60;/', b: '&#060;' },
  { a: '/&#0*62;/', b: '&#062;' },
  { a: '/&#0*38;/', b: '&#038;' },
  { a: '/&#x0*26;/i', b: '&#x26;' },
  { a: '&quot;', b: '"' },
  { a: '&#034;', b: '"' },
  { a: '&#x22;', b: '"' },
  { a: '&#x27;', b: "'" },
  { a: '&#039;', b: "'" },
  { a: '&mdash;', b: '–' },
  { a: '&amp;mdash;', b: '–' },
  { a: '&#8211;', b: '-' },
  { a: '\u00e9', b: 'é' },
  { a: '&hellip;', b: '...' },
  { a: '%', b: '' }
];

export function fixCharsString(value) {
  // eslint-disable-next-line array-callback-return
  list.map((l) => {
    value = value?.replace(new RegExp(l.a, 'g'), l.b);
  });

  return value;
}
