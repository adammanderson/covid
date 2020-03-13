/** @jsx jsx */
import * as React from 'react';
import { motion } from 'framer-motion';
import { jsx, Text, Flex, useThemeUI } from 'theme-ui';
import { TotalerProps, TotalerItemProps } from '.';
import { Card } from '../Card';
import { Adjuster } from '../Adjuster';

const TotalerItem = ({ label, value, adjustment }: TotalerItemProps) => {
  const { theme: { colors } } = useThemeUI();
  const isActive = label.includes('active');

  return (
    <Flex
      sx={{
        flex: 1,
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'center',
        px: 4,
        my: 3,
        borderRight: 1,
        ':last-of-type': {
          borderRight: 'none',
        },
      }}
    >
      <Text
        variant="large"
        sx={{
          display: 'flex',
          flexDirection: ['column', 'row'],
          alignItems: 'flex-start',
          lineHeight: 1,
          color: isActive ? colors?.secondary : colors?.text,
        }}
      >
        <motion.span
          animate={isActive ? { opacity: [0.6, 1, 0.6] } : {}}
          transition={{ duration: 1, loop: Infinity }}
        >
          {value}
        </motion.span>
        <Adjuster value={adjustment} />
      </Text>
      <Text
        variant="upper"
        sx={{
          textAlign: 'center',
          pt: 2,
        }}
      >
        {label}
      </Text>
    </Flex>
  );
};

const Totaler: React.SFC<TotalerProps> = ({
  data,
  title,
  fixed = false,
}) => {
  const filteredData = data.filter(({ value }) => !!value);

  return (
    <Card
      title={title}
      fixed={fixed}
    >
      <Flex
        sx={{
          justifyContent: 'center',
        }}
      >
        {filteredData.length ? filteredData.map(({ label, value, adjustment }) => (
          <TotalerItem
            key={label}
            label={label}
            value={value}
            adjustment={adjustment}
          />
        )) : (
          <Text variant="upper" sx={{ p: 3, pt: 0, textAlign: 'center' }}>Data not yet ready</Text>
        )}
      </Flex>
    </Card>
  );
};

export default React.memo(Totaler);
