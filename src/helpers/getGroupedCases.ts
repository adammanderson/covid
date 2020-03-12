import {
  DataAttributes,
  ListAttributes,
  LocalityKeys,
  DataItemAttributes,
} from '../types';

export function getGroupedCases(
  data: DataAttributes[],
  locality: LocalityKeys,
): ListAttributes[] {
  const previous = data[data.length - 2]?.countries;
  const current = data[data.length - 1].countries;

  const getAdjustment = (name: string, confirmed: number): number => {
    if (!previous.length) return 0;
    const previousConfirmed = previous
      .flatMap((country) => country[locality].data)
      .find((l) => l.label === name);

    return previousConfirmed ? confirmed - previousConfirmed.confirmed : 0;
  };

  const group: DataItemAttributes[] = current.flatMap((country) => country[locality].data);

  return group.map(({ label, confirmed }) => ({
    label,
    value: confirmed,
    adjustment: getAdjustment(label, confirmed),
  }));
}
