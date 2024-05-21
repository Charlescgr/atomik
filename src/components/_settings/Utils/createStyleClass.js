const createColorClass = (color) => color.split('.').join('-');

export const handleCreateStyleClass = ({ className, ...props }, type = '') => {
  let classes = '';
  if (props.fullWidth) classes += 'is--full-width ';
  if (props.small) classes += 'is--small ';
  if (props.horizontal) classes += 'is--horizontal ';
  if (props.course) classes += 'is--course ';
  if (props.responsive) classes += 'is--responsive ';
  if (props.rounded) classes += 'is--rounded ';
  if (props.wrap) classes += 'wrap ';
  if (props.borderColor) classes += 'has--border ';
  if (props.underlineColor) classes += 'is--underline ';
  if (props.textColor) classes += `c--${createColorClass(props.textColor)} `;
  if (props.color) classes += `bc--${createColorClass(props.color)} `;
  if (props.colSize) classes += `column--${props.colSize}`;
  if (props.full) classes += 'is--full ';
  if (props.brandWeek) classes += 'is--brand-week ';
  if (props.padding) classes += `ptb--${props.padding} `;
  if (props.margin) classes += `mtb--${props.margin} `;
  if (props.fullRounded) classes += 'is--full-rounded ';
  if (props.noBackGroundColor) classes += 'no-background-collor ';
  if (props.fontFamily) classes += `ff--${props.fontFamily} `;

  switch (type) {
    case 'ul':
      if (props.listStyleType) classes += `lst--${props.listStyleType} `;
      break;
    case 'ol':
      if (props.listStyleType) classes += `lst--${props.listStyleType} `;
      break;
    case 'text':
      if (props.size) classes += `fs--${props.size} `;
      break;
    default:
      if (props.size && !props.fullRounded) classes += `is--${props.size} `;
      break;
  }

  if (props.lineType) classes += ` has--divider-${props.lineType}`;
  if (props.disabled) classes += ' is--disabled';
  if (props.onlyIcon || props.hasIcon) classes += ` has--icon ${type !== 'badge' ? 'd--flex' : 'd--inline-flex'} ai--center jc--center`;
  if (props.withAnimation) classes += ' has--animation';
  if (props.onlyIcon) classes += (props.onlyIcon && type !== 'badge') ? ' is--action' : ' is--only-icon';
  if (className) classes += className ? ` ${className}` : '';
  return classes.trim();
};
