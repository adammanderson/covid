const importAndParse = (file: string) => (
  import(`${file}`)
    .then((d) => JSON.parse(JSON.stringify(d)))
);

export default async () => ({
  _20200305: await importAndParse('./20200305.json'),
  _20200306: await importAndParse('./20200306.json'),
  _20200307: await importAndParse('./20200307.json'),
  _20200308: await importAndParse('./20200308.json'),
  _20200309: await importAndParse('./20200309.json'),
  _20200310: await importAndParse('./20200310.json'),
});
