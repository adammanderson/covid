export { default as Bar } from './Bar';

export interface BarProps {
  data: any;
  title?: string;
  fixed?: boolean;
  legend?: boolean;
  height?: string | number;
  lines?: {
    dataKey: string;
    color?: string;
  }[];
}
