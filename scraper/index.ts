const SOURCE_TYPES = {
  JSON: 'json',
  TABLE: 'table',
};

const EnglandAuthoritiesSource = {
  type: SOURCE_TYPES.JSON,
  endpoint: 'https://services1.arcgis.com/0IrmI40n5ZYxTUrV/arcgis/rest/services/CountyUAs_cases/FeatureServer/0/query?f=json&where=TotalCases%20%3C%3E%200&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=TotalCases%20desc&outSR=102100&resultOffset=0&resultRecordCount=1000&cacheHint=true',
};

const EnglandRegionsSource = {};
const ScotlandAuthoritiesSource = {};
const WalesTotalSource = {};
const NorthernIrelandSource = {};

export default {};
