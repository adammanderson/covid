import * as React from 'react';
import { NextPage } from 'next';
import { format } from 'date-fns';
import { Flex, Link, Text } from 'theme-ui';
import { motion } from 'framer-motion';
import { Wifi } from 'react-feather';
import sumBy from 'lodash/sumBy';
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
  groupRegionByDateName,
  groupAllRegionsByDate,
} from '../src/helpers';

interface DataAttributes {
  created: string;
  mortalityRate: number;
  authorities: any[];
  regions: any[];
}

const Home: NextPage<{ serverData: DataAttributes[]}> = ({ serverData }) => {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState(serverData);
  const {
    created,
    mortalityRate,
    authorities,
    regions,
  } = data[data.length - 1];
  const activeDate = new Date(created);
  const confirmedByAuthority = authorities.map(({ label, confirmed }) => ({ key: label, value: confirmed }));
  const confirmedByRegion = regions.map(({ label, confirmed }) => ({ key: label, value: confirmed }));
  const totalActiveByRegion = { label: 'active cases', value: sumBy(regions, 'confirmed') };
  const totalDead = { label: 'dead', value: mortalityRate };
  const regionDataByDateName = groupRegionByDateName(data);
  const allRegionsByDate = groupAllRegionsByDate(data);

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
            title="COVID-19 England"
            subtitle={`// ${format(activeDate, 'EEEE dd LLLL Y, kk:mm')}`}
          />
          <Totaler
            title="Latest cases"
            data={[
              totalActiveByRegion,
              totalDead,
            ]}
          />
          <Bar
            data={regionDataByDateName}
            fixed
            lines={[
              {
                dataKey: 'active',
                color: 'yellow',
              },
              {
                dataKey: 'dead',
                color: 'red',
              },
            ]}
          />
          <Bar
            title="Cases by region"
            data={allRegionsByDate}
            height="100%"
            legend={false}
          />
        </Flex>
        <Mapper
          regions={regions}
          authorities={authorities}
        />
        <Flex
          sx={{
            flexDirection: 'column',
            flexBasis: '350px',
          }}
        >
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
            This app sources data from
            {' '}
            <Link
              href="https://www.gov.uk/government/organisations/public-health-england"
              target="_blank"
              rel="noopener noreferrer"
            >
              Public Health England (PHE), UK Government
            </Link>
            . Do not rely on this data for medical guidance.
            Always raise health concerns with your GP.
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
