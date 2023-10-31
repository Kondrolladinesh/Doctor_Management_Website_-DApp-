import React from "react";
import styled from "styled-components";
const Select = styled.select`
  width: 100%;
  border: none;
  border-radius: 5px;
  margin-bottom: 20px;
  padding: 18px 20px;
  font-size: 20px;
  background-color: #f9f9f9;
  border: 1px solid #9b99af;
  display: flex;
  color: #86839f;
  &:focus {
    outline: none;
    color: black;
  }
`;


const Option = styled.option`
  font-size: 20px;
  padding: 18px 0px;
  border-radius: 5px;
  font-weight: normal;
  font-family: "Formular", Helvetica, Arial, serif;
  height: 20%;
  display: flex;
  flex-direction: column;
  color: #86839f;
  &:hover {
    outline: none;
    color: black;
  }
`;
const options = ["-select","Doctor", "Recption"];
const SelectField = (props) => {
    return (
        <Select>
            {options.map((option, index) => (
                    <Option key={props.key} value={option}>
                      {option}
                    </Option>
                  ))}
  </Select>
  );
};
export default SelectField;