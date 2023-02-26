export const apiCalls = async (url, method, jsondata = '') => {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  if (method === 'POST') {
    options.body = JSON.stringify(jsondata);
  }
  const apiUrl = `${process.env.REACT_APP_BASE_URL}${url}`;
  const response = await fetch(apiUrl, options);
  const data = await response.json();
  return data;
};
