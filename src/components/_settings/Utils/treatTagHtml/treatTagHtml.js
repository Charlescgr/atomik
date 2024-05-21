/* eslint-disable no-plusplus */
/* eslint-disable consistent-return */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable linebreak-style */
/* eslint-disable no-restricted-syntax */
/* eslint-disable camelcase */
import React from 'react';
import parse from 'html-react-parser';
import ReactDOMServer from 'react-dom/server';
import omit from 'object.omit';
import { v4 as uuidv4 } from 'uuid';
import { useAmp } from 'next/amp';
import map from '@charlescgr/underline/dist/map';

import htmlTags from './htmlTags';

/**
 * Render HTML as React components
 * @param text
 * @returns {*}
 * @constructor
 */
const treatTagHtml = (text, withoutElement = []) => {
  try {
    // Parse HTML
    const htmlElementsParsed = parse(text);
    const isAmp = useAmp();

    const handleAmpErrors = (propsBlacklist, ctx) => {
      try {
        if (!isAmp) return propsBlacklist;
        propsBlacklist.push('xmlLang');
        propsBlacklist.push('lang');
        if (ctx.type === 'a' && ctx?.props?.href) {
          const propsWhitelist = ['href', 'referrerpolicy', 'rel', 'target'];
          if (ctx.props.target !== '_blank') {
            propsBlacklist.push('target');
          }
          const deniedProps = omit(ctx.props, propsWhitelist);
          propsBlacklist = propsBlacklist.concat(Object.keys(deniedProps));
        }
        return propsBlacklist;
      } catch (error) {
        return propsBlacklist;
      }
    };

    const renderHtmlReact = (ctx) => {
      try {
        if (typeof (ctx) === 'object' && ctx?.type && ctx?.props?.children && !htmlTags.includes(ctx?.type)) {
          return renderHtmlReact(ctx?.props?.children);
        }

        if (typeof (ctx) === 'object' && ctx?.type && !htmlTags.includes(ctx?.type)) {
          return null;
        }

        if (typeof (ctx) === 'object' && withoutElement.includes(ctx?.type) && ctx?.props?.children) {
          return renderHtmlReact(ctx?.props?.children);
        }

        if (typeof (ctx) === 'object' && ctx?.type && ctx?.props?.children) {
          const HtmlTag = `${ctx.type}`;
          let propsBlacklist = ['children', 'type', 'style'];
          propsBlacklist = handleAmpErrors(propsBlacklist, ctx);
          const allowedProps = omit(ctx?.props, propsBlacklist);

          return (
            <HtmlTag key={uuidv4()} {...allowedProps}>
              {ctx?.props && ctx?.props?.children && renderHtmlReact(ctx?.props?.children)}
            </HtmlTag>
          );
        }

        if (Array.isArray(ctx)) return map(ctx, (el) => renderHtmlReact(el));
      } catch (error) {
        return ctx;
      }
      return ctx;
    };

    const htmlParsed = renderHtmlReact(htmlElementsParsed);

    return ReactDOMServer.renderToString(htmlParsed);
  } catch (error) {
    return text;
  }
};

export default treatTagHtml;
