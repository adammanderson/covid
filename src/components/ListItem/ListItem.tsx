/** @jsx jsx */
import * as React from 'react';
import { jsx } from 'theme-ui';

const ListItem: React.SFC = ({
  children,
}) => (
  <div
    sx={{
      py: 2,
      px: 3,
      transition: 'all 200ms ease-in-out 0s',
      ':hover': {
        bg: 'background',
        cursor: 'crosshair',
      },
    }}
  >
    {children}
  </div>
);

export default ListItem;
