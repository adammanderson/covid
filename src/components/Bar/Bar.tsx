/** @jsx jsx */
import * as React from 'react';
import { jsx, Text, useThemeUI } from 'theme-ui';
import { useBreakpointIndex } from '@theme-ui/match-media';
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Card } from '../Card';
import { BarProps } from '.';

const Bar: React.SFC<BarProps> = ({
  data,
  title,
  lines,
  fixed,
  height = 220,
  legend = true,
}) => {
  const breakpoint = useBreakpointIndex();
  const isMobile = breakpoint === 0;
  const { theme: { colors } } = useThemeUI();
  const autoLines = Object.keys(data[0])
    .filter((key) => !['name', 'To be determined'].includes(key))
    .map((key) => ({ dataKey: key, color: 'white' }));
  const visibleLines = lines || autoLines;

  return (
    <Card
      title={title}
      fixed={fixed}
      centered
    >
      <ResponsiveContainer width="100%" height={isMobile ? 220 : height}>
        <LineChart
          data={data}
          margin={{
            top: 10,
            right: 40,
            left: 40,
            bottom: 10,
          }}
        >
          <XAxis
            dataKey="name"
            tick={{
              fontSize: '0.8em',
            }}
          />
          {legend && (
            <Legend
              iconType="diamond"
              verticalAlign="top"
              formatter={(value) => <Text as="span" variant="upper">{value}</Text>}
            />
          )}
          {visibleLines && visibleLines.map(({ dataKey, color = 'white' }) => (
            <Line
              key={dataKey}
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={1}
            />
          ))}
          <Tooltip
            itemSorter={(item) => -item.value}
            contentStyle={{
              background: colors?.background,
              borderColor: colors?.accent,
              fontSize: '0.75em',
              lineHeight: 1.1,
            }}
            itemStyle={{
              padding: 0,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default Bar;
