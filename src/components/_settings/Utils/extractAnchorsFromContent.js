/* eslint-disable array-callback-return */
import parse from 'html-react-parser';

const extractTitleForAnchors = (ctx) => {
  let title = '';

  const getTitle = (s) => {
    if (s) {
      if (typeof s === 'string') {
        title += s;
      } if (Array.isArray(s)) {
        s.map((v) => getTitle(v?.props?.children || v));
      } else {
        getTitle(s?.props?.children);
      }
    }
  };

  getTitle(ctx?.props?.children || ctx);

  return title;
};

const extractAnchorsFromContent = (content) => {
  try {
    if (typeof content !== 'string') return [];
    const subtitles = parse(content).filter((c) => c.type === 'h2' || c.type === 'h3');

    let anchors = {};
    subtitles.map((sub, key) => {
      const title = extractTitleForAnchors(sub);
      anchors = {
        ...anchors,
        ...{
          [`title${key}`]: {
            title,
            ref: `refTitle${key}`
          }
        }
      };
    });
    return anchors;
  } catch (error) {
    return [];
  }
};

export {
  extractTitleForAnchors,
  extractAnchorsFromContent
};
