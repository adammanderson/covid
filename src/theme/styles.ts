import scrollbar from './scrollbar';

export default {
  root: {
    fontFamily: 'body',
    fontWeight: 'normal',
    fontSize: 1,
    webkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    '@keyframes dash': {
      '0%': {
        opacity: 0.5,
      },
      '80%': {
        opacity: 1,
      },
      '100%': {
        opacity: 0.5,
      },
    },
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
