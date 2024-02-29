import styled from "styled-components";
const Button = styled.button`
  color: white;
  background-color: black;
  border-radius: 6px;
  max-width: 200px;
  padding: 8px 0px;
  transition: background-color 0.4s;
  &:hover {
    background-color: green;
  }
`;
export const Secondarybutton = styled(Button)`
  padding: 4px 12px;
`;
export default Button;
