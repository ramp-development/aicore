import { countryToCurrency } from './countryToCurrency';
import { ipinfo } from './ipinfo';

export const getCodes = async () => {
  let countryCode = localStorage.getItem('countryCode'),
    region = localStorage.getItem('region'),
    currencyCode = localStorage.getItem('currencyCode');

  if (!countryCode || !region) {
    const info = await ipinfo();
    countryCode = info.country;
    region = info.region;
  }

  if (!currencyCode) {
    /**
     * define the accepted currencies
     * the first of which will be taken as the default
     */
    const acceptedCurrencies = ['GBP', 'USD', 'EUR'];
    const userCurrencyCode = countryToCurrency[countryCode];
    currencyCode = acceptedCurrencies.includes(userCurrencyCode)
      ? userCurrencyCode
      : acceptedCurrencies[0];
  }

  const codes = {
    countryCode,
    region,
    currencyCode,
  };

  for (const [key, value] of Object.entries(codes)) {
    if (!value) return;
    localStorage.setItem(key, value);
    window.aiCoreParams[key] = value;
  }

  return codes;
};
