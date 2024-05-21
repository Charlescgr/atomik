import React from 'react';
import PropTypes from 'prop-types';
import { useAmp } from 'next/amp';
import Button from '../../atoms/Button';
import Icon from '../../atoms/Icon';
import Box from '../../atoms/Box';
import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';

const getWpAdminEditUrl = ({ type, id, publicUrl }) => {
  switch (type) {
    case 'post': {
      return `${publicUrl}/wp-admin/post.php?post=${id}&action=edit`;
    }
    case 'page': {
      return `${publicUrl}/wp-admin/post.php?post=${id}&action=edit`;
    }
    case 'category': {
      return `${publicUrl}/wp-admin/term.php?taxonomy=category&tag_ID=${id}`;
    }
    case 'tag': {
      return `${publicUrl}/wp-admin/term.php?taxonomy=post_tag&tag_ID=${id}`;
    }
    case 'user': {
      return `${publicUrl}/wp-admin/user-edit.php?user_id=${id}`;
    }
    default: {
      return '';
    }
  }
};

const WpBar = ({ wpLoggedIn }) => {
  const { publicUrl, direction } = useTheme();

  if (!wpLoggedIn?.isLogged || useAmp()) return null;

  return (
    <Box id="wp-bar" className="zi--11 ptb--normal bc--grey-cold-700 p--fixed t--0 w--100 d--flex ai--center mlr--auto mtb--0 plr--big">
      <Box className="logo f--1">
        <Icon prefix="bxl" name="wordpress" color="white" size="medium" />
      </Box>
      {wpLoggedIn?.id && (
        <Button
          rounded
          hasIcon
          size="custom"
          color="grey-cold.50"
          textColor="grey-cold.600"
          className={`ptb--small plr--normal fw--bold fs--small m${direction === 'rtl' ? 'l' : 'r'}--big`}
          onClick={() => {
            window.location.href = getWpAdminEditUrl({ ...wpLoggedIn, publicUrl });
          }}
        >
          <Icon prefix="bx" name="edit-alt" color="grey-cold.600" size="small" className={`m${direction === 'rtl' ? 'l' : 'r'}--normal`} />
          Edit
        </Button>
      )}
      <Button
        rounded
        hasIcon
        size="custom"
        color="grey-cold.50"
        textColor="grey-cold.600"
        className="ptb--small plr--normal fw--bold fs--small"
        onClick={() => {
          window.location.href = `${publicUrl}/wp-admin`;
        }}
      >
        <Icon prefix="bxs" name="dashboard" color="grey-cold.600" size="small" className={`m${direction === 'rtl' ? 'l' : 'r'}--normal`} />
        Dashboard
      </Button>
    </Box>
  );
};

WpBar.propTypes = {
  /**
   * If WP user is logged and Page data
   */
  wpLoggedIn: PropTypes.shape({
    id: PropTypes.number,
    type: PropTypes.string,
    isLogged: PropTypes.bool
  }),
};

export default WpBar;
