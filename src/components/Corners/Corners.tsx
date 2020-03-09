/** @jsx jsx */
import * as React from 'react';
import { jsx, useThemeUI } from 'theme-ui';
import { Icons } from '..';

const Corners: React.SFC = () => {
  const { theme: { colors } } = useThemeUI();

  return (
    <div>
      <Icons.CornerUpLeft
        size={32}
        color={colors?.accent}
        background={colors?.background}
        sx={{
          position: 'absolute',
          top: '-1px',
          left: '-1px',
        }}
      />
      <Icons.CornerUpRight
        size={32}
        color={colors?.accent}
        background={colors?.background}
        sx={{
          position: 'absolute',
          top: '-1px',
          right: '-1px',
        }}
      />
      <Icons.CornerDownLeft
        size={32}
        color={colors?.accent}
        background={colors?.background}
        sx={{
          position: 'absolute',
          bottom: '-1px',
          left: '-1px',
        }}
      />
      <Icons.CornerDownRight
        size={32}
        color={colors?.accent}
        background={colors?.background}
        sx={{
          position: 'absolute',
          bottom: '-1px',
          right: '-1px',
        }}
      />
    </div>
  );
};

export default Corners;
