/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import './Converter.css';

function Converter() {
  const [currency, setCurrency] = useState([]);
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('');
  // const [output, setOutput] = useState(0);
  const [amounts, setAmounts] = useState({
    USD: { amnt: 100, sign: 'USD' },
    EUR: { amnt: 500, sign: 'EUR' },
    XAF: { amnt: 1000, sign: 'XAF' },
  });

  const options = { method: 'GET', headers: { accept: 'application/json' } };
  const ApiKey = '94f69ec9a6-dfb543855c-rppqdz';

  useEffect(() => {
    fetch(
      `https://api.fastforex.io/fetch-all?from=EUR&api_key=${ApiKey}`,
      options
    )
      .then((response) => response.json())
      .then((response) => setCurrency(response))
      .catch((err) => console.error('error ocured', err));
  }, []);

  // function swappCurrency() {
  //   const swapp = from;
  //   setFrom(to);
  //   setTo(swapp);
  // }

  function handleSubmit(departureCurrency, arrivalCurrency, amount) {
    if (
      amount <= amounts[departureCurrency].amnt &&
      arrivalCurrency !== departureCurrency
    ) {
      const result =
        (amount / currency.results[departureCurrency]) *
        currency.results[arrivalCurrency];

      const newAmount = amounts;

      newAmount[departureCurrency].amnt -= amount;
      newAmount[arrivalCurrency].amnt += result.toFixed(2);

      setAmounts({ ...newAmount });
    } else {
      alert('ERROR!');
    }
  }

  return (
    <form
      className="currency-container"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(
          e.target.elements.from.value,
          e.target.elements.to.value,
          e.target.elements.amount.value
        );
      }}
    >
      <h1> CURRENCY-WALLET</h1>
      <div>
        <h3>TOTAL-BALANCE</h3>
      </div>
      <div className="currencies">
        <div className="currency-one">
          <h1>
            {amounts.USD.amnt} {amounts.USD.sign}
          </h1>
        </div>
        <i className="fa-sharp fa-solid fa-people-arrows" />

        <div className="currency-two">
          <h1>
            {amounts.EUR.amnt} {amounts.EUR.sign}
          </h1>
        </div>
        <i className="fa-sharp fa-solid fa-people-arrows" />

        <div className="currency-three">
          <h1>
            {amounts.XAF.amnt} {amounts.XAF.sign}
          </h1>
        </div>
      </div>
      <p>
        <input id="amount" type="number" placeholder="amount" />
      </p>
      <div className="currency-header">
        <h2>From</h2>
        <input id="from" type="text" placeholder="currency" />
        <h2>To</h2>
        <input id="to" type="text" placeholder="currency" />
      </div>
      <div className="converter">
        <button type="submit">Convert</button>
        <p> </p>
      </div>
    </form>
  );
}

export default Converter;
