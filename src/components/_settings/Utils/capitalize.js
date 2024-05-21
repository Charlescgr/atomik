/**
 * Returns a capitalized string, "some string" -> "Some string"
 * @param {string} string - any string.
 * @returns {string}
 */
export function capitalize(string = '') {
  if (typeof string !== 'string' || !string.trim()) return;

  const newString = string
    .trim()
    .charAt(0)
    .toUpperCase() + string.trim().slice(1);

  return newString;
}
