import * as React from 'react';
import { Heading, Text, Box } from 'theme-ui';
import { Card } from '../Card';
import { HeaderProps } from '.';

const Header: React.SFC<HeaderProps> = ({
  title,
  subtitle,
}) => (
  <Card fixed>
    <Box
      sx={{
        p: 3,
        textAlign: 'center',
      }}
    >
      <Heading as="h1">{title}</Heading>
      {subtitle && <Text variant="small">{subtitle}</Text>}
    </Box>
  </Card>
);

export default Header;
