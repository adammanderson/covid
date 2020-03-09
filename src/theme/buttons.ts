const sharedPseudo = {
  position: 'absolute',
  content: '""',
  bg: 'accent',
  width: '4px',
  height: '4px',
};

const pseudo = {
  ':before': {
    ...sharedPseudo,
    top: 0,
    left: 0,
  },
  ':after': {
    ...sharedPseudo,
    bottom: 0,
    right: 0,
  },
};

const buttonBase = {
  position: 'relative',
  p: 2,
  fontFamily: 'body',
  fontSize: 0,
  lineHeight: 1,
  letterSpacing: 1,
  whiteSpace: 'nowrap',
  bg: 'background',
  border: 0,
  borderRadius: 0,
  cursor: 'pointer',
  overflow: 'hidden',
  userSelect: 'none',
  ...pseudo,
};

export default {
  primary: {
    ...buttonBase,
  },
};
