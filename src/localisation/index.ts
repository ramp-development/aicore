import { getCodes } from './getCodes';
import { localiseElements } from './localiseElements';

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

export const localisation = async () => {
  const toLocalise = document.querySelectorAll('[data-localise-values]');
  if (!toLocalise) return;

  const codes = await getCodes();

  localiseElements(toLocalise, codes?.currencyCode);

  const localiseButtons = [...document.querySelectorAll('[data-localise-currency]')];
  localiseButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const currencyCode = button.dataset.localiseCurrency;
      localiseElements(toLocalise, currencyCode);
      localStorage.setItem('currencyCode', currencyCode);
      window.aiCoreParams.currencyCode = currencyCode;
    });
  });
};
