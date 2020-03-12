import { ListAttributes } from '../../types';

export { default as DataList } from './DataList';

export interface DataListProps {
  title: string;
  data: ListAttributes[];
}
