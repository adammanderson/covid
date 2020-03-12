import * as React from 'react';
import { NextPage } from 'next';
import { format } from 'date-fns';
import { Flex, Link, Text } from 'theme-ui';
import sumBy from 'lodash/sumBy';
import { DataAttributes } from '../src/types';
import {
  Shell,
  DataList,
  Totaler,
  Header,
  Bar,
  Notice,
  Mapper,
  Fetcher,
} from '../src/components';
import {
  fetchData,
  getLocalitiesByDate,
  getCountryTotalsByDate,
  getCountryTotals,
  getGroupedCases,
} from '../src/helpers';


const Home: NextPage<{ serverData: DataAttributes[]}> = ({ serverData }) => {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState(serverData);
  const {
    created,
    countries,
  } = data[data.length - 1];
  const activeDate = new Date(created);
  const totalCases = { label: 'active', value: sumBy(getCountryTotals(countries), 'confirmed') };
  const totalDeaths = { label: 'deaths', value: sumBy(getCountryTotals(countries), 'deaths') };
  const totalsByCountry = getCountryTotals(countries).map(({ label, confirmed }) => ({ label, value: confirmed }));

  const handleFetchData = async () => {
    setLoading(true);
    const newData: any[] = await fetchData();
    setData(newData);
    setLoading(false);
  };

  React.useEffect(() => {
    const fetchTimer = setInterval(async () => {
      handleFetchData();
    }, 600000);
    return () => clearInterval(fetchTimer);
  }, []);

  return (
    <Shell>
      <Flex
        sx={{
          flex: 1,
          flexDirection: ['column', 'row'],
          justifyContent: 'space-between',
        }}
      >
        <Flex
          sx={{
            flexDirection: 'column',
            flexBasis: '350px',
          }}
        >
          <Header
            title="COVID-19 UK"
            subtitle={`// ${format(activeDate, 'EEEE dd LLLL Y, kk:mm')}`}
          />
          <Totaler
            title="Latest cases"
            data={[
              totalCases,
              totalDeaths,
            ]}
          />
          <Totaler
            data={totalsByCountry}
          />
          <Bar
            title="Cases by English Region"
            data={getLocalitiesByDate(data, 'regions')}
            height="100%"
          />
        </Flex>
        <Mapper
          data={[
            ...getGroupedCases(countries, 'regions'),
            ...getGroupedCases(countries, 'authorities'),
            ...totalsByCountry,
          ]}
        />
        <Flex
          sx={{
            flexDirection: 'column',
            flexBasis: '350px',
          }}
        >
          <Bar
            title="Cases/deaths by country"
            data={getCountryTotalsByDate(data)}
            fixed
            height={150}
            lines={[
              {
                dataKey: 'England',
                color: 'yellow',
              },
              {
                dataKey: 'Scotland',
                color: 'yellow',
              },
              {
                dataKey: 'Wales',
                color: 'yellow',
              },
              {
                dataKey: 'Northern Ireland',
                color: 'yellow',
              },
              {
                dataKey: 'Deaths',
                color: 'red',
              },
            ]}
          />
          <DataList
            title="by region"
            data={getGroupedCases(countries, 'regions')}
          />
          <DataList
            title="by authority"
            data={getGroupedCases(countries, 'authorities')}
          />
        </Flex>
      </Flex>
      <Flex
        sx={{
          order: [4],
          flexBasis: '30px',
        }}
      >
        <Notice>
          <Text variant="tiny">
            Data sources:
            {' '}
            {countries.map((c) => c.source).join('/')}
            . Do not rely on this data for medical guidance.
            Data is subject to changes/corrections.
          </Text>
          <Fetcher
            loading={loading}
            onClick={() => handleFetchData()}
          />
        </Notice>
      </Flex>
    </Shell>
  );
};

export async function getServerSideProps({ req }) {
  const serverData = await fetchData(req);

  return {
    props: {
      serverData,
    },
  };
}

export default Home;
