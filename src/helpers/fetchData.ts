import fetch from 'isomorphic-unfetch';
import { buildRequestUrl } from './buildRequestUrl';

export const fetchData = async (req?) => {
  const sources = await fetch(buildRequestUrl('/data/sources.json', req))
    .then((response) => response.json());

  const data = await sources.map(async (item) => (
    fetch(buildRequestUrl(`/data/${item}`, req))
      .then((response) => response.json())
  ));

  return Promise.all(data);
};
