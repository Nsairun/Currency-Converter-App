/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import fetchCurrency from './api';

function useFetch() {
  const [currency, setCurrency] = useState({
    USD: { Abr: 'USD' },
    EUR: { Abr: 'EUR' },
    XAF: { Abr: 'XAF' },
  });

  useEffect(() => {
    fetchCurrency.then((response) => setCurrency(response));
  }, []);

  return [currency, setCurrency];
}

export default useFetch;
