export { default as Totaler } from './Totaler';

export interface TotalerItemProps {
  label: string;
  value?: number;
  adjustment?: number;
}

export interface TotalerProps {
  data: TotalerItemProps[];
  title?: string;
  fixed?: boolean;
}
