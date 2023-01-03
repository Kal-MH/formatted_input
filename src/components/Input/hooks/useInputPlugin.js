import { INPUT_FORMAT_TYPE } from "../../../utils/constants";
import { CreditPlugin } from "../plugins/credit";
import { DatePlugin } from "../plugins/date";
import { PhonePlugin } from "../plugins/phone";

const { CREDIT, PHONE, DATE } = INPUT_FORMAT_TYPE;

const useInputPlugin = (formatType) => {
  const getPlugin = (formatType) => {
    if (formatType === CREDIT) return new CreditPlugin();
    if (formatType === PHONE) return new PhonePlugin();
    if (formatType === DATE) return new DatePlugin();
  };

  return [getPlugin(formatType), getPlugin];
};

export default useInputPlugin;
