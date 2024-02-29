import styled from "styled-components";
const Title = styled.h2`
  font-weight: ${(props) => (props.primary ? "700" : "600")};
  font-size: ${(props) => (props.primary ? "48px" : "36px")};
  text-align: center;
  padding-bottom: 24px;
  text-decoration: ${(props) => (props.primary ? "" : "underline")};
`;
export default Title;
