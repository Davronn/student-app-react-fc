import styled from "styled-components";

const Edit = styled.button`
border: ${(prop) =>
    prop.variant === "cancle" ? "1px solid grey" : "1px solid blue"};
  border-radius: 5px;
  color: ${(prop) => (prop.variant === "cancle" ? "white" : "white")};
  font-size: 16px;
  padding: 6px 15px;
  background-color: ${(prop) => (prop.variant === "cancle" ? "grey" : "blue")};
  transition:linear 0.5s;
  
`;


export default Edit;
