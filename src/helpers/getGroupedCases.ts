import {
  CountryAttributes,
  ListAttributes,
  LocalityKeys,
  DataItemAttributes,
} from '../types';

export function getGroupedCases(
  countries: CountryAttributes[],
  locality: LocalityKeys,
): ListAttributes[] {
  const group: DataItemAttributes[] = countries.flatMap((country) => country[locality].data);

  return group.map(({ label, confirmed }) => ({
    label,
    value: confirmed,
  }));
}
