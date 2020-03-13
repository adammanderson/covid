const DATA_TYPES = {
  JSON: 'json',
  TABLE: 'table',
};

const SOURCES = [
  {
    dataType: DATA_TYPES.JSON,
    country: 'England',
    locality: 'regions',
    endpoint: 'https://services1.arcgis.com/0IrmI40n5ZYxTUrV/arcgis/rest/services/NHSR_Cases/FeatureServer/0/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=TotalCases%20desc&outSR=102100&resultOffset=0&resultRecordCount=25&cacheHint=true',
    parser: 'features[*].attributes.{label: NHSRNm, confirmed: TotalCases}',
  },
  {
    dataType: DATA_TYPES.JSON,
    country: 'England',
    locality: 'authorities',
    endpoint: 'https://services1.arcgis.com/0IrmI40n5ZYxTUrV/arcgis/rest/services/CountyUAs_cases/FeatureServer/0/query?f=json&where=TotalCases%20%3C%3E%200&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=TotalCases%20desc&outSR=102100&resultOffset=0&resultRecordCount=1000&cacheHint=true',
    parser: 'features[*].attributes.{label: GSS_NM, confirmed: TotalCases}',
  },
];

const EnglandRegionsSource = {};
const ScotlandAuthoritiesSource = {};
const WalesTotalSource = {};
const NorthernIrelandSource = {};

export default {};
