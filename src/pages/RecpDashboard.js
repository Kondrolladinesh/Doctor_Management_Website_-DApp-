import styled from "styled-components";
import React, { useState, useContext, useEffect } from "react";
import MainNav from "../components/MainNav";
import PatientDetails from "../components/PatientDetails";
import { AuthContext } from "../context/AuthContext";
import { doc, onSnapshot, collection } from "firebase/firestore";
import { db } from "../firebase";
import { PaitentAddContext } from "../context/PatientAddContext";
import { toast } from "react-toastify";
import { faHistory } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import Vital from "../components/patientform/Vital";
import LiveQueueTable from "../components/patienttable/LiveQueueTable";
import EarlyTodayTable from "../components/patienttable/EarlyTodayTable";
import AppointmentTable from "../components/patienttable/AppointmentTable";
import WalkIn from "../components/patientform/WalkIn"
import AddPatient from "../components/patientform/AddPatient";
import Bill from "../components/patientform/Bill";


const RecpDashboard = ({ props }) => {
  const [selectedContainer, setSelectedContainer] = useState("queue");
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState("");
  const [docData, setDocData] = useState("");
  const [docId, setDocId] = useState("");
  const [showWalkIn, setWalkIn] = useState(false);
  // const [addWalkin, setAddWalkin] = useState(false);
  // const [selectedOption, setSelectedOption] = useState("");
  // const { addPatient, addLivequeue } = useContext(PaitentAddContext);
  const [data, setData] = useState("");
  // const [name, setName] = useState("");
  // const [number, setNumber] = useState("");
  // const [patients, setPatient] = useState([]);
  const [liveQueuePatient, setLiveQueuePaitents] = useState([]);
  const [showVital, setShowVital] = useState(false);
  const [showBill, setShowBill] = useState(false);
  const [showAddPatient, setshowAddPatient] = useState(false);
  const [liveQueueData, setLiveQueueData] = useState("");
  const [count, setLiveCount] = useState(0);
  const currentUser = user;
  const recpId = currentUser.uid;

  useEffect(() => {
    if (recpId) {
      const documentRef = doc(db, "receptions", recpId);
      const unsub = onSnapshot(
        documentRef,
        (doc) => {
          if (doc.exists()) {
            setUserData(doc.data());
          }
        },
        (error) => {
          console.error("Error fetching user data:", error);
        }
      );
      return unsub;
    }
  }, []);

  useEffect(() => {
    if (userData && userData.DocId) {
      setDocId(userData.DocId);
    }
  }, []);

  useEffect(() => {
    if (docId) {
      const documentRef1 = doc(db, "doctors", docId);
      const unsub1 = onSnapshot(documentRef1, (doc) => {
        if (doc.exists()) {
          setDocData(doc.data());
        }
      });
      return unsub1;
    }
  }, []);

  useEffect(() => {
    const collectionName = "liveQueue"; // replace with your collection name
    const unsub = onSnapshot(collection(db, collectionName), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLiveQueuePaitents(data);
      setLiveCount(snapshot.size);
    });
    return unsub;
  }, []);
  // useEffect(() => {
  //   const collectionName = "liveQueue";
  //    const unsub = onSnapshot(collection(db, collectionName), (snapshot) => {
  //      const data = snapshot.docs.map((doc) => ({
  //        id: doc.id,
  //        ...doc.data(),
  //      }));
        
  //    });
  //   return unsub;
  // }, []);
  // const handleInputAddPatient = (e) => {
  //   const id = e.target.id;
  //   const value = e.target.value;

  //   setData({ ...data, [id]: value });
  //   if (id === "name") {
  //     setName(value);
  //   }
  //   if (id === "number") {
  //     setNumber(value);
  //   }
  // };

  const handleVital = async (e) => {
    e.preventDefault();
    setShowVital(true);
  };
  const handleVitalClose = async (e) => {
    e.preventDefault();
    setShowVital(false);
  };
  const handleBill = async (e) => {
    e.preventDefault();
    setShowBill(true);
  };
  const handleBillClose = async (e) => {
    e.preventDefault();
    setShowBill(false);
  };
  const handleAddPatientShow = async (e) => {
    e.preventDefault();
    setshowAddPatient(true);
  };
  const handleAddPatientClose = async (e) => {
    setshowAddPatient(false);
  };

  if (!user || !userData) {
    return <div>Loading...</div>;
  }

  const handleContainerChange = (containerName) => {
    setSelectedContainer(containerName);
  };

  const handleAddWalkin = () => {
    setWalkIn(true);
  };

  const handlerefresh = () => {
    // To Do
  };

  const handleWalkInClose = () => {
    setWalkIn(false);
    // setVital(false);
  };

  // const handleRowClick = async (patients) => {
  //   await addLivequeue(patients, docId, recpId);
  //   handleWalkInClose();
  //   toast("✅ Added In the Live Queue!");
  // };

  return (
    <Container>
      <MainNav />
      <Section>
        <Nav>
          <Title>
            Hello {userData ? userData.displayName : "loading"}, Your Managing
            {" '"}
            {docData ? docData.displayName : "Loading"}
            {"' "}
          </Title>
          <ButtonGroup>
            <Button onClick={handleAddWalkin}>Add Walkin</Button>
          </ButtonGroup>
        </Nav>
      </Section>
      <ContentContainer>
        <ContainerButtons>
          <div>
            <ContainerButton
              onClick={() => handleContainerChange("queue")}
              active={selectedContainer === "queue"}
            >
              <ButtonTitle>Queue</ButtonTitle>
              <ButtonCount>{count}</ButtonCount>
            </ContainerButton>
            <ContainerButton
              onClick={() => handleContainerChange("early")}
              active={selectedContainer === "early"}
            >
              <ButtonTitle>Early Today</ButtonTitle>
              <ButtonCount>2</ButtonCount>
            </ContainerButton>
            <ContainerButton
              onClick={() => handleContainerChange("appionment")}
              active={selectedContainer === "appionment"}
            >
              <ButtonTitle>Appiontments</ButtonTitle>
              <ButtonCount>3</ButtonCount>
            </ContainerButton>
          </div>
          <RefreshButton>
            <FontAwesomeIcon onClick={handlerefresh} icon={faHistory} />
          </RefreshButton>
        </ContainerButtons>
        <Containers>
          <BoxContainer show={selectedContainer === "queue"}>
            <LiveQueueTable
              handleVital={handleVital}
              handleBill={handleBill}
            />
          </BoxContainer>
          {/* <BoxContainer show={selectedContainer === "early"}>
            <EarlyTodayTable
              
              handleVital={handleVital}
            />
          </BoxContainer>
          <BoxContainer show={selectedContainer === "appionment"}>
            <AppointmentTable
             
              handleVital={handleVital}
            />
          </BoxContainer> */}
        </Containers>
      </ContentContainer>

      <WalkIn
        showWalkIn={showWalkIn}
        handleWalkInClose={handleWalkInClose}
        handleAddPatientShow={handleAddPatientShow}
      />
      <AddPatient
        showAddPatient={showAddPatient}
        docId={docId}
        recpId={recpId}
        handleAddPatientClose={handleAddPatientClose}
      />

      <Vital showVital={showVital} handleVitalClose={handleVitalClose} />
      <Bill showBill={showBill} handleBillClose={handleBillClose} />
    </Container>
  );
};

