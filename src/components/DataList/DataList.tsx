/** @jsx jsx */
import * as React from 'react';
import { motion } from 'framer-motion';
import { jsx, Text, Button, useThemeUI } from 'theme-ui';
import orderBy from 'lodash/orderBy';
import { DataListProps } from '.';
import { scrollToTop } from '../../helpers';
import {
  Adjuster,
  Card,
  ListItem,
} from '..';

const DataList: React.SFC<DataListProps> = ({
  data,
  title,
}) => {
  const { theme: { colors } } = useThemeUI();
  const dataListRef = React.useRef(null);
  const [activeFilter, setActiveFilter] = React.useState('value');
  const newFilter = activeFilter === 'label' ? 'value' : 'label';
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
      {data.length ? ordered.map(({ label, value, adjustment }) => {
        const isWarning = value > 200;
        return (
          <ListItem
            key={label}
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
              {label}
            </Text>
            <Adjuster value={adjustment} />
          </ListItem>
        );
      }) : (
        <Text variant="upper" sx={{ p: 3, pt: 0, textAlign: 'center' }}>Data not yet ready</Text>
      )}
    </Card>
  );
};

export default React.memo(DataList);
