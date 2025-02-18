export const stringToSlug = (val = '', replaceBy) => {
  replaceBy = replaceBy || '-';
  const caractersMap = {
    a: /[\xE0-\xE6]/g,
    A: /[\xC0-\xC6]/g,
    e: /[\xE8-\xEB]/g,
    E: /[\xC8-\xCB]/g,
    i: /[\xEC-\xEF]/g,
    I: /[\xCC-\xCF]/g,
    o: /[\xF2-\xF6]/g,
    O: /[\xD2-\xD6]/g,
    u: /[\xF9-\xFC]/g,
    U: /[\xD9-\xDC]/g,
    c: /\xE7/g,
    C: /\xC7/g,
    n: /\xF1/g,
    N: /\xD1/g,
  };

  Object.keys(caractersMap).forEach((key) => {
    const regularExpression = caractersMap[key];
    val = val.replace(regularExpression, key);
  });

  val = val.toLowerCase();
  // eslint-disable-next-line no-useless-escape
  val = val.replace(/[^a-z0-9\-]/g, ' ');

  val = val.replace(/ {2,}/g, ' ');

  val = val.trim();
  val = val.replace(/\s/g, replaceBy);

  return val;
};
