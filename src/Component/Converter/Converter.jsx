/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import './Converter.css';
import {
  FcCurrencyExchange,
  FcMoneyTransfer,
  FcDownRight,
  FcDownLeft,
} from 'react-icons/fc';

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
    <div className="currency-container">
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
        <div id="balanceSection">
          <h1> CURRENCY-WALLET</h1>
          <div className="balance-holder">
            <div className="balance">
              <h2>BALANCE</h2>
              <p>{amounts.USD.amnt}</p>
            </div>
            <p>
              <FcCurrencyExchange />
              <FcMoneyTransfer />
            </p>
            <button className="showform-btn" type="button" onClick={toggleForm}>
              topUP
            </button>
          </div>
        </div>
        <div className="currencies">
          <div className="currency-one">
            <div className="flag1">
              <h2> USA </h2>
            </div>
            <h1>
              {amounts.USD.amnt} {amounts.USD.sign}
            </h1>
          </div>
          <h1>
            <FcDownRight />
            <FcDownLeft />
          </h1>
          <div className="currency-two">
            <div className="flag2">
              <h2>EUR</h2>
            </div>
            <h1>
              {amounts.EUR.amnt} {amounts.EUR.sign}
            </h1>
          </div>
          <h1>
            <FcDownRight />
            <FcDownLeft />
          </h1>

          <div className="currency-three">
            <div className="flag3">
              <h2>XAF</h2>
            </div>
            <h1>
              {amounts.XAF.amnt} {amounts.XAF.sign}
            </h1>
          </div>
        </div>
        <div className="maincurrency-holder">
          <h1>Convert Below</h1>
          <p>
            <input id="amount" type="number" placeholder="amount" />
          </p>
          <div className="currency-header">
            <input id="from" type="text" placeholder="from" />
            <input id="to" type="text" placeholder="to" />
          </div>
          <div className="converter">
            <button type="submit">Convert</button>
            <p> </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Converter;
