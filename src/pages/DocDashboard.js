import styled from "styled-components";
import React, { useState, useContext, useEffect } from "react";
import Leftside from "../components/Leftside";
import Main from "../components/Main";
import MainNav from "../components/MainNav";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, onSnapshot, collection } from "firebase/firestore";


const DocDashboard = (props) => {
  const { user } = useContext(AuthContext);
  const currentUser = user;
  const DocId = currentUser.uid;
  const [userData, setUserData] = useState("");
  const [data, setData] = useState({});
  
  useEffect(() => {
    if (DocId) {
      const documentRef = doc(db, "doctors", DocId);
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
  // const unsub = onSnapshot(doc(db, "doctor"), (doc) => {
  //   console.log("Current data: ", doc.data());
  // });
    if (!user || !userData) {
      return <div>Loading...</div>;
    }
  const handleChildData = (data) => {
    setData(data);
  };

  return (
    <Container>
      <MainNav DocInfo={userData} />
      <Layout>
        <Leftside setPatient={handleChildData} />
        <Main Patient={data} />
        {/* <Rightside /> */}
      </Layout>
    </Container>
  );
};

const Container = styled.div`
  padding-top: 52px;
  padding: 10px;
  max-width: 100%;
`;

const Layout = styled.div`
  display: grid;
  grid-template-areas: "leftside main";
  grid-template-columns: minmax(0, 5fr) minmax(300px, 19fr);
  column-gap: 25px;
  row-gap: 25px;
  /* grid-template-row: auto; */
  margin: 25px 0;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 0 5px;
  }
`;

export default DocDashboard;
