export const ipinfo = async () => {
  const TOKEN = '74d1aaddf3b069';
  const request = await fetch(`https://ipinfo.io/json?token=${TOKEN}`);
  const response = await request.json();

  return response;
};
