import parse from 'html-react-parser';
import { validateIf, countWordsFromNode } from './countWordsFromNode';

/**
 * Return read time by html text
 * @param text
 * @param wordsPerMinute
 * @returns {object}
 * @constructor
 */
export default function readTime(text, wordsPerMinute = 200) {
  let amountOfWords = 0;

  try {
    const htmlInReact = parse(text);

    htmlInReact.forEach((node) => {
      if (validateIf(node).isObject) {
        amountOfWords += countWordsFromNode(node);
      }
    });

    return {
      words: amountOfWords,
      minutes: Math.round(amountOfWords / wordsPerMinute)
    };
  } catch (error) {
    return {
      words: 0,
      minutes: 0
    };
  }
}
