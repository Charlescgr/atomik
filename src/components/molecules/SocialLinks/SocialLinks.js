import React from 'react';
import PropTypes from 'prop-types';
import omit from 'object.omit';

import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';

import List from '../../atoms/List';
import Icon from '../../atoms/Icon';
import A from '../../atoms/A';

function SocialLinks({
  iconColor, links, className, ...props
}) {
  // -- theme
  const { direction } = useTheme();
  if (links.length === 0) {
    return null;
  }

  const propsBlacklist = [
    'iconColor',
    'links',
    'className'
  ];
  const allowedProps = omit(props, propsBlacklist);

  const socialAllowed = ['Facebook', 'Pinterest', 'Instagram', 'YouTube', 'Twitter'];

  const filterSocialMedia = (item) => socialAllowed.includes(item.title);

  const socialBrands = {
    'fa-facebook': 'facebook',
    'fa-pinterest': 'pinterest',
    'fa-twitter': 'twitter',
    'fa-instagram': 'instagram',
    'fa-youtube': 'youtube',
  };

  const getBrandClass = (classes, title) => {
    if (classes && classes?.length > 0) {
      return classes[1];
    }
    return title.toLowerCase();
  };

  return (
    <>
      <List
        className={`social-list ${className}`}
        {...allowedProps}
      >
        {links?.filter(filterSocialMedia).map((item) => (
          <li
            key={`${item.ID}${item?.title?.toLowerCase()}`}
            className={`m${direction === 'rtl' ? 'l' : 'r'}--normal`}
          >
            <A
              to={item.link}
              target="_blank"
              title={item.title}
              className="plr--normal mlr--small d--block"
              rel="noopener"
              externalLink
            >
              <Icon inline color={iconColor} size="medium" prefix="bxl" name={getBrandClass(socialBrands[item?.classes], item?.title)} />
              <i className={`icon-${item?.title?.toLowerCase()}`}></i>
            </A>
          </li>
        ))}
      </List>
    </>
  );
}

SocialLinks.defaultProps = {
  iconColor: 'grey-cold.300',
  links: []
};

SocialLinks.propTypes = {
  /**
   * The color of the icons
   */
  iconColor: PropTypes.string,

  /**
   * List of items
   */
  links: PropTypes.array,

  /**
   * The custom classname prop.
   */
  className: PropTypes.string
};

export default SocialLinks;
