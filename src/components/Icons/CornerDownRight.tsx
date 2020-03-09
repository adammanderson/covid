import * as React from 'react';
import { IconProps } from '.';

export default ({
  size,
  color,
  background,
  ...props
}: IconProps) => (
  <svg viewBox="0 0 48 48" width={size} height={size} {...props}>
    <path stroke={background} strokeWidth={6} fillOpacity={0} d="M48 0L48 48L0 48" />
    <path stroke={color} strokeWidth={12} fillOpacity={0} d="M48 12L48 48L12 48" />
  </svg>
);
