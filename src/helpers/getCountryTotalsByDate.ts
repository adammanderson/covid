import { format } from 'date-fns';
import sumBy from 'lodash/sumBy';
import { getConfirmedByCountry } from './getConfirmedByCountry';
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

    countries.forEach((country: CountryAttributes) => {
      const { name } = country;

      r = { ...r, [name]: getConfirmedByCountry(country) };
    });

    acc.push({
      name: created && format(new Date(created), 'dd/MM'),
      Deaths: sumBy(countries, 'mortalityRate'),
      ...r,
    });

    return acc;
  }, []);
}
