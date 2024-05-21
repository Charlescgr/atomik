import React from 'react';
import PropTypes from 'prop-types';
import omit from 'object.omit';

import { handleCreateStyleClass } from '../../_settings/Utils';
import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';

import A from '../../atoms/A';
import Box from '../../atoms/Box';
import Icon from '../../atoms/Icon';

import TitleCustom from '../TitleCustom';

function TendenciesItems({
  title, tendenciesList = [], titleType, titleIsSpan, icon, ...props
}) {
  const { colorMode, direction } = useTheme();

  const propsBlacklist = [
    'tendenciesList',
    'titleIsSpan',
    'titleType',
    'title',
    'icon',
    'className'
  ];
  const allowedProps = omit(props, propsBlacklist);

  return (
    <>
      <Box
        className={`tendencies-box ${handleCreateStyleClass(props)}`}
        {...allowedProps}
      >
        <TitleCustom titleIsSpan={titleIsSpan} type={titleType} lineType="dashed" lineColor="secondary.200" className="pb--normal d--flex ai--center">
          {icon && (
            <Icon inline size="medium" color="main.200" prefix="bx" name={icon} className={`m${direction === 'rtl' ? 'l' : 'r'}--normal`} />
          )}
          {title}
        </TitleCustom>
        {tendenciesList.map(({ id, permalink, name }) => (
          <A
            key={id}
            to={permalink}
            textColor={colorMode === 'dark' ? 'black' : 'white'}
            title={name?.toLowerCase()}
            className={`bc--secondary-600 d--inline-block mt--big m${direction === 'rtl' ? 'l' : 'r'}--big ptb--normal plr--big fs--normal ff--sans fw--bold br--small`}
          >
            {name?.toLowerCase()}
          </A>
        ))}
      </Box>
    </>
  );
}

TendenciesItems.defaultProps = {
  titleIsSpan: false,
  titleType: 'h3'
};

TendenciesItems.propTypes = {

  /**
   * Container Title
   */
  title: PropTypes.string.isRequired,

  /**
   * The icon inside de title
   */
  icon: PropTypes.string,

  /**
   * The heading level type
   */
  titleType: PropTypes.string,

  /**
   * List of items
   */
  tendenciesList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      permalink: PropTypes.string,
      name: PropTypes.string
    })
  ).isRequired,

  /**
   * The custom classname prop.
   */
  className: PropTypes.string,

  /**
   * Informs if the component rederize an <hx> or an <span>, for SEO
   */
  titleIsSpan: PropTypes.bool,
};

export default TendenciesItems;
