export const buildRequestUrl = (path: string, req) => {
  if (!req && typeof window !== 'undefined') return path;

  const isDev = process.env.NODE_ENV === 'development';
  const host = req
    ? req.headers['x-forwarded-host'] || req.headers.host
    : window.location.host;
  const proto = req
    ? req.headers['x-forwarded-proto'] || (isDev ? 'http' : 'https')
    : window.location.protocol.slice(0, -1);
  return `${proto}://${host}${path}`;
};
