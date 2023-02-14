import { countryToCurrency } from './countryToCurrency';
import { ipinfo } from './ipinfo';
import { localiseElements } from './localiseElements';

export const localisation = async () => {
  const toLocalise = document.querySelectorAll('[data-localise-values]');
  if (!toLocalise) return;

  let currencyCode = localStorage.getItem('currencyCode');
  if (!currencyCode) {
    // get IP info
    const info = await ipinfo();

    /**
     * define the accepted currencies
     * the first of which will be taken as the default
     */
    const acceptedCurrencies = ['GBP', 'USD', 'EUR'];
    const userCurrencyCode = countryToCurrency[info.country];
    currencyCode = acceptedCurrencies.includes(userCurrencyCode)
      ? userCurrencyCode
      : acceptedCurrencies[0];
  }

  localiseElements(toLocalise, currencyCode);
  localStorage.setItem('currencyCode', currencyCode);

  const localiseButtons = [...document.querySelectorAll('[data-localise-region]')];
  localiseButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const region = button.dataset.localiseRegion;
      localiseElements(toLocalise, region);
      localStorage.setItem('currencyCode', region);
    });
  });

  /**
   * 1. check if there is a localstate variable containing their currency
   *    a. show that currency
   *    b. end
   * 2. get the users location
   * 3. get their currency
   * 4. set the currency code to use (£, $ or €)
   *    a. save in localstate variable
   * 5. show elements in said currency
   * 6. wait for user to change their desired locale
   *    a. show updated currency when changed
   *
   */
};
