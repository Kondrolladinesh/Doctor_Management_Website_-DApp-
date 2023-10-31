import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { getDoc, doc, onSnapshot } from "firebase/firestore";

const Container = styled.div`
  width: 93%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;

const TextBox = styled.textarea`
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
  border-radius: 5px;
  width: 100%;
  height: 480px;
  /* border: 2px solid black; */
  outline: none;
  border: none;
  border-radius: 5px;
  padding: 20px;
  font-family: Arial, sans-serif;
  font-size: 14px;
  line-height: 1.5;
  resize: none;
  /* margin-top: 20px; */
`;
const PrescriptionTextBox = ({
  data,
  // name,
  // age,
  // gender,
  // diagnosis,
  // medications,
  // instructions,
}) => {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  // console.log(user)

  useEffect(() => {
    if (user) {
      const docId = user.uid;
      const documentRef = doc(db, "doctors", docId);
      const unsub = onSnapshot(documentRef, (doc) => {
        if (doc.exists()) {
          setUserData(doc.data());
        }
      });
      return unsub;
    }
  }, [user]);
  const preDesignedPrescription = `Doctor's Prescription
Patient Name: ${data.Patient.PatientName}
Age: ${data.Patient.PatientAge} years
Gender: ${data.Patient.PatientGender}
Diagnosis: Acute bronchitis

Medications:
1. Amoxicillin 500mg, take 1 tablet by mouth 3 times a day for 10 days
2. Albuterol inhaler, 2 puffs every 4 hours as needed for coughing or wheezing
3. Tylenol 500mg, take 2 tablets by mouth every 6 hours as needed for fever or pain

Instructions:
- Take all medications as prescribed
- Rest as much as possible
- Drink plenty of fluids
- Return for follow-up appointment in 2 weeks`;

  return (
    <Container>
      {/* <Heading>Doctor's Prescription</Heading>  */}
      <TextBox readOnly value={preDesignedPrescription} fixed />
    </Container>
  );
};

export default PrescriptionTextBox;
