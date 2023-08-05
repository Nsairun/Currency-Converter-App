/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import './Converter.css';
import { FcDownRight, FcDownLeft } from 'react-icons/fc';
import SelectDrop from '../SelectDrop/SelectDrop';

function Converter() {
  const [currency, setCurrency] = useState({});
  const [showForm, setShowForm] = useState(true);
  const [defaultCur, setDefaultCur] = useState('USD');
  const [balance, setBalance] = useState(0);
  const [erro, setErro] = useState();

  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };

  const [amounts, setAmounts] = useState({
    USD: { amnt: 0, sign: 'USD' },
    EUR: { amnt: 0, sign: 'EUR' },
    XAF: { amnt: 0, sign: 'XAF' },
  });

  const options = { method: 'GET', headers: { accept: 'application/json' } };
  const ApiKey = 'e75ba0cc2b-4a89161914-ryrx8s';

  useEffect(() => {
    fetch(
      `https://api.fastforex.io/fetch-all?from=EUR&api_key=${ApiKey}`,
      options
    )
      .then((response) => response.json())
      .then((response) => setCurrency(response))
      .catch((err) => console.error('error ocured', err));
  }, []);

  const handleSubmitTopUP = (AMT, currSign) => {
    const Holder = amounts;
    Holder[currSign].amnt += AMT;
    console.log('holder: ', Holder);

    setAmounts(Holder);
  };

  function handleConversion(departureCurrency, arrivalCurrency, amount) {
    if (
      amount <= amounts[departureCurrency].amnt &&
      arrivalCurrency !== departureCurrency &&
      amount >= 0 &&
      currency.results
    ) {
      const result =
        (amount / currency.results[departureCurrency]) *
        currency.results[arrivalCurrency];

      const newAmount = amounts;

      newAmount[departureCurrency].amnt -= amount;
      newAmount[arrivalCurrency].amnt += +result.toFixed(1);

      setAmounts({ ...newAmount });
      return result;
    }
    if (amount > amounts[departureCurrency].amnt) {
      setErro('ERROR! Insufficient balance');
    }
    if (arrivalCurrency === departureCurrency) {
      setErro('ERROR! Redundant conversion');
      return undefined;
    }
    setErro('ERROR! Will not convert negative funds');
    return undefined;
  }

  React.useEffect(() => {
    const accountBalance = Object.keys(amounts)
      .map(
        (key) =>
          currency.results &&
          (amounts[key].amnt / currency.results[key]) *
            currency.results[`${defaultCur}`]
      )
      .reduce((a, b) => a + b, 0);

    setBalance(
      () => !Number.isNaN(accountBalance) && Math.round(accountBalance)
    );
  }, [amounts.USD.amnt, amounts.EUR.amnt, amounts.XAF.amnt, defaultCur]);

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
              <SelectDrop id="Currency" />
            </div>
            <button type="submit">topUP</button>
          </form>
        </div>
      )}

      <div className="currency-container">
        <div id="balanceSection">
          <h1> CURRENCY-WALLET</h1>
          <div className="balance-holder">
            <form
              className="balance"
              onChange={(e) => setDefaultCur(e.target.value)}
            >
              <div className="total">
                <h4>{erro}</h4>
                <h2>BALANCE</h2>
                <p>{balance}</p>
                <SelectDrop id="defaultCurr" />
              </div>
            </form>

            <p>CHART SECTION</p>
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

        <form
          className="maincurrency-holder"
          onSubmit={(e) => {
            e.preventDefault();
            handleConversion(
              e.target.elements.from.value,
              e.target.elements.to.value,
              +e.target.elements.amount.value
            );
          }}
        >
          <h1>Convert and Transfer Below</h1>
          <p>
            <input id="amount" type="number" placeholder="amount" />
          </p>
          <div className="currency-header">
            <SelectDrop id="from" />
            <SelectDrop id="to" />
          </div>
          <div className="converter">
            <button type="submit">Convert</button>
            <p> </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Converter;
