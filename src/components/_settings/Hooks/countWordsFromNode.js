export function validateIf(item) {
  const isString = typeof item === 'string';
  const isArray = Array.isArray(item);
  const isObject = typeof item === 'object' && !Array.isArray(item);

  return {
    isString, isArray, isObject
  };
}

function countWords(world = '') {
  const SPACE_REGEX = /\s+/g;
  if (!validateIf(world).isString) return 0;
  return world
    .trim()
    .split(SPACE_REGEX)
    .filter((item) => !SPACE_REGEX.test(item) && item !== '').length;
}

export const countWordsFromNode = (rootNode) => {
  let amountOfWords = 0;

  (function count(node) {
    if (validateIf(node).isString) {
      amountOfWords += countWords(node);
      return;
    }

    if (validateIf(node?.props?.children).isString) {
      amountOfWords += countWords(node?.props?.children);
      return;
    }

    if (validateIf(node?.props?.children).isObject) {
      count(node?.props?.children);
      return;
    }

    if (validateIf(node?.props?.children).isArray) {
      node?.props?.children.forEach((item) => count(item));
    }
  }(rootNode));

  return amountOfWords;
};
