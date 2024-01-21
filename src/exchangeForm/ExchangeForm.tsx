import { useState, ChangeEvent, useEffect } from "react";
import styles from "./exchangeForm.module.sass";

interface Currency {
  rates: {
    [key: string]: number;
  };
  base: string;
  date: string;
}

function ExchangeForm() {
  const [currencies, setCurrencies] = useState<Currency>({
    rates: {},
    base: "",
    date: "",
  });
  const [amount, setAmount] = useState(0);
  const [currency1, setCurrency1] = useState(0);
  const [currency2, setCurrency2] = useState(0);
  const [currencyCode, setCurrencyCode] = useState("");
  const [result, setResult] = useState("");
  const [isCalculated, setIsCalculated] = useState(false);
  const hasCurrenciesData = Object.keys(currencies.rates || {}).length > 0;
  const apiKey =
    "https://api.currencybeacon.com/v1/latest?api_key=qrnbYMImZUP0BgTRSEvfq8fQmJSDuHOR";

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const convertedValue = Number(inputValue);
    setAmount(convertedValue);
  };

  const handleCurrency1Change = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedCurrencyCode = e.target.value;
    const selectedCurrencyRate = currencies.rates[selectedCurrencyCode];
    setCurrency1(selectedCurrencyRate);
  };

  const handleCurrency2Change = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedCurrencyCode = e.target.value;
    const selectedCurrencyRate = currencies.rates[selectedCurrencyCode];
    setCurrencyCode(selectedCurrencyCode);
    setCurrency2(selectedCurrencyRate);
  };

  const calculateExchange = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (amount > 0) {
      const equation1 = currency1 / amount;
      const equation2 = currency2 / equation1;
      const formattedNumber = equation2.toFixed(2);
      setResult(`${formattedNumber} ${currencyCode}`);
      setIsCalculated(true);
      window.alert;
    } else {
      window.alert("Wprowadź poprawną kwotę");
    }
  };

  const resultStyle = {
    lineHeight: isCalculated ? "4.875rem" : "2.4375rem",
  };

  useEffect(() => {
    fetch(apiKey)
      .then((res) => res.json())
      .then((result) => {
        setCurrencies(result);

        const currencyCodes = Object.keys(result.rates);
        const initialCurrencyCode1 = currencyCodes[0];
        const initialCurrencyCode2 = currencyCodes[0];

        setCurrency1(result.rates[initialCurrencyCode1]);
        setCurrency2(result.rates[initialCurrencyCode2]);
      })
      .catch((error) => {
        console.error("Error fetching resources:", error);
      });
  }, []);

  return (
    <>
      <div className={styles.formBox}>
        <form className={styles.currencyForm}>
          <div className={styles.amount}>
            <input
              type="text"
              placeholder="Wpisz kwotę"
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.selFields}>
            <div>
              <div className={styles.selContainer}>
                <h2>Mam:</h2>
                <div className={styles.sel}>
                  <select
                    className={styles.currency}
                    onChange={handleCurrency1Change}
                  >
                    {hasCurrenciesData &&
                      Object.keys(currencies.rates).map((currencyCode) => (
                        <option key={currencyCode} value={currencyCode}>
                          {currencyCode}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div className={styles.selContainer}>
                <h2>Chcę:</h2>
                <div className={styles.sel}>
                  <select
                    className={styles.currency}
                    onChange={handleCurrency2Change}
                    defaultValue={Object.keys(currencies.rates)[1]}
                  >
                    {hasCurrenciesData &&
                      Object.keys(currencies.rates).map((currencyCode) => (
                        <option key={currencyCode} value={currencyCode}>
                          {currencyCode}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>
            <div className={styles.arrow}></div>
            <div className={styles.resBox}>
              <textarea
                className={styles.result}
                style={resultStyle}
                placeholder="Kwota po przeliczeniu"
                value={result}
                readOnly
              />
            </div>
          </div>
          <div className={styles.count}>
            <button onClick={calculateExchange}>Przelicz</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ExchangeForm;
