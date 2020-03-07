import * as React from 'react';
import { ThemeProvider } from 'theme-ui';
import theme from '../../theme';

const Shell: React.FC = ({
  children,
}) => (
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
)

export default Shell;
