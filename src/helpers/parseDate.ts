export function parseDate(date: string) {
  const strippedDate = date.replace('_', '');
  const year = parseInt(strippedDate.substring(0, 4), 10);
  const month = parseInt(strippedDate.substring(5, 7), 10) - 1;
  const day = parseInt(strippedDate.substring(8, 10), 10);

  return new Date(year, month, day);
}
