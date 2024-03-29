import styled from "styled-components";

const UniversalButton = styled.button`
  border: ${(prop) =>
    prop.variant === "delete" ? "1px solid red" : "1px solid blue"};
  border-radius: 5px;
  color: ${(prop) => (prop.variant === "delete" ? "red" : "blue")};
  font-size: 16px;
  padding: 6px 15px;
  background-color: #fff;
  &:hover {
    border: ${(prop) =>
      prop.variant === "delete" ? "1px solid red" : "1px solid blue"};
    border-radius: 5px;
    color: ${(prop) => (prop.variant === "delete" ? "white" : "white")};
    font-size: 16px;
    padding: 6px 15px;
    background-color: ${(prop) => (prop.variant === "delete" ? "red" : "blue")};
    transition:linear 0.5s;
  }
`;

export default UniversalButton;
