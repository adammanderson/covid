import * as React from 'react';
import { useThemeUI } from 'theme-ui';
import { Wifi } from 'react-feather';
import { FetcherProps } from '.';

const Fetcher: React.FC<FetcherProps> = ({
  loading,
  onClick,
}) => {
  const { theme: { colors } } = useThemeUI();

  return (
    <Wifi
      style={{
        flexShrink: 0,
        marginLeft: 10,
        cursor: 'pointer',
      }}
      size={18}
      color={loading ? colors?.secondary as string : colors?.white as string}
      onClick={onClick}
    />
  );
};

export default React.memo(Fetcher);
