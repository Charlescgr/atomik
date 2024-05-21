/*
Author Eric Sloan
*/
// input color: #ff5866 and amt: -20 || 50
// eslint-disable-next-line no-shadow
export const lightenDarkenColor = (color, amt) => `#${color.replace(/^#/, '').replace(/../g, (color) => (`0${Math.min(255, Math.max(0, parseInt(color, 16) + amt)).toString(16)}`).substr(-2))}`;
