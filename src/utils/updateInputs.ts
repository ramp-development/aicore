export const updateInputs = () => {
  for (const [key, value] of Object.entries(window.aiCoreParams)) {
    if (!value) continue;
    const inputs = [...document.querySelectorAll(`input[type="hidden"][name="${key}"]`)];
    inputs.forEach((input) => {
      input.value = value;
    });
  }
};
