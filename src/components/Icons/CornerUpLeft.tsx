import * as React from 'react';
import { IconProps } from '.';

export default ({
  size,
  color,
  background,
  ...props
}: IconProps) => (
  <svg viewBox="0 0 48 48" width={size} height={size} {...props}>
    <path stroke={background} strokeWidth={6} fillOpacity={0} d="M0 48L0 0L48 0" />
    <path stroke={color} strokeWidth={12} fillOpacity={0} d="M0 36L0 0L36 0" />
  </svg>
);