const Container = styled.div`
  padding: 10px;
  max-width: 100%;
  border-radius: 5px;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px;
  margin-top: 10px;
`;

const ContainerButtons = styled.div`
  display: flex;
  margin-bottom: 3px;
  justify-content: space-between;
`;

const ContainerButton = styled.button`
  width: 150px;
  height: 70px;
  margin-right: 5px;
  background-color: ${(props) => (props.active ? "#2196f3" : "#eee")};
  color: ${(props) => (props.active ? "#fff" : "#333")};
  border: none;
  border-radius: 5px;
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
`;

const ButtonTitle = styled.div`
  margin-bottom: 5px;
`;

const ButtonCount = styled.div`
  font-size: 24px;
  font-weight: bold;
`;
const RefreshButton = styled.button`
  background-color: transparent;
  color: #333;
  border: none;
  justify-content: flex-end;
  padding: 10px;
  font-size: 25px;
  margin-right: 25px;
`;

const Containers = styled.div`
  display: flex;
`;

const BoxContainer = styled.div`
  display: ${(props) => (props.show ? "block" : "none")};
  flex-grow: 1;
  padding: 5px;
  border-radius: 5px;
  background-color: #f7f7f7;
  overflow: auto; /* make the container scrollable */
  height: 600px; /* set a fixed height */
`;
const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h1`
  margin: 0;
  font-size: 24px;
  font-weight: 700;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Section = styled.div``;

export default RecpDashboard;
