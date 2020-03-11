import sumBy from 'lodash/sumBy';
import { CountryAttributes } from '../types';

export function getCountryTotals(countries: CountryAttributes[], country?: string) {
  const data = country ? countries.filter((c) => c.name === country) : countries;

  return data.map(({
    name,
    totalCases,
    authorities,
    regions,
  }) => ({
    label: name,
    value: sumBy(
      (authorities.data.length && authorities.data) ||
      (regions.data.length && regions.data),
      'confirmed',
    ) || totalCases,
  }));
}
