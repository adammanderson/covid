import scrollbar from './scrollbar';

export default {
  root: {
    fontFamily: 'body',
    fontWeight: 'normal',
    fontSize: 1,
    webkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
  },
  a: {
    color: 'text',
    textDecoration: 'none',
    ':hover': {
      textDecoration: 'underline',
    },
  },
  ...scrollbar,
};
