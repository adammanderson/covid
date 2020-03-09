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
        flexFlow: 'column wrap',
        alignItems: 'center',
        mb: 4,
        px: 4,
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
}) => (
  <Card
    title={title}
  >
    <Flex
      sx={{
        justifyContent: 'center',
      }}
    >
      {data.map(({ label, value }) => (
        <TotalerItem
          key={label}
          label={label}
          value={value}
        />
      ))}
    </Flex>
  </Card>
);

export default Totaler;
