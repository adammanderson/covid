import sumBy from 'lodash/sumBy';
import { format } from 'date-fns';

interface AccAttributes {
  name: string;
  active?: string | number;
  dead?: string | number;
  recovered?: string | number;
}

export function groupRegionByDateName(rawData: any) {
  return Object.values(rawData).reduce((acc: AccAttributes[], { created, mortalityRate, regions }: any) => {
    acc.push({
      name: format(new Date(created), 'dd/MM'),
      active: sumBy(regions, 'confirmed'),
      dead: mortalityRate,
    });

    return acc;
  }, []);
}
