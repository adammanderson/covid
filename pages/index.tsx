import * as React from 'react';
import { NextPage } from 'next';
import { format } from 'date-fns';
import { Flex, Text } from 'theme-ui';
import sumBy from 'lodash/sumBy';
import {
  Shell,
  DataList,
  Totaler,
  Header,
  Bar,
  Notice,
} from '../src/components';
import dataImport from '../data';
import { groupRegionByDateName, groupAllRegionsByDate } from '../src/helpers';

const Home: NextPage = () => {
  const dataArray = Object.values(dataImport);
  const { created, mortalityRate, authorities, regions } = dataArray[dataArray.length - 1];
  const activeDate = new Date(created);
  const confirmedByAuthority = authorities.map(({ label, confirmed }) => ({ key: label, value: confirmed }));
  const confirmedByRegion = regions.map(({ label, confirmed }) => ({ key: label, value: confirmed }));
  const totalActiveByRegion = { label: 'active cases', value: sumBy(regions, 'confirmed') };
  const totalDead = { label: 'dead', value: mortalityRate };
  const regionDataByDateName = groupRegionByDateName(dataImport);
  const allRegionsByDate = groupAllRegionsByDate(dataImport);

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
            height={295}
            legend={false}
          />
        </Flex>
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
          flexBasis: '30px',
        }}
      >
        <Notice>
          <Text variant="small">
            Data sources:
            Public Health England (PHE)
          </Text>
        </Notice>
      </Flex>
    </Shell>
  );
};

export default Home;
