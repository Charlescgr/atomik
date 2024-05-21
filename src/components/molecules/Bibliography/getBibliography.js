/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable array-callback-return */
import parse from 'html-react-parser';
import map from '@charlescgr/underline/dist/map';

import treatTagHtml from '../../_settings/Utils/treatTagHtml';

/**
 * Return bibliografy array by html text
 * @param text
 * @returns {array}
 * @constructor
 */

const getBibliography = (text) => {
  const urlToAnchors = (html) => {
    const urlRegex = /(https?:\/\/[^\s"'<&]+)/g;
    return html?.replace(/<a[^>]*>|<\/a[^>]*>/g, '')?.replace(urlRegex, '<a href="$1">$1</a>');
  };
  // Parse HTML
  const treatHtml = (html) => {
    const htmlInReact = parse(urlToAnchors(html?.replace('<img />', '')));
    if (Array.isArray(htmlInReact)) {
      const elList = [];
      map(htmlInReact, (el) => {
        if (typeof (el) === 'object' && el.type === 'ul') {
          if (!Array.isArray(el?.props?.children)) {
            elList.push(el?.props?.children);
          } else {
            el?.props?.children?.filter((v) => v?.props?.children || typeof (v) === 'object').map((v) => {
              if (v?.props?.children) {
                elList.push(v?.props?.children);
              } else {
                elList.push(v);
              }
            });
          }
        } else {
          elList.push(el);
        }
      });
      return elList;
    } if (typeof (htmlInReact) === 'object' && ['ul', 'ol'].includes(htmlInReact?.type)) {
      return !Array.isArray(htmlInReact?.props?.children) ? [htmlInReact?.props?.children] : htmlInReact?.props?.children?.filter((v) => v?.props?.children).map((v) => v?.props?.children);
    } if (typeof (htmlInReact) === 'object' && !['ul', 'ol'].includes(htmlInReact?.type)) {
      return [htmlInReact];
    }
    return [html];
  };

  return treatHtml(treatTagHtml(text, ['a'])).filter((v) => v !== null && ((typeof (v) === 'string' && v.length > 3) || typeof (v) === 'object'));
};

export default getBibliography;
