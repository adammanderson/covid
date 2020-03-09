import { format } from 'date-fns';

interface AccAttributes {
  name: string;
  [key: string]: string | number;
}

export function groupAllRegionsByDate(rawData: any) {
  return Object.values(rawData).reduce((acc: AccAttributes[], { created, mortalityRate, regions }: any) => {
    let r = {};

    regions.forEach(({ label, confirmed }: { label: string; confirmed: number }) => {
      r = { ...r, [label]: confirmed };
    });

    acc.push({
      name: format(new Date(created), 'dd/MM'),
      ...r,
    });

    return acc;
  }, []);
}
