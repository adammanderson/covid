const sharedPseudo = {
  position: 'absolute',
  content: '""',
  bg: 'accent',
  width: '4px',
  height: '4px',
};

export default {
  primary: {
    position: 'relative',
    p: 2,
    fontFamily: 'body',
    fontSize: 0,
    lineHeight: 1,
    letterSpacing: 2,
    whiteSpace: 'nowrap',
    bg: 'background',
    border: 0,
    borderRadius: 0,
    textTransform: 'uppercase',
    cursor: 'pointer',
    overflow: 'hidden',
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
  },
};
