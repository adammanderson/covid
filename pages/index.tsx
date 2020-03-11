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
  groupAllRegionsByDate,
  getCountryTotals,
} from '../src/helpers';


const Home: NextPage<{ serverData: DataAttributes[]}> = ({ serverData }) => {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState(serverData);
  const {
    created,
    countries,
  } = data[data.length - 1];
  const activeDate = new Date(created);
  const confirmedByAuthority = countries.map((a) => a.authorities.data).flat().map(({ label, confirmed }) => ({ key: label, value: confirmed }));
  const confirmedByRegion = countries.map((a) => a.regions.data).flat().map(({ label, confirmed }) => ({ key: label, value: confirmed }));
  const totalActiveByRegion = { label: 'active', value: sumBy(confirmedByRegion, 'value') };
  const totalDeaths = { label: 'deaths', value: sumBy(countries.map((a) => a.mortalityRate)) };

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
              totalActiveByRegion,
              totalDeaths,
            ]}
          />
          <Totaler
            data={getCountryTotals(countries)}
          />
          {/* <Bar
            data={getRegionsByDate}
            height="100%"
            legend={false}
          /> */}
        </Flex>
        {/* <Mapper
          data={[
            ...regions,
            ...authorities,
          ]}
        /> */}
        <Flex
          sx={{
            flexDirection: 'column',
            flexBasis: '350px',
          }}
        >
          {/* <Bar
            data={regionDataByDateName}
            fixed
            height={150}
            lines={[
              {
                dataKey: 'active',
                color: 'yellow',
              },
              {
                dataKey: 'deaths',
                color: 'red',
              },
            ]}
          /> */}
          <DataList
            title="by region"
            data={confirmedByRegion}
          />
          <DataList
            title="by authority"
            data={confirmedByAuthority}
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
          <Text variant="small">
            Data sourced from
            {' '}
            <Link
              href="https://www.gov.uk/government/organisations/public-health-england"
              target="_blank"
              rel="noopener noreferrer"
            >
              Public Health England (PHE), UK Government
            </Link>
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
