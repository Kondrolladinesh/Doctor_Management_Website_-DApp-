import { useContext, createContext, useEffect } from "react";
import { db } from "../firebase";
import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";

export const PaitentAddContext = createContext();

export const PaitentAddContextProvider = ({ children }) => {
  //   const [data, setData] = useState("");
  const addPatient = async (data, docId, recpId) => {
    try {
      const patientsRef = collection(db, "patients");
      const newDocRef = await addDoc(patientsRef, {
        ...data,
        DocRef: docId,
        RecRef: recpId,
        timeStamp: serverTimestamp(),
      });
      // console.log("New document added with ID:", newDocRef.id);
      toast("New Patient Added !");
    } catch (error) {
      toast("Error in Adding Patient");
      // console.error("Error adding document:", error);`
    }
    // console.log(docId)
  };
  const addLivequeue = async (data) => {
    try {
      const patientsRef = collection(db, "liveQueue");
      const newDocRef = await addDoc(patientsRef, {
        ...data,
        // PatRef:
        timeStamp: serverTimestamp(),
      });
      toast("Patient Added in the Live Queue !");
      // console.log("New document added with ID:", newDocRef.id);
    } catch (error) {
      toast("Error adding Patient");
      // console.error("Error adding document:", error);
    }
  };

  return (
    <PaitentAddContext.Provider value={{ addPatient, addLivequeue }}>
      {children}
    </PaitentAddContext.Provider>
  );
};

export const PatientAddAuth = () => {
  return useContext(PaitentAddContext);
};
