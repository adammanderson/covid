/** @jsx jsx */
import * as React from 'react';
import { motion } from 'framer-motion';
import { jsx, Text, Button, useThemeUI } from 'theme-ui';
import orderBy from 'lodash/orderBy';
import { DataListProps } from '.';
import { scrollToTop } from '../../helpers';
import {
  Card,
  ListItem,
} from '..';

const DataList: React.SFC<DataListProps> = ({
  data,
  title,
}) => {
  const { theme: { colors } } = useThemeUI();
  const dataListRef = React.useRef(null);
  const [activeFilter, setActiveFilter] = React.useState('key');
  const newFilter = activeFilter === 'key' ? 'value' : 'key';
  const ordered = orderBy(data, activeFilter, activeFilter === 'key' ? 'asc' : 'desc');

  React.useEffect(() => {
    scrollToTop(dataListRef.current);
  }, [activeFilter]);

  return (
    <Card
      ref={dataListRef}
      title={title}
      action={<Button onClick={(): void => setActiveFilter(newFilter)}>{newFilter}</Button>}
    >
      {ordered.map(({ key, value }) => {
        const isWarning = value > 3;
        return (
          <ListItem
            key={key}
          >
            <Text variant="primary">
              <Text
                variant="inlineBold"
                sx={{
                  color: isWarning ? colors?.primary : colors?.text,
                }}
              >
                <motion.span
                  animate={isWarning ? { opacity: [0.6, 1, 0.6] } : {}}
                  transition={{ duration: 1, loop: Infinity }}
                >
                  {value}
                </motion.span>
              </Text>
              {key}
            </Text>
          </ListItem>
        );
      })}
    </Card>
  );
};

export default React.memo(DataList);
