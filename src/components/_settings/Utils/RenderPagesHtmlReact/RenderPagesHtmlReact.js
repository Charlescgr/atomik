/* eslint-disable react/prop-types */
/* eslint-disable no-plusplus */
/* eslint-disable consistent-return */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable linebreak-style */
/* eslint-disable no-restricted-syntax */
/* eslint-disable camelcase */
import React from 'react';
import { useAmp } from 'next/amp';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import get from '@charlescgr/underline/dist/get';

import map from '@charlescgr/underline/dist/map';
import omit from 'object.omit';
import { v4 as uuid } from 'uuid';
import { extractTitleForAnchors } from '../extractAnchorsFromContent';
import { useTheme } from '../../ThemeProvider/ThemeContext';

import Heading from '../../../atoms/Heading';
import Paragraph from '../../../atoms/Paragraph';
import ContentList from '../../../atoms/ContentList';
import A from '../../../atoms/A';
import { stringToSlug } from '..';
import Span from '../../../atoms/Span';
import Button from '../../../atoms/Button';
import ArticleFigure from '../../../molecules/ArticleFigure';
import Iframe from '../../../atoms/Iframe';

import htmlTags from './htmlTags';

/**
 * Render HTML as React components
 * @param content
 * @param onError
 * @returns {*}
 * @constructor
 */
