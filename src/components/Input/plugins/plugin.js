export class Plugin {
  constructor(initialValue) {
    this.name = "";
    this.testInputRegex = null;
    this.testInputLenRegex = null;
    this.limitInputLength = 100;

    Object.assign(this, initialValue);
  }

  isValidInput(inputValue) {
    if (inputValue.length !== 0 && !this.testInputRegex.test(inputValue))
      return false;

    if (
      inputValue.replace(this.testInputLenRegex, "").length >
      this.limitInputLength
    )
      return false;

    return true;
  }

  formatInput(inputValue) {
    return inputValue;
  }
}
