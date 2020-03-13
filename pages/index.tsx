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
  const { created, countries } = data[data.length - 1];
  const activeDate = new Date(created);
  const totalCases = { label: 'active', value: sumBy(getCountryTotals(data), 'confirmed') };
  const totalDeaths = { label: 'deaths', value: sumBy(getCountryTotals(data), 'deaths') };
  const totalsByCountry = getCountryTotals(data).map(({ label, confirmed, adjustment }) => ({ label, value: confirmed, adjustment }));

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
            flexFlow: 'column',
            flex: 1,
          }}
        >
          <Flex
            sx={{
              flexDirection: ['column', 'row'],
            }}
          >
            <Header
              title="COVID-19 UK"
              subtitle={`// ${format(activeDate, 'EEEE dd LLLL Y, kk:mm')}`}
            />
            <Totaler
              data={totalsByCountry}
            />
          </Flex>
          <Flex
            sx={{
              flex: 1,
              flexDirection: ['column', 'row'],
            }}
          >
            <Flex
              sx={{
                flexDirection: 'column',
                flexBasis: ['auto', '350px'],
              }}
            >
              <Totaler
                title="Latest cases"
                fixed
                data={[
                  totalCases,
                  totalDeaths,
                ]}
              />
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
                    dataKey: 'NI',
                    color: 'yellow',
                  },
                  {
                    dataKey: 'Deaths',
                    color: 'red',
                  },
                ]}
              />
              <Bar
                title="Cases by English Region"
                data={getLocalitiesByDate(data, 'regions')}
                height="100%"
              />
            </Flex>
            <Flex
              sx={{
                flex: 1,
                flexDirection: 'column',
              }}
            >
              <Mapper
                data={[
                  ...getGroupedCases(data, 'regions'),
                  ...getGroupedCases(data, 'authorities'),
                  ...totalsByCountry,
                ]}
              />
            </Flex>
          </Flex>
        </Flex>
        <Flex
          sx={{
            flexDirection: 'column',
            flexBasis: '350px',
          }}
        >
          <DataList
            title="by region"
            data={getGroupedCases(data, 'regions')}
          />
          <DataList
            title="by authority"
            data={getGroupedCases(data, 'authorities')}
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