const RenderPagesHtmlReact = ({
  content, onError
}) => {
  try {
    const isAmp = useAmp();
    const { cdnPath } = useTheme();

    const fixTextForParse = (v) => v.replace(new RegExp(';quot;quot;quot;,times,serif;', 'g'), '');

    // const optionsParse = {};

    const checkIsUrl = (url) => /^(http|https):\/\/[^ "]+$/.test(url);
    // eslint-disable-next-line
    const checkContainsValidUrl = (url) => /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(url);
    const getValidUrl = (url) => url.replace(/"/g, '').split(' ').filter((u) => checkContainsValidUrl(u))[0];
    const checkInvalidHrefAmp = (url) => (checkIsUrl(url) || !isAmp ? url : getValidUrl(url));

    const setPropsValidValues = (props, ctx) => {
      if (props.href) {
        props.href = checkInvalidHrefAmp(props.href);
      }
      if (props.border) {
        props.border = 1;
      }
      if (ctx?.props?.style) {
        for (const [k, v] of Object.entries(ctx.props.style)) {
          if (v.includes('!important')) {
            ctx.props.style[k] = v.replace('!important', '').trim();
          }
        }
      }
    };

    const handleAmpErrors = (propsBlacklist, ctx) => {
      try {
        if (!isAmp) return propsBlacklist;
        propsBlacklist.push('xmlLang');
        if (ctx.type === 'a' && ctx?.props?.href) {
          const propsWhitelist = [
            'href', 'referrerpolicy', 'rel', 'target'
          ];
          if (ctx.props.target !== '_blank') {
            propsBlacklist.push('target');
          }
          const deniedProps = omit(ctx.props, propsWhitelist);
          propsBlacklist = propsBlacklist.concat(Object.keys(deniedProps));
        }
        return propsBlacklist;
      } catch (error) {
        onError(error);
      }
    };

    // Parse HTML with options and return a object with all elements
    const htmlReactParsed = parse(fixTextForParse(content));

    const renderHtmlReact = (ctx) => {
      try {
        if (isAmp) {
          const tagsBlacklist = [
            'script', 'style'
          ];
          if (tagsBlacklist.includes(ctx?.type)) {
            return null;
          }
        }

        if (typeof (ctx) === 'object' && ctx?.type && !htmlTags.includes(ctx?.type)) {
          return map(Object.keys(ctx?.props), (child) => {
            if (child !== 'children') {
              return child.match(/^<[a-z]|[a-z]>$/gi) ? '' : renderHtmlReact(`${child} `);
            }
            return renderHtmlReact(ctx?.props?.children);
          });
        }

        if (
          typeof ctx === 'object'
          && ['form'].includes(ctx?.type)
          && ctx?.props?.children
        ) {
          const propsBlacklist = ['children', 'type', 'id', 'style'];
          const propsBlacklistAmp = ['children', 'type', 'id', 'style', 'action'];
          const allowedProps = omit(ctx?.props, propsBlacklist);
          const allowedPropsAmp = omit(ctx?.props, propsBlacklistAmp);

          if (isAmp) {
            return (
              <form
                {...allowedPropsAmp}
                action-xhr={ctx?.props?.action}
                target="_blank"
              >
                {renderHtmlReact(ctx?.props?.children)}
              </form>
            );
          }
          return (
            <form {...allowedProps}>{renderHtmlReact(ctx?.props?.children)}</form>
          );
        }

        if (typeof (ctx) === 'object' && ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(ctx?.type) && ctx?.props?.children) {
          const propsBlacklist = [
            'children', 'type'
          ];
          const allowedProps = omit(ctx?.props, propsBlacklist);
          const className = {
            h1: 'ptb--normal mb--normal',
            h2: 'pt--normal mb--small',
            h3: 'pt--normal mt--normal'
          };
          return (
            <Heading
              id={stringToSlug(extractTitleForAnchors(ctx))}
              type={ctx.type}
              textColor={`main.${ctx.type !== 'h1' ? '600' : '800'}`}
              className={className[ctx.type] || 'mt--normal'}
              widthHeading
              {...allowedProps}
            >
              { renderHtmlReact(ctx?.props?.children) }
            </Heading>
          );
        }

        if (typeof ctx === 'object' && ['iframe'].includes(ctx?.type)) {
          const propsBlacklist = ['children', 'style'];
          const allowedProps = omit(ctx?.props, propsBlacklist);
          return <Iframe attribs={allowedProps}>{ctx?.props?.children}</Iframe>;
        }

        if (typeof (ctx) === 'object' && ['p'].includes(ctx?.type) && ctx?.props?.children) {
          const propsBlacklist = [
            'children', 'type'
          ];
          const allowedProps = omit(ctx?.props, propsBlacklist);
          return (
            <Paragraph textColor="grey-neutral.800" size="normal" className="ptb--normal" {...allowedProps}>
              { Array.isArray(ctx?.props?.children) ? map(ctx?.props?.children, (el) => renderHtmlReact(el)) : renderHtmlReact(ctx?.props?.children) }
            </Paragraph>
          );
        }

        if (typeof (ctx) === 'object' && ['span'].includes(ctx?.type) && ctx?.props?.children) {
          const propsBlacklist = [
            'children', 'type', 'style'
          ];
          const allowedProps = omit(ctx?.props, propsBlacklist);
          return (
            <Span {...allowedProps}>
              { Array.isArray(ctx?.props?.children) ? map(ctx?.props?.children, (el) => renderHtmlReact(el)) : renderHtmlReact(ctx?.props?.children) }
            </Span>
          );
        }

        if (typeof (ctx) === 'object' && ['a'].includes(ctx?.type) && ctx?.props?.children) {
          if (ctx?.props?.href) {
            const propsBlacklist = [
              'children', 'type', 'style', 'target'
            ];
            const allowedProps = omit(ctx?.props, propsBlacklist);
            return (
              <A to={ctx?.props?.href} textColor="secondary.600" underlineColor="secondary.600" lineType="dotted" target={ctx?.props?.href.indexOf('http') >= 0 ? '_blank' : '_self'} rel={ctx?.props?.rel} externalLink {...allowedProps}>
                { Array.isArray(ctx?.props?.children) ? map(ctx?.props?.children, (el) => renderHtmlReact(el)) : renderHtmlReact(ctx?.props?.children) }
              </A>
            );
          }
          return Array.isArray(ctx?.props?.children) ? map(ctx?.props?.children, (el) => renderHtmlReact(el)) : renderHtmlReact(ctx?.props?.children);
        }

        if (typeof (ctx) === 'object' && ['ul', 'ol'].includes(ctx?.type) && ctx?.props?.children) {
          return (
            <ContentList type={ctx?.type} className="lst--disc mlr--x-big mtb--normal c--main-800 ff--serif lh--1-8">
              { Array.isArray(ctx?.props?.children) ? map(ctx?.props?.children, (el) => renderHtmlReact(el)) : renderHtmlReact(ctx?.props?.children) }
            </ContentList>
          );
        }

        if (typeof (ctx) === 'object' && ['li'].includes(ctx?.type) && ctx?.props?.children) {
          return (
            <li className="ptb--small">
              { Array.isArray(ctx?.props?.children) ? map(ctx?.props?.children, (el) => renderHtmlReact(el)) : renderHtmlReact(ctx?.props?.children) }
            </li>
          );
        }

        if (typeof (ctx) === 'object' && ['ul', 'ol'].includes(ctx?.type) && !ctx?.props?.children) {
          return null;
        }

        if (typeof (ctx) === 'object' && ['button'].includes(ctx?.type) && ctx?.props?.children) {
          return (
            <Button rounded size="custom" color="grey-cold.50" borderColor="grey-cold.400" className="ptb--normal plr--big">
              { Array.isArray(ctx?.props?.children) ? map(ctx?.props?.children, (el) => renderHtmlReact(el)) : renderHtmlReact(ctx?.props?.children) }
            </Button>
          );
        }

        if (typeof (ctx) === 'object' && ctx?.type === 'figure' && ctx?.props?.children) {
          if (Array.isArray(ctx?.props?.children)) {
            const img = ctx?.props?.children.find((el) => el.type === 'img');
            const caption = ctx?.props?.children.find((el) => el.type === 'figcaption');
            return (
              <ArticleFigure
                fullWidth
                figure={
                  {
                    className: get(img, 'props.className', ''),
                    src: get(img, 'props.src', `${cdnPath}shared/no-image_medium.png`),
                    alt: get(img, 'props.alt', ''),
                    width: +get(img, 'props.width', 400),
                    height: +get(img, 'props.height', 400),
                    caption: get(caption, 'props.children', ''),
                    srcSet: get(img, 'props.srcSet', ''),
                    sizes: get(img, 'props.sizes', ''),
                    lazy: true,
                    loadingType: 'background',
                    layout: 'responsive'
                  }
                }
              />
            );
          }
          return renderHtmlReact(ctx?.props?.children);
        }

        if (typeof (ctx) === 'object' && ctx?.type === 'img') {
          return (
            <ArticleFigure
              fullWidth
              figure={
                {
                  className: get(ctx, 'props.className', ''),
                  src: get(ctx, 'props.src', `${cdnPath}shared/no-image_medium.png`),
                  alt: get(ctx, 'props.alt', ''),
                  width: +get(ctx, 'props.width', 400),
                  height: +get(ctx, 'props.height', 400),
                  caption: get(ctx, 'props.caption', ''),
                  srcSet: get(ctx, 'props.srcSet', ''),
                  sizes: get(ctx, 'props.sizes', ''),
                  lazy: true,
                  loadingType: 'background',
                  layout: 'responsive'
                }
              }
            />
          );
        }

        if (typeof (ctx) === 'object' && ctx?.type && !Array.isArray(ctx?.props?.children)) {
          const HtmlTag = `${ctx.type}`;
          let propsBlacklist = [
            'children', 'type'
          ];
          propsBlacklist = handleAmpErrors(propsBlacklist, ctx);
          const allowedProps = omit(ctx?.props, propsBlacklist);
          setPropsValidValues(allowedProps, ctx);
          return (
            <HtmlTag key={uuid()} {...allowedProps}>
              { ctx?.props && ctx?.props?.children && renderHtmlReact(ctx?.props?.children) }
            </HtmlTag>
          );
        }

        if (typeof (ctx) === 'object' && ctx?.type && Array.isArray(ctx?.props?.children)) {
          const HtmlTag = `${ctx.type}`;
          let propsBlacklist = [
            'children', 'type'
          ];
          propsBlacklist = handleAmpErrors(propsBlacklist, ctx);
          const allowedProps = omit(ctx?.props, propsBlacklist);
          setPropsValidValues(allowedProps, ctx);
          if (ctx?.props?.children?.length > 1) {
            return (
              <HtmlTag key={uuid()} {...allowedProps}>
                { ctx?.props && ctx?.props?.children && Array.isArray(ctx?.props?.children)
                  ? map(ctx?.props?.children, (el) => renderHtmlReact(el)) : ctx }
              </HtmlTag>
            );
          }
          return Array.isArray(ctx?.props?.children[0]) ? (
            <HtmlTag key={uuid()} {...allowedProps}>
              { ctx?.props && ctx?.props?.children[0] && Array.isArray(ctx?.props?.children[0])
                ? map(ctx?.props?.children[0], (el) => renderHtmlReact(el)) : ctx }
            </HtmlTag>
          ) : (
            <HtmlTag key={uuid()} {...allowedProps}>
              { ctx?.props && ctx?.props?.children && Array.isArray(ctx?.props?.children)
                ? renderHtmlReact(ctx?.props?.children[0]) : ctx }
            </HtmlTag>
          );
        }
      } catch (error) {
        onError(error);
      }
      return ctx;
    };

    return (
      <React.Fragment>
        { Array.isArray(htmlReactParsed) && htmlReactParsed.length // Verify if html parsed is a valid array and not empty
          ? htmlReactParsed.map((c) => renderHtmlReact(c))
          : null }
      </React.Fragment>
    );
  } catch (error) {
    onError(error);
    return content;
  }
};

RenderPagesHtmlReact.propTypes = {
  /**
   * The content of page
   */
  content: PropTypes.string,
  /**
   * The event that capture error
   */
  onError: PropTypes.func
};

export default RenderPagesHtmlReact;
