/** @jsx jsx */
import * as React from 'react';
import { jsx, useThemeUI, Text } from 'theme-ui';
import { ArrowUp, ArrowDown } from 'react-feather';
import { AdjusterProps } from '.';

const Adjuster: React.SFC<AdjusterProps> = ({
  value,
}) => {
  const { theme: { colors } } = useThemeUI();
  const isNegative = Math.sign(value) < 0;

  return !!value && (
    <Text
      variant="tiny"
      sx={{
        display: 'flex',
        ml: 'auto',
        alignItems: 'center',
        fontWeight: 'bold',
        color: isNegative ? 'primary' : 'secondary',
      }}
    >
      {isNegative ? (
        <ArrowDown color={colors?.primary} size={16} />
      ) : (
        <ArrowUp color={colors?.secondary} size={16} />
      )}
      {value}
    </Text>
  );
};

export default Adjuster;
