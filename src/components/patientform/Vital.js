import React from "react";
import styled from "styled-components";
import { useState, useContext, useEffect } from "react";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactModal from "react-modal";
import { Button, TextField } from "@mui/material";

const Close = styled.div`
  background-color: transparent;
  outline: none;
  border: none;
  margin-bottom: 5px;
  cursor: pointer;
  margin: 0px 0px 0px 10px;
`;
const VitalWrapper = styled.form`
  display: grid;
  grid-template-columns: repeat(3, 2fr);
  grid-gap: 20px;
  width: 90%;
  max-width: 900px;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 40px;
`;
const VitalBox = styled(ReactModal)`
  outline: none;
  background-color: #fff;
  border: 1px solid black;
  z-index: 9999;
  width: 100%;
  max-width: 600px;
  height: auto;
  border-radius: 10px;
  padding: 20px 50px;
  margin: auto;
  transform: translateY(40%);
  @media screen and (max-width: 768px) {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 20px;
    width: 90%;
    max-width: 600px;
    margin: 0 auto;
    margin-top: 20px;
    margin-bottom: 40px;
  }
`;
const TextInput = styled(TextField)`
  font-size: 15px;
  border-radius: 5px;
  padding: 5px;
  background-color: #fff;
  width: 100%;
`;
// const button = styled(Button)`
//   background-color: #4caf50;
//   border: none;
//   color: white;
//   padding: 10px;
//   text-align: center;
//   text-decoration: none;
//   display: inline-block;
//   font-size: 16px;
//   border-radius: 5px;
//   width: 150px;
//   margin: 20px auto;
//   cursor: pointer;
// `;


const Vital = ({ showVital, handleVitalClose }) => {

  const handleAddVitals = async (e) => {
    // To Do
  };
  return (
    <VitalBox
      isOpen={showVital}
      onRequestClose={handleVitalClose}
      contentLabel="Add Patient Vitals"
    >
      <Close onClick={handleVitalClose}>
        <FontAwesomeIcon icon={faArrowLeft} /> Go Back
      </Close>
      <VitalWrapper onSubmit={handleAddVitals}>
        <TextInput
          type="text"
          id="BloodPressure"
          varient="outlined"
          required
          label="Blood Pressure"
          onChange={handleAddVitals}
        />
        <TextInput
          type="text"
          id="HeartRate"
          varient="outlined"
          required
          label="Heart Rate"
          onChange={handleAddVitals}
        />
        <TextInput
          type="text"
          id="Temperature"
          varient="outlined"
          required
          label="Temperature"
          onChange={handleAddVitals}
        />
        <TextInput
          type="text"
          id="PainLevel"
          varient="outlined"
          required
          label="Pain level"
          onChange={handleAddVitals}
        />
        <TextInput
          type="text"
          id="Height"
          varient="outlined"
          required
          label="Height"
          onChange={handleAddVitals}
        />
        <TextInput
          type="text"
          id="Weight"
          varient="outlined"
          required
          label="Weight"
          onChange={handleAddVitals}
        />
        <TextInput
          type="text"
          id="Weight"
          varient="outlined"
          required
          label="Weight"
          onChange={handleAddVitals}
        />
        <TextInput
          type="text"
          id="Weight"
          varient="outlined"
          required
          label="Weight"
          onChange={handleAddVitals}
        />
        <TextInput
          type="text"
          id="Weight"
          varient="outlined"
          required
          label="Weight"
          onChange={handleAddVitals}
        />
        <Button onClick={" "}>Submit</Button>
      </VitalWrapper>
    </VitalBox>
  );
};

export default Vital;
