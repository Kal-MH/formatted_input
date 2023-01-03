import { Plugin } from "./plugin";

export class PhonePlugin extends Plugin {
  constructor(initialValue) {
    super({
      ...initialValue,
      name: "phone",
      testInputRegex: /[0-9-]/g,
      testInputLenRegex: /[^0-9]/g,
      limitInputLength: 11,
    });
  }

  formatInput(inputValue) {
    return inputValue
      .replace(/[^0-9]/g, "")
      .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
      .replace(/(-{1,2})$/g, "");
  }
}
