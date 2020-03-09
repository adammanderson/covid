/** @jsx jsx */
import * as React from 'react';
import {
  jsx,
  Card as TCard,
  Heading,
  Flex,
} from 'theme-ui';
import { Corners } from '..';
import { CardProps } from '.';
import scrollbar from '../../theme/scrollbar';

const Card = React.forwardRef<HTMLDivElement, CardProps>(({
  children,
  title,
  action,
}, ref) => (
  <TCard>
    <Corners />
    {title && (
      <Flex
        sx={{
          p: 3,
          flexFlow: 'row nowrap',
          alignItems: ['flex-start', 'center'],
          justifyContent: action ? 'space-between' : 'space-around',
          textAlign: action ? 'left' : 'center',
        }}
      >
        <Heading as="h3" sx={{ flex: 1 }}>{title}</Heading>
        {action}
      </Flex>
    )}
    <div
      ref={ref}
      sx={{
        overflow: 'auto',
        scrollBehavior: 'smooth',
        ...scrollbar,
      }}
    >
      {children}
    </div>
  </TCard>
));

export default Card;
