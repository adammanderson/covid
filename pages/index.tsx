import * as React from 'react';
import { NextPage } from 'next';
import { format } from 'date-fns';
import { Flex } from 'theme-ui';
import sumBy from 'lodash/sumBy';
import groupBy from 'lodash/groupBy';
import {
  Shell,
  DataList,
  Totaler,
  Header,
} from '../src/components';
import dataImport from '../data';

const Home: NextPage = () => {
  const { created, data } = dataImport._20200308;
  const activeDate = new Date(created);
  const confirmedData = data.map(({ authority, confirmed }) => ({ key: authority, value: confirmed }));
  const totalActive = { label: 'active cases', value: sumBy(data, 'confirmed') };
  const totalRecovered = { label: 'total recovered', value: sumBy(data, 'recovered') };
  const totalDead = { label: 'dead', value: sumBy(data, 'dead') };
  const unconfirmedItem = data.find(({ authority }) => authority === 'Awaiting confirmation');
  const totalUnconfirmed = { label: 'unconfirmed', value: unconfirmedItem?.confirmed };
  const grouped = groupBy(data, 'confirmed');
  console.log(grouped);

  return (
    <Shell>
      <Flex>
        <Header
          title="COVID-19 England"
          subtitle={`// ${format(activeDate, 'EEEE dd LLLL Y, kk:mm')} //`}
        />
      </Flex>
      <Flex>
        <Totaler
          title="Latest cases"
          data={[
            totalActive,
            totalRecovered,
          ]}
        />
      </Flex>
      <Flex>
        <DataList
          title="Active cases by authority"
          data={confirmedData}
        />
      </Flex>
      <Flex>
        <Totaler
          title="Mortality"
          data={[
            totalDead,
          ]}
        />
        <Totaler
          title="awaiting"
          data={[
            totalUnconfirmed,
          ]}
        />
      </Flex>
    </Shell>
  );
};

export default Home;
