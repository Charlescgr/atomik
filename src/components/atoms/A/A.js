/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import omit from 'object.omit';

import { useAmp } from 'next/amp';
import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';
import { handleCreateStyleClass } from '../../_settings/Utils';

function A({
  externalLink,
  textColor,
  hoverColor,
  color,
  invertOnHover,
  as,
  to,
  target,
  title,
  children,
  underlineColor,
  lineType,
  rel,
  utm,
  ...props
}) {
  const { getColor, publicUrl } = useTheme();
  const isAmp = useAmp();

  const lineColorHex = (underlineColor) ? getColor(underlineColor) : 'transparent';

  const propsBlacklist = [
    'lineType',
    'className',
    'color',
    'invertOnHover',
    'textColor',
    'hoverColor',
    'externalLink',
    'underlineColor'
  ];
  const allowedProps = omit(props, propsBlacklist);

  const buildAmpInLink = () => {
    // if (isAmp && !to.match(/.(jpeg|jpg|png|gif)$/i)) return to.endsWith('/') ? `${to}?amp=1` : `${to}/?amp=1`;
    return to;
  };

  const buildUtmParams = () => {
    if (!externalLink || !utm) return buildAmpInLink();

    const additionalParameters = `${buildAmpInLink()}?utm_source=${utm.source}&utm_medium=${utm.medium}&utm_campaign=${utm.campaign}/`;

    return additionalParameters;
  };

  return (
    <>
      {(externalLink || isAmp) ? (
        <a
          {...allowedProps}
          href={buildUtmParams()}
          target={target}
          className={`default-a-link ${handleCreateStyleClass({
            ...props, underlineColor, textColor, color
          }, 'text')} ${lineType ? 'is--underline' : ''}`}
          title={title}
          rel={rel || (externalLink ? 'noopener' : null)}
        >
          {!props?.dangerouslySetInnerHTML ? children : null}
        </a>
      ) : (
        <Link
          href={to.replace(publicUrl, '')}
          as={as}
        >
          <a
            {...allowedProps}
            href={to}
            target={target}
            className={`default-a-link ${handleCreateStyleClass({
              ...props, underlineColor, textColor, color
            }, 'text')}`}
            title={title}
          >
            {!props?.dangerouslySetInnerHTML ? children : null}
          </a>
        </Link>
      )}

      <style jsx>
        {`
          // custom styles
          .default-a-link {
            transition: background-color 600ms ease, transform 200ms ease, box-shadow 400ms ease-out;
            word-break: break-word;
            transition: color 250ms ease-in-out;
          }
          .is--underline{
            border-bottom-style: ${lineType};
            border-bottom-width: 1px;
            border-bottom-color: ${lineColorHex};
          }

          .has--animation:hover {
            box-shadow: -6px 6px 0px 0px rgba(0, 0, 0, 0.20);
          }

          .default-a-link:hover {
            transition: background-color 600ms ease, transform 200ms ease, box-shadow 400ms ease-out;
            ${invertOnHover ? `color: ${getColor(color)};background-color: ${getColor(textColor)};` : ''}
            ${hoverColor ? `color: ${getColor(hoverColor)};transition: color 250ms ease-in-out;` : ''}
          }
        `}
      </style>

      <style jsx global>
        {`
          // commom styles
          a {
            text-decoration: none;
            outline: none;
          }
        `}
      </style>
    </>
  );
}

A.defaultProps = {
  externalLink: false,
  to: '/',
  target: '_self'
};

A.propTypes = {
  /**
   * Informs if this is a external link (out of website)
   */
  externalLink: PropTypes.bool,

  /**
   * The anchor alias target when clicked (only next) eg.: 'home', 'about'. When
   * it is provided, the to prop will be ignored.
   */
  as: PropTypes.string,

  /**
   * The anchor link (pathname + prop)
   */
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

  /**
   * The target of the link. eg.: 'blank'
   */
  target: PropTypes.oneOf(['_blank', '_self']),

  /**
   * The title of the link
   */
  title: PropTypes.string,

  /**
   * Text color
   */
  textColor: PropTypes.string,

  /**
   * hover color
   */
  hoverColor: PropTypes.string,

  /**
   * The type of underline eg: dotted, dashed, solid
   */
  lineType: PropTypes.oneOf(['dotted', 'dashed', 'solid']),

  /**
   * Text decoration, underline color
   */
  underlineColor: PropTypes.string,

  /**
   * The text for the Link
   */
  children: PropTypes.any,

  /**
   * The dangerouslySetInnerHTML element
   */
  dangerouslySetInnerHTML: PropTypes.object,

  /**
   * The custom classNames
   */
  className: PropTypes.string,

  /**
   * The rel attribute specifies the relationship between the current document and the linked document.
   */
  rel: PropTypes.oneOf(['noopener', 'noreferrer', 'nofollow']),

  /**
   * UTM informations
   */
  utm: PropTypes.shape({
    source: PropTypes.string,
    medium: PropTypes.string,
    campaign: PropTypes.string
  }),

  /**
   * If the link has hover animation, when the link have button style
   */
  withAnimation: PropTypes.bool,

  /**
  * Invert colors on hover (textColor become color(bg), and color(bg) become textColor), when the link have button style
  */
  invertOnHover: PropTypes.bool,

  /**
   * The background color of the link, when the link have button style
   */
  color: PropTypes.string
};

export default A;
