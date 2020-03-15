/* eslint-disable react/no-danger */
/** @jsx jsx */
import * as React from 'react';
import Head from 'next/head';
import { jsx, ThemeProvider, Flex } from 'theme-ui';
import theme from '../../theme';

const Shell: React.FC = ({
  children,
}) => (
  <ThemeProvider theme={theme}>
    <Head>
      <title>COVID-19 in the UK: Live data map</title>
      <meta name="description" content="The latest data map tracking COVID-19 in the UK." />
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="og:url" content="https://covid19.tallo.io/" />
      <meta property="og:title" content="COVID-19 UK Data Map" />
      <meta property="og:description" content="Mapping coronavius (COVID-19) data across the UK." />
      <meta property="og:image" content="https://covid19.tallo.io/covid.png" />
      <script async src="https://www.googletagmanager.com/gtag/js?id=UA-160202859-1" />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
        
            gtag('config', 'UA-160202859-1');
          `,
        }}
      />
      <link
        key="gfonts"
        href="https://fonts.googleapis.com/css2?family=Saira:wght@400;600&display=swap"
        rel="stylesheet"
      />
    </Head>
    <Flex
      sx={{
        p: 1,
        flexDirection: 'column',
        height: ['auto', '100vh'],
        justifyContent: 'space-between',
      }}
    >
      {children}
    </Flex>
  </ThemeProvider>
);

export default Shell;
