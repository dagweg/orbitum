export default function parseCookie(cookie: string): { [key: string]: string } {
  if (!cookie) {
    return {};
  }
  let cookies = cookie.split(",");
  let cookiez = cookies.reduce((acc, cur) => {
    return {
      ...acc,
      [cur.split("=")[0]]: cur.split("=")[1],
    };
  }, {});
  return cookiez;
}