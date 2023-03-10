export const localiseElements = (toLocalise: [], currency: 'GBP' | 'USD' | 'EUR') => {
  const localiseButtons = [...document.querySelectorAll('[data-localise-currency]')];
  localiseButtons.forEach((button) => {
    button.classList.remove('is-current');
    if (button.dataset.localiseCurrency === currency) button.classList.add('is-current');
  });

  toLocalise.forEach((element) => {
    const type = element.dataset.localiseType;
    const values = element.dataset.localiseValues.split(',');
    let localiseTo;
    switch (currency) {
      case 'GBP':
        localiseTo = values[0].trim();
        break;
      case 'USD':
        localiseTo = values[1].trim();
        break;
      case 'EUR':
        localiseTo = values[2].trim();
        break;
      default:
        localiseTo = values[0].trim();
    }

    if (type === 'currency') {
      element.textContent = new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: currency,
        maximumFractionDigits: 0,
      }).format(localiseTo);
    } else if (type === 'text') {
      element.textContent = localiseTo;
    } else if (type === 'link') {
      element.textContent = localiseTo;
      element.href = `${element.protocol}${localiseTo.replace(/\s+/g, '')}`;
    }
  });
};
