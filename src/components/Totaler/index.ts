export { default as Totaler } from './Totaler';

export interface TotalerItemProps {
  label: string;
  value?: string | number;
}

export interface TotalerProps {
  data: TotalerItemProps[];
  title?: string;
}
