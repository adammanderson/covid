import dynamic from 'next/dynamic';

export const Mapper = dynamic(
  () => import('./Mapper'),
  { ssr: false },
);

export interface MapperProps {
  data: any;
}
