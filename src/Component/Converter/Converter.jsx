/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import './Converter.css';

function Converter() {
  const [currency, setCurrency] = useState([]);
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('');
  const [showForm, setShowForm] = useState(true);

  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };

  // const [output, setOutput] = useState(0);
  const [amounts, setAmounts] = useState({
    USD: { amnt: 0, sign: 'USD' },
    EUR: { amnt: 0, sign: 'EUR' },
    XAF: { amnt: 0, sign: 'XAF' },
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

  const handleSubmitTopUP = (AMT, currSign) => {
    const Holder = amounts;
    Holder[currSign].amnt += AMT;
    setAmounts(Holder);
  };

  function handleConversion(departureCurrency, arrivalCurrency, amount) {
    if (
      amount <= amounts[departureCurrency].amnt &&
      arrivalCurrency !== departureCurrency &&
      amount >= 0
    ) {
      const result =
        (amount / currency.results[departureCurrency]) *
        currency.results[arrivalCurrency];

      const newAmount = amounts;

      console.log('this results', typeof result);

      newAmount[departureCurrency].amnt -= amount;
      newAmount[arrivalCurrency].amnt += +result.toFixed(1);

      console.log('this newAmount', newAmount[arrivalCurrency].amnt);

      setAmounts({ ...newAmount });
    } else {
      if (amount > amounts[departureCurrency].amnt) {
        alert('ERROR! Insufficient balance');
      }
      if (arrivalCurrency === departureCurrency) {
        alert('ERROR! Redundant conversion');
      } else {
        alert('ERROR! Will not convert negative funds');
      }
    }
  }

  return (
    <>
      {showForm && (
        <div className="form-overlay">
          <form
            className=" topup-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmitTopUP(
                +e.target.elements.Amount.value,
                e.target.elements.Currency.value
              );
              console.log('this e', e);
              toggleForm();
            }}
          >
            <button type="button" onClick={toggleForm}>
              Cancel
            </button>
            <label htmlFor="Amout">Input Amount</label>
            <div className="input-div">
              <input
                type="number"
                autoFocus
                step="any"
                id="Amount"
                placeholder="Input Amount to topUP"
              />
              <select id="Currency">
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="XAF">XAF</option>
              </select>
            </div>
            <button type="submit">topUP</button>
          </form>
        </div>
      )}

      <form
        className="currency-container"
        onSubmit={(e) => {
          e.preventDefault();
          handleConversion(
            e.target.elements.from.value,
            e.target.elements.to.value,
            +e.target.elements.amount.value
          );
        }}
      >
        <h1> CURRENCY-WALLET</h1>
        <div className="balance-holder">
          <div className="balance">
            <h3>TOTAL-BALANCE</h3>
            <p>{amounts.USD.amnt}</p>
          </div>
          <button className="showform-btn" type="button" onClick={toggleForm}>
            topUP
          </button>
        </div>
        <div className="currencies">
          <div className="currency-one">
            <h1>
              {amounts.USD.amnt} {amounts.USD.sign}
            </h1>
          </div>

          <div className="currency-two">
            <h1>
              {amounts.EUR.amnt} {amounts.EUR.sign}
            </h1>
          </div>

          <div className="currency-three">
            <h1>
              {amounts.XAF.amnt} {amounts.XAF.sign}
            </h1>
          </div>
        </div>
        <div className="maincurrency-holder">
          <p>
            <input id="amount" type="number" placeholder="amount" />
          </p>
          <div className="currency-header">
            <h2>From:</h2>
            <input id="from" type="text" placeholder="currency" />
            <h2>To:</h2>
            <input id="to" type="text" placeholder="currency" />
          </div>
          <div className="converter">
            <button type="submit">Convert</button>
            <p> </p>
          </div>
        </div>
      </form>
    </>
  );
}

export default Converter;
