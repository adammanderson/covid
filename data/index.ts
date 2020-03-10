export default async () => ({
  _20200305: await import('./20200305.json').then((d) => JSON.parse(JSON.stringify(d))),
  _20200306: await import('./20200306.json').then((d) => JSON.parse(JSON.stringify(d))),
  _20200307: await import('./20200307.json').then((d) => JSON.parse(JSON.stringify(d))),
  _20200308: await import('./20200308.json').then((d) => JSON.parse(JSON.stringify(d))),
  _20200309: await import('./20200309.json').then((d) => JSON.parse(JSON.stringify(d))),
});
