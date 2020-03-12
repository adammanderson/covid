/** @jsx jsx */
import * as React from 'react';
import { jsx, Box } from 'theme-ui';

const Notice: React.FC = ({
  children,
}) => (
  <Box
    sx={{
      position: 'relative' as 'relative',
      flex: 1,
      display: 'flex',
      flexFlow: 'row nowrap',
      justifyContent: 'space-between',
      alignItems: ['flex-start', 'center'],
      py: 2,
      m: 2,
      mb: 0,
      borderTop: 0,
      ':before': {
        position: 'absolute',
        content: '""',
        bg: 'accent',
        width: '4px',
        height: '4px',
        top: 0,
        left: 0,
      },
      ':after': {
        position: 'absolute',
        content: '""',
        bg: 'accent',
        width: '4px',
        height: '4px',
        top: 0,
        right: 0,
      },
    }}
  >
    {children}
  </Box>
);

export default Notice;
