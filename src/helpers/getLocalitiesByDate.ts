import { format } from 'date-fns';
import {
  DataAttributes,
  CountryAttributes,
  LocalityKeys,
} from '../types';

interface AccAttributes {
  name: string;
  [key: string]: string | number;
}

export function getLocalitiesByDate(data: DataAttributes[], locality: LocalityKeys) {
  return data.reduce((acc: AccAttributes[], { created, countries }: DataAttributes) => {
    let r = {};

    countries.forEach((country: CountryAttributes) => {
      const countryData = country[locality].data;

      if (!countryData.length) return;

      countryData.forEach(({ label, confirmed }) => {
        r = { ...r, [label]: confirmed };
      });

      acc.push({
        name: created && format(new Date(created), 'dd/MM'),
        ...r,
      });
    });

    return acc;
  }, []);
}
