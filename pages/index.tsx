import * as React from 'react';
import { NextPage } from 'next';
import {
  Shell,
  DataList,
} from '../src/components';
import data from '../data';

const Home: NextPage = () => {
  const activeData = data._7_3_20.data;
  const confirmedData = activeData.map(({ authority, confirmed }) => ({ key: authority, value: confirmed }));
  console.log(confirmedData);
  return (
    <Shell>
      <DataList
        title="Confirmed cases by authority"
        data={confirmedData}
      />
    </Shell>
  );
};

export default Home;
