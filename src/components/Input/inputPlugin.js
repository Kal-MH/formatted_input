const TEST_INPUT_REGEX = {
  credit: /[0-9]/g,
  phone: /[0-9]/g,
  date: /[0-9-]/g,
};

const TEST_LEN_REGEX = {
  credit: /[^0-9*]/g,
  phone: /[^0-9]/g,
  date: /[^0-9-]/g,
};

const TYPE_INPUT_LEN = {
  credit: 16,
  phone: 11,
  date: 8,
};

const inputPlugin = (type) => {
  const isValidInput = (type, inputValue) => {
    const testInputRegex = TEST_INPUT_REGEX[type];
    if (
      inputValue.length !== 0 &&
      !testInputRegex.test(inputValue.charAt(inputValue.length - 1))
    )
      return false;
    if (
      inputValue.replace(TEST_LEN_REGEX[type], "").length > TYPE_INPUT_LEN[type]
    )
      return false;
    return true;
  };

  const getFormattedInputValue = (type, inputValue) => {
    const formatCreditInput = (inputValue) => {
      return (
        inputValue
          .match(/[0-9*]{1,4}/g)
          ?.map((section, i, creditNumbers) => {
            if (
              i >= 2 &&
              (i === creditNumbers.length - 2 || i === creditNumbers.length - 1)
            ) {
              return "".padEnd(section.length, "*");
            }
            return section;
          })
          .join(" ") || inputValue
      );
    };

    const formatPhoneInput = (inputValue) => {
      return inputValue
        .replace(/[^0-9]/g, "")
        .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
        .replace(/(-{1,2})$/g, "");
    };

    const formatDateInput = (inputValue) => {
      return inputValue
        .replace(/[^0-9]/g, "")
        .replace(/^(\d{0,4})(\d{0,2})(\d{0,2})$/g, "$1-$2-$3")
        .replace(/(-{1,2})$/g, "")
        .split("-")
        .map((section, i) => {
          if (i === 0) return section;

          const num = Number(section);

          if (num > 1 && num < 10) return `0${num}`;

          return section;
        })
        .join("-");
    };

    switch (type) {
      case "credit":
        return formatCreditInput(inputValue);
      case "phone":
        return formatPhoneInput(inputValue);
      case "date":
        return formatDateInput(inputValue);
      default:
        return "";
    }
  };

  const isValidCreditInput = (inputValue) => {
    const testRegex = /[0-9* ]/g;

    if (
      inputValue.length !== 0 &&
      !testRegex.test(inputValue.charAt(inputValue.length - 1))
    )
      return false;
    if (inputValue.replace(/[^0-9*]/g, "").length > 16) return false;

    return true;
  };

  const isValidPhoneInput = (inputValue) => {
    const testRegex = /[0-9-]/g;

    if (
      inputValue.length !== 0 &&
      !testRegex.test(inputValue.charAt(inputValue.length - 1))
    )
      return false;
    if (inputValue.replace(/[^0-9]/g, "").length > 11) return false;

    return true;
  };

  const isValidDateInput = (inputValue) => {
    const testRegex = /[0-9-]/g;

    if (
      inputValue.length !== 0 &&
      !testRegex.test(inputValue.charAt(inputValue.length - 1))
    )
      return false;
    if (inputValue.replace(/[^0-9]/g, "").length > 8) return false;

    return true;
  };

  const formatCreditInput = (inputValue) => {
    return (
      inputValue
        .match(/[0-9*]{1,4}/g)
        ?.map((section, i, creditNumbers) => {
          if (
            i >= 2 &&
            (i === creditNumbers.length - 2 || i === creditNumbers.length - 1)
          ) {
            return "".padEnd(section.length, "*");
          }
          return section;
        })
        .join(" ") || inputValue
    );
  };

  const formatPhoneInput = (inputValue) => {
    return inputValue
      .replace(/[^0-9]/g, "")
      .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
      .replace(/(-{1,2})$/g, "");
  };

  const formatDateInput = (inputValue) => {
    return inputValue
      .replace(/[^0-9]/g, "")
      .replace(/^(\d{0,4})(\d{0,2})(\d{0,2})$/g, "$1-$2-$3")
      .replace(/(-{1,2})$/g, "")
      .split("-")
      .map((section, i) => {
        if (i === 0) return section;

        const num = Number(section);

        if (num > 1 && num < 10) return `0${num}`;

        return section;
      })
      .join("-");
  };

  switch (type) {
    case "credit":
      return [isValidCreditInput, formatCreditInput];
    case "phone":
      return [isValidPhoneInput, formatPhoneInput];
    case "date":
      return [isValidDateInput, formatDateInput];
    default:
      return [];
  }
};

export default inputPlugin;
