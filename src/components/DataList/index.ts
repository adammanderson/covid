export { default as DataList } from './DataList';

export interface DataListProps {
  title: string;
  data: {
    key: string;
    value: string | number;
  }[];
}
