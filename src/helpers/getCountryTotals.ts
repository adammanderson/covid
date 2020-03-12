import sumBy from 'lodash/sumBy';
import { CountryAttributes } from '../types';

export function getCountryTotals(countries: CountryAttributes[], country?: string) {
  const data = country ? countries.filter((c) => c.name === country) : countries;

  return data.map(({
    name,
    totalCases,
    mortalityRate,
    authorities,
    regions,
  }) => ({
    label: name,
    deaths: mortalityRate,
    confirmed: sumBy(
      (regions.data.length && regions.data)
      || (authorities.data.length && authorities.data),
      'confirmed',
    ) || totalCases,
  }));
}
