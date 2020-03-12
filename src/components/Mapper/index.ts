import dynamic from 'next/dynamic';
import { ListAttributes } from '../../types';

export const Mapper = dynamic(
  () => import('./Mapper'),
  { ssr: false },
);

export interface MapperProps {
  data: ListAttributes[];
}
