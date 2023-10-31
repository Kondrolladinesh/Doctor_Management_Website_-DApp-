import React, { useState, useContext } from "react";
import styled from "styled-components";
import ReactModal from "react-modal";
import TextField from "@mui/material/TextField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { PaitentAddContext } from "../../context/PatientAddContext";
import { toast } from "react-toastify";

const AddPatient = ({
  Patientdata,
  handleAddPatientClose,
  showAddPatient,
  docId,
  recpId,
}) => {
  const [data, setData] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const { addPatient } = useContext(PaitentAddContext);

  const handleInputAddPatient = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]: value });
    if (id === "name") {
      setName(value);
    }
    if (id === "number") {
      setNumber(value);
    }
  };
  const handleAddPatient = async (e) => {
    e.preventDefault();
    await addPatient(data, docId, recpId);
    toast("✅ New Patient Created!");
    handleAddPatientClose(false);
  };
  // const handleAddPatientClose = async (e) => {
  //     e.preventDefault();
  //     showAddPatient(false);
  // }

  return (
    <Addpatient
      isOpen={showAddPatient}
      onRequestClose={showAddPatient}
      contentLabel="Add Walkin Patient"
    >
      <Close onClick={handleAddPatientClose}>
        <FontAwesomeIcon icon={faClose} />
      </Close>
      <FormWrapperAddPatient onSubmit={handleAddPatient}>
        <InputWrapper>
          <div>
            <TextInput
              type="text"
              id="PatientName"
              varient="outlined"
              fullWidth
              required
              label="Patient Name"
              onChange={handleInputAddPatient}
            />
            <TextInput
              type="text"
              id="PatientNum"
              varient="outlined"
              fullWidth
              required
              label="Mobile Number"
              onChange={handleInputAddPatient}
            />
          </div>
          <div>
            <TextInput
              type="number"
              id="PatientAge"
              varient="outlined"
              fullWidth
              required
              label="Age"
              onChange={handleInputAddPatient}
            />
            <TextInput
              type="text"
              id="PatientGender"
              varient="outlined"
              fullWidth
              required
              label="Gender"
              onChange={handleInputAddPatient}
            />
          </div>
        </InputWrapper>
        <Button type="submit">Add</Button>
      </FormWrapperAddPatient>
    </Addpatient>
  );
};

const Addpatient = styled(ReactModal)`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  outline: none;
  background-color: #d3d3d3;
  border: 1px solid black;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  z-index: 9999;
  width: 50%;
  height: 50%;
  max-width: 500px;
  margin: auto;
  transform: translateY(50%);
`;

const FormWrapperAddPatient = styled.form`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  row-gap: 15px;
  div {
    display: flex;
    flex-direction: row;
    column-gap: 10px;
  }
`;

const TextInput = styled(TextField)`
  font-size: 15px;
  border-radius: 5px;
  max-width: 350px;
  padding: 5px;
  background-color: #fff;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  background-color: #2196f3;
  color: #fff;
  cursor: pointer;
  margin-left: 10px;
  margin-top: 20px;

  &:hover {
    background-color: #2196f3;
  }
`;

const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

export default AddPatient;
