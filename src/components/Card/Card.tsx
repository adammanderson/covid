/** @jsx jsx */
import * as React from 'react';
import {
  jsx,
  useThemeUI,
  Card as TCard,
  Heading,
  Flex,
} from 'theme-ui';
import {
  ChevronLeft,
  ChevronRight,
} from 'react-feather';
import { CardProps } from '.';
import scrollbar from '../../theme/scrollbar';

const CardCorners = () => {
  const { theme: { colors } } = useThemeUI();

  return (
    <div>
      <ChevronLeft
        size={48}
        color={colors && colors.accent}
        sx={{
          position: 'absolute',
          top: '-20px',
          left: '-20px',
          transform: 'rotate(45deg)',
        }}
      />
      <ChevronLeft
        size={48}
        color={colors && colors.accent}
        sx={{
          position: 'absolute',
          bottom: '-20px',
          left: '-20px',
          transform: 'rotate(-45deg)',
        }}
      />
      <ChevronRight
        size={48}
        color={colors && colors.accent}
        sx={{
          position: 'absolute',
          top: '-20px',
          right: '-20px',
          transform: 'rotate(-45deg)',
        }}
      />
      <ChevronRight
        size={48}
        color={colors && colors.accent}
        sx={{
          position: 'absolute',
          bottom: '-20px',
          right: '-20px',
          transform: 'rotate(45deg)',
        }}
      />
    </div>
  );
};

const Card: React.SFC<CardProps> = ({
  children,
  title,
  action,
}) => (
  <TCard>
    <CardCorners />
    <Flex
      sx={{
        p: 3,
        flexFlow: 'row nowrap',
        alignItems: ['flex-start', 'center'],
        justifyContent: 'space-between',
      }}
    >
      <Heading as="h3">{title}</Heading>
      {action}
    </Flex>
    <div
      sx={{
        overflow: 'auto',
        ...scrollbar,
      }}
    >
      {children}
    </div>
  </TCard>
);

export default Card;
