import sumBy from 'lodash/sumBy';
import { CountryAttributes } from '../types';

export function getConfirmedByCountry(country: CountryAttributes) {
  const { regions, authorities, totalCases } = country;
  const localityData = (regions.data.length && regions.data)
    || (authorities.data.length && authorities.data);

  return sumBy(localityData, 'confirmed') || totalCases;
}
