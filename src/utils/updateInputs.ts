export const updateInputs = () => {
  for (const [key, value] of Object.entries(window.aiCoreParams)) {
    console.log(value);
    if (value) {
      console.log('has value');
      const inputs = document.querySelectorAll(`input[type="hidden"][name="${key}"]`);
      console.log(inputs);
      Array.from(inputs).forEach((input) => {
        input.value = value;
      });
    }
  }
};
