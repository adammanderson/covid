export interface DataAttributes {
  created: string;
  countries: CountryAttributes[];
}

export interface CountryAttributes {
  name: string;
  mortalityRate: number;
  source: string;
  createdAt: string;
  totalCases?: number;
  authorities: LocalityAttributes;
  regions: LocalityAttributes;
}

export type LocalityKeys = 'regions' | 'authorities';

export interface LocalityAttributes {
  updatedAt: string;
  data: DataItemAttributes[];
}

export type DataItemAttributes = {
  label: string;
  confirmed: number;
}
