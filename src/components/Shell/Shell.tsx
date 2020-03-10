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
      <title>Covid-19 England, UK: Data Map</title>
      <meta name="description" content="The latest PHE data map tracking COVID-19 in England, UK." />
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
        href="https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap"
        rel="stylesheet"
      />
    </Head>
    <Flex
      sx={{
        p: [1, 10],
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
