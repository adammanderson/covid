/** @jsx jsx */
import * as React from 'react';
import { jsx, useThemeUI, Text } from 'theme-ui';
import { ArrowUp, ArrowDown } from 'react-feather';
import { AdjusterProps } from '.';

const Adjuster: React.SFC<AdjusterProps> = ({
  value,
}) => {
  const { theme: { colors } } = useThemeUI();
  const isPositive = Math.sign(value) > 0;

  return isPositive && (
    <Text
      variant="tiny"
      sx={{
        display: 'flex',
        ml: 'auto',
        alignItems: 'center',
        fontWeight: 'bold',
        color: 'secondary',
      }}
    >
      <ArrowUp color={colors?.secondary} size={16} />
      {value}
    </Text>
  );
};

export default Adjuster;
