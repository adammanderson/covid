import { format } from 'date-fns';
import sumBy from 'lodash/sumBy';

import {
  CountryAttributes,
  DataAttributes,
} from '../types';

interface AccAttributes {
  name: string;
  [key: string]: string | number;
}

export function getCountryTotalsByDate(data: DataAttributes[]) {
  return data.reduce((acc: AccAttributes[], { created, countries }: DataAttributes) => {
    let r = {};

    countries.forEach(({ name, regions, authorities, totalCases }: CountryAttributes) => {
      const localityData = (authorities.data.length && authorities.data) || (regions.data.length && regions.data);
      const totalConfirmed = sumBy(localityData, 'confirmed') || totalCases;

      r = { ...r, [name]: totalConfirmed };
    });

    acc.push({
      name: created && format(new Date(created), 'dd/MM'),
      Deaths: sumBy(countries, 'mortalityRate'),
      ...r,
    });

    return acc;
  }, []);
}
