import { getConfirmedByCountry } from './getConfirmedByCountry';
import { CountryAttributes, DataAttributes } from '../types';

export function getCountryTotals(data: DataAttributes[], countryName?: string) {
  const previous = data[data.length - 2]?.countries;
  const current = data[data.length - 1].countries;

  const filtered = (filterData: CountryAttributes[]) => {
    if (!countryName) return filterData;

    return filterData.filter((c) => c.name === countryName);
  };

  const getAdjustment = (name: string, confirmed: number): number => {
    if (!previous.length) return 0;
    const previousConfirmed = getConfirmedByCountry(
      previous.find((c) => c.name === name),
    );

    return previousConfirmed ? confirmed - previousConfirmed : 0;
  };

  return filtered(current).map((country: CountryAttributes) => {
    const { name, mortalityRate } = country;
    const confirmed = getConfirmedByCountry(country);

    return {
      label: name,
      deaths: mortalityRate,
      confirmed,
      adjustment: getAdjustment(name, confirmed),
    };
  });
}
