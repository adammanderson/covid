/** @jsx jsx */
import * as React from 'react';
import { jsx, Text, Button } from 'theme-ui';
import orderBy from 'lodash/orderBy';
import { DataListProps } from '.';
import {
  Card,
  ListItem,
} from '..';

const DataList: React.SFC<DataListProps> = ({
  data,
  title,
}) => {
  const [activeFilter, setActiveFilter] = React.useState('key');
  const newFilter = activeFilter === 'key' ? 'value' : 'key';
  const ordered = orderBy(data, activeFilter, activeFilter === 'key' ? 'asc' : 'desc');

  return (
    <Card
      title={title}
      action={<Button onClick={(): void => setActiveFilter(newFilter)}>{newFilter}</Button>}
    >
      {ordered.map(({ key, value }) => (
        <ListItem
          key={key}
        >
          <Text>
            <Text variant="inlineBold">
              {value}
            </Text>
            {key}
          </Text>
        </ListItem>
      ))}
    </Card>
  );
};

export default React.memo(DataList);
