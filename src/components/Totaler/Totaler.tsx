/** @jsx jsx */
import * as React from 'react';
import { motion } from 'framer-motion';
import { jsx, Text, Flex, useThemeUI } from 'theme-ui';
import { TotalerProps, TotalerItemProps } from '.';
import { Card } from '../Card';

const TotalerItem = ({ label, value }: TotalerItemProps) => {
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
          color: isActive ? colors?.secondary : colors?.text,
        }}
      >
        <motion.span
          animate={isActive ? { opacity: [0.6, 1, 0.6] } : {}}
          transition={{ duration: 1, loop: Infinity }}
        >
          {value}
        </motion.span>
      </Text>
      <Text
        variant="upper"
        sx={{
          textAlign: 'center',
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
}) => {
  const filteredData = data.filter(({ value }) => !!value);

  return (
    <Card
      title={title}
      fixed
    >
      <Flex
        sx={{
          justifyContent: 'center',
        }}
      >
        {filteredData.length ? filteredData.map(({ label, value }) => (
          <TotalerItem
            key={label}
            label={label}
            value={value}
          />
        )) : (
          <Text variant="upper" sx={{ p: 3, pt: 0, textAlign: 'center' }}>Data not yet ready</Text>
        )}
      </Flex>
    </Card>
  );
};

export default Totaler;
