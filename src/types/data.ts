export interface DataAttributes {
  created: string;
  countries: CountryAttributes[];
}

export type CountryAttributes = {
  name: string;
  mortalityRate: number;
  createdAt: string;
  totalCases?: number;
  authorities: LocalityAttributes;
  regions: LocalityAttributes;
}

interface LocalityAttributes {
  updatedAt: string;
  data: DataItemAttributes[];
}

type DataItemAttributes = {
  label: string;
  confirmed: number;
}
