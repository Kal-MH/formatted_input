import { Plugin } from "./plugin";

export class DatePlugin extends Plugin {
  DAYS = [
    "0",
    "31",
    "28",
    "31",
    "30",
    "31",
    "30",
    "31",
    "31",
    "30",
    "31",
    "30",
    "31",
  ];

  MAX_MONTH = "12";

  constructor(initialValue) {
    super({
      ...initialValue,
      name: "date",
      testInputRegex: /[0-9-]/g,
      testInputLenRegex: /[^0-9]/g,
      limitInputLength: 8,
    });
  }

  formatInput(inputValue) {
    return inputValue
      .replace(/[^0-9]/g, "")
      .replace(/^(\d{0,4})(\d{0,2})(\d{0,2})$/g, "$1-$2-$3")
      .replace(/(-{1,2})$/g, "")
      .split("-")
      .map((section, i, sections) => {
        //Year
        if (i === 0) return section;

        //Month
        const num = Number(section);

        if (i === 1 && num > 1 && num < 10) return `0${num}`;
        if (i === 1 && num > 12) return this.MAX_MONTH;

        //Day
        const month = Number(this.DAYS[Number(sections[1])]);

        if (num > month) return this.DAYS[Number(sections[1])];
        return section;
      })
      .join("-");
  }
}
