import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import {  onSnapshot, collection } from "firebase/firestore";

import ReactModal from "react-modal";
import { db } from "../../firebase";
import { Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import TableContainer from "@mui/material/TableContainer";
import { PaitentAddContext } from "../../context/PatientAddContext";
import { useContext } from "react";

const Close = styled.div`
  background-color: transparent;
  outline: none;
  border: none;
  margin-bottom: 5px;
  cursor: pointer;
  margin: 0px 0px 0px 10px;
`;
const Modal = styled(ReactModal)`
  outline: none;
  background-color: #d3d3d3;
  border: 1px solid black;
  z-index: 9999;
  width: 50%;
  height: 55%;
  max-width: 500px;
  border-radius: 10px;
  padding: 20px 10px;
  margin: auto;
  /* top: 50%; */
  transform: translateY(50%);
`;
const AddWalk = styled(ReactModal)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  outline: none;
  background-color: #d3d3d3;
  color: black;
  border: 1px solid black;
  z-index: 9999;
  width: 50%;
  height: 15%;
  max-width: 650px;
  // padding: 20px 10px;
  margin: auto;
  /* top: 50%; */
  transform: translateY(20%);
`;
const ProfileIcon = styled.div`
  height: 10px;
  cursor: pointer;
`;
const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 2px;
`;
const SearchWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 5px;
  align-items: center;
  border: 1px solid black;
`;
const SearchInput = styled.input`
  padding: 15px;
  width: 350px;
  // margin-bottom: 20px;
  border: none;
  font-size: 14px;
  border-radius: 5px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
`;
const Dashboard = styled.div`
  margin-bottom: 1rem;
  margin-top: 1rem;
  display: flex;
  flex-grow: 1;
  padding: 5px;
  border-radius: 5px;
  background-color: #fff;
  overflow: visible; /* make the container scrollable */
  height: 180px; /* set a fixed height */
`;

const Buttoncontainer = styled.div`
  display: flex;
  justify-content: space-between;
`;


const WalkIn = ({
  showWalkIn,
  handleWalkInClose,
  handleAddPatientBox,
  handleAddPatientShow,
}) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedPatients, setSelectedPaitents] = useState({});
  const [patients, setPatient] = useState([]);
  const [data, setData] = useState("");
  const { addLivequeue } = useContext(PaitentAddContext);

  const handleRowClick = async(patients) => {
    setSelectedPaitents(patients);
  };
  useEffect(() => {
    if (selectedPatients && Object.keys(selectedPatients).length > 0) {
      handleSelect();
    }
  }, [selectedPatients]);
  const handleSearchSubmit = async (e) => {
    console.log("sarch");
  };
  
  useEffect(() => {
    const collectionName = "patients"; // replace with your collection name
    const unsub = onSnapshot(collection(db, collectionName), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPatient(data);
    });
    return unsub;
  }, [patients]);

  const handleSelect= async () =>{
    try {
      await addLivequeue(selectedPatients);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Modal
      isOpen={showWalkIn}
      onRequestClose={handleWalkInClose}
      contentLabel="Add Walkin Modal"
    >
      <Close onClick={handleWalkInClose}>
        <FontAwesomeIcon icon={faArrowLeft} /> Go Back
      </Close>
      <FormWrapper onSubmit={handleSearchSubmit}>
        <SearchWrapper>
          <SearchInput
            type="text"
            id="search"
            value={selectedOption}
            placeholder="Search Patient"
            onChange={(e) => setSelectedOption(e.target.value)}
          />
          <Button type="submit">
            Search
            <FontAwesomeIcon icon={faSearch} />
          </Button>
        </SearchWrapper>
      </FormWrapper>
      <Dashboard>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 200 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="Left">Phone</TableCell>
                <TableCell align="Left">Add</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {patients.map((patients, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {patients.PatientName}
                  </TableCell>

                  <TableCell align="Left">{patients.PatientNum}</TableCell>
                  <TableCell align="Left">
                    <ProfileIcon>
                      <PersonAddIcon
                        sx={{ color: "black", fontSize: "3vh" }}
                        onClick={() => handleRowClick(patients)}
                      />
                    </ProfileIcon>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Dashboard>

      <Buttoncontainer>
        <Button onClick={handleAddPatientShow}>Add Patient</Button>
      </Buttoncontainer>
    </Modal>
  );
};

export default WalkIn;
