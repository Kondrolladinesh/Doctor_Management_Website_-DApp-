import React from "react";
import styled from "styled-components";

const Buton = styled.button`
  border: none;
  padding: 18px 0px;
  width: 100%;
  font-size: 20px;
  outline: none;
  /* background-color: #3b82f6; */
  /* color: #fff; */
  border-radius: 5px;
  font-weight: bold;
  font-family: "Formular", Helvetica, Arial, serif;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 20px;
  margin: 5px 5px 5px 5px;

  /* &:hover {
    background-color: #2563eb;
  } */

  &:active {
    transform: translateY(2px);
  }
`;
const Button = (props) => {
  return (
      <Buton>{props.title}</Buton>
  );
};
export default Button;
