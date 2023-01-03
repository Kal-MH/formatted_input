import PropTypes from "prop-types";
import { useState } from "react";
import styled from "@emotion/styled";

import useInputPlugin from "./hooks/useInputPlugin";
import { INPUT_FORMAT_TYPE } from "../../utils/constants";

const { CREDIT } = INPUT_FORMAT_TYPE;
const CARD = "card";
const CREDIT_INPUT_WIDTH = "75%";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 700px;
  margin: 0 auto;
  padding: 20px;
`;

const StyledInput = styled.input`
  width: 100%;
  font-size: 26px;
  border: 2px solid rgba(0, 0, 0, 0.3);
  padding: 14px;
`;

const CardNameDiv = styled.div`
  width: 13%;
  margin-left: 10px;
  font-size: 27px;
  background-color: #2222;
  padding: 0 20px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Input = ({ formatType, placeholder }) => {
  const [value, setValue] = useState("");
  const [plugin] = useInputPlugin(formatType);
  const [currentCredit, setCurrentCredit] = useState(CARD);

  const handleInputOnChange = (e) => {
    const inputValue = e.target.value;

    if (!plugin.isValidInput(inputValue)) return;

    plugin.getCurrentCreditCard &&
      setCurrentCredit(plugin.getCurrentCreditCard());

    const formattedInputValue = plugin.formatInput(inputValue);

    setValue(formattedInputValue);
  };

  return (
    <Wrapper>
      <StyledInput
        style={{ width: formatType === CREDIT && CREDIT_INPUT_WIDTH }}
        value={value}
        onChange={handleInputOnChange}
        placeholder={placeholder}
      />
      {formatType === CREDIT && <CardNameDiv>{currentCredit}</CardNameDiv>}
    </Wrapper>
  );
};

Input.propTypes = {
  formatType: PropTypes.string,
};

export default Input;
