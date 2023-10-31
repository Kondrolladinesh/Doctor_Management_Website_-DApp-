import React from "react";
import styled from "styled-components";
import { useState } from "react";



const Input = styled.input`
  border: none;
  padding: 18px 0px;
  border-radius: 5px;
  width: 100%;
  font-size: 20px;
  /* border: 1px solid #0b1238; */
  outline: none;
  background-color: #f9f9f9;
  font-weight: normal;
  font-family: "Formular", Helvetica, Arial, serif;
  &:focus::placeholder {
    opacity: 0;
  }
`;
const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  font-size: 25px;
  padding: 0px 15px;
  opacity: 0.5;
  &.focus{
    opacity: 1;
  }
  `;
const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
  border: 1px solid #9b99af;
  border-radius: 5px;
`;
const InputField = (props) => {
    const [isClicked, setIsClicked] = useState(false);
    
    const handleClick = () => {
      setIsClicked(!isClicked);
    };
    return (
        <InputContainer onClick={handleClick}>
        <Icon className={isClicked ? "focus" : ""}>{props.icon}</Icon>
        <Input type={props.type} placeholder={props.placeholder} />
      </InputContainer>
    );
}
export default InputField;