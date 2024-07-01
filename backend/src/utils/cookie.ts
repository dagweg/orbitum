export default function parseCookie(cookie: string): { [key: string]: string } {
  if (!cookie) {
    return {};
  }
  const cookies = cookie.split(";");
  const cookiez = cookies.reduce((acc, cur) => {
    return {
      ...acc,
      [cur.split("=")[0].trim()]: cur.split("=")[1].trim(),
    };
  }, {});
  return cookiez;
}
