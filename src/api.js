const options = { method: 'GET', headers: { accept: 'application/json' } };
const ApiKey = '94f69ec9a6-dfb543855c-rppqdz';

function fetchCurrency() {
  return fetch(
    `https://api.fastforex.io/fetch-all?api_key=${ApiKey}`,
    options
  ).then((res) => res.json());
}

export default fetchCurrency;
