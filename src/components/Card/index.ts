export { default as Card } from './Card';

export interface CardProps {
  children: React.ReactNode;
  title?: string;
  action?: React.ReactNode;
  fixed?: boolean;
  centered?: boolean;
}
