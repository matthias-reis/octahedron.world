export const getCookie = (key: string) => {
  const cookie = document ? document.cookie : '';
  const items: [string, string][] = cookie
    .split(';')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => s.split('=') as [string, string]);
  const cookies = items.reduce<Record<string, string>>(
    (res, [index, value]) => {
      res[index] = value;
      return res;
    },
    {}
  );
  return cookies[key];
};

export const setCookie = (key: string, value: string) => {
  if (document) {
    document.cookie = `${key}=${value}`;
  }
};
