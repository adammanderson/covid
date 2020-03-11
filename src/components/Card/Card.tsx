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
  fixed,
  centered,
}, ref) => (
  <TCard
    sx={{
      flexGrow: fixed ? 0 : 1,
    }}
  >
    <Corners />
    {title && (
      <Flex
        sx={{
          p: 3,
          pb: 1,
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
        flex: fixed ? '1 1 auto' : ['1 1 auto', '1 1 0'],
        maxHeight: fixed || centered ? 'auto' : 320,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: centered ? 'flex-end' : 'flex-start',
        overflowY: centered ? 'hidden' : 'auto',
        overflowX: 'hidden',
        scrollBehavior: 'smooth',
        ...scrollbar,
      }}
    >
      {children}
    </div>
  </TCard>
));

export default Card;
