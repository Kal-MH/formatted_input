import styled from "@emotion/styled";
import Header from "./components/Header";
import Input from "./components/Input";
import { INPUT_FORMAT_TYPE } from "./utils/constants";

const { CREDIT, PHONE, DATE } = INPUT_FORMAT_TYPE;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 700px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
`;

function App() {
  return (
    <div className="App">
      <Wrapper>
        <Header>Credit card number formatting</Header>
        <Input formatType={CREDIT} placeholder="card numbers..." />
        <Header>Phone number formatting</Header>
        <Input formatType={PHONE} placeholder="xxx-xxx-xxxx" />
        <Header>Date formatting</Header>
        <Input formatType={DATE} placeholder="xxxx-xx-xx" />
      </Wrapper>
    </div>
  );
}

export default App;

