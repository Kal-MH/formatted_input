import { Plugin } from "./plugin";

export class CreditPlugin extends Plugin {
  CREDIT_REGEX = {
    visa: /^4\d{0,15}/,
    master: /^(5[1-5]|2[2-7])\d{0,14}/,
    amex: /^3[47]\d{0,13}/,
    card: /^[0-9]+$/,
  };

  SECTION = {
    visa: [4, 4, 4, 4],
    master: [4, 4, 4, 4],
    amex: [4, 6, 5],
    card: [4, 4, 4, 4],
  };

  KEYWORDS = {
    CARD: "card",
    VISA: "visa",
    MASTER: "master",
    AMEX: "amex",
    INVALID: "invalid",
  };

  constructor(initialValue) {
    super({
      ...initialValue,
      name: "credit",
      testInputLenRegex: /[^0-9]/g,
      testCreditRegex: null,
      sections: [],
      currentCreditCard: "",
    });
  }

  getCurrentCreditCard() {
    return this.currentCreditCard;
  }

  getCreditInfo(inputValue) {
    const { visa, master, amex, card } = this.CREDIT_REGEX;
    const { CARD, VISA, MASTER, AMEX, INVALID } = this.KEYWORDS;
    const testInputValue = inputValue.replace(/[^0-9]/g, "");

    if (visa.test(testInputValue)) return [VISA, visa, this.SECTION[VISA]];
    else if (master.test(testInputValue))
      return [MASTER, master, this.SECTION[MASTER]];
    else if (amex.test(testInputValue)) return [AMEX, amex, this.SECTION[AMEX]];
    else if (card.test(testInputValue) || inputValue === "")
      return [CARD, card, this.SECTION[CARD]];
    return [null, INVALID, null];
  }

  isValidInput(inputValue) {
    const { INVALID } = this.KEYWORDS;

    [this.currentCreditCard, this.testCreditRegex, this.sections] =
      this.getCreditInfo(inputValue);

    if (this.testCreditRegex === INVALID && this.sections === null)
      return false;
    return true;
  }

  formatInput(inputValue) {
    const onlyNumberInputValue = inputValue.replace(/[^0-9]/g, "");

    let formattedValue = "";
    let restInput = onlyNumberInputValue;

    this.sections.forEach((len, i) => {
      let subInput = restInput.slice(0, len);
      restInput = restInput.slice(len, restInput.length);

      formattedValue += subInput;
      if (i !== this.sections.length - 1 && restInput !== "")
        formattedValue += " ";
    });

    return formattedValue;
  }
}
