import React from 'react';
import PropTypes from 'prop-types';
import omit from 'object.omit';

import { useTheme } from '../../_settings/ThemeProvider/ThemeContext';
import { handleCreateStyleClass } from '../../_settings/Utils';

function ToolTip({
  children, ...props
}) {
  const propsBlacklist = ['className'];
  const allowedProps = omit(props, propsBlacklist);
  const { getColor } = useTheme();

  return (
    <div
      className={`tool-tip p--absolute zi--9 pt--big ${handleCreateStyleClass(props)}`}
      {...allowedProps}
    >
      <div className="tool-tip__content p--absolute bs--small br--small bc--white p--normal">
        {children}
      </div>
      <style jsx global>
        {`
          .tool-tip {
            min-width: 320px;
            max-width: 320px;
            left: calc(50% - 160px);
            top: 100%;
          }
          .tool-tip__content {
            border: 1px solid ${getColor('grey-neutral.100')};
          }
          .tool-tip__content::after {
            content: " ";
            width: 0;
            height: 0;
            position: absolute;
            top: -23px;
            left: 50%;
            border-width: 12px;
            border-style: solid;
            border-color: transparent transparent ${getColor('white')} transparent;
          }
          .tool-tip__content::before {
            content: " ";
            width: 0;
            height: 0;
            position: absolute;
            top: -24px;
            left: 50%;
            border-width: 12px;
            border-style: solid;
            border-color: transparent transparent ${getColor('grey-neutral.100')} transparent;
          }
        `}
      </style>
    </div>
  );
}

ToolTip.propTypes = {
  /**
   * The content
   */
  children: PropTypes.any.isRequired,

  /**
   * The custom className
   */
  className: PropTypes.string
};

export default ToolTip;
