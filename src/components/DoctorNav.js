import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Usercard from "./Usercard";
import { db } from "../firebase";
import { AuthContext} from "../context/AuthContext";
import { getDoc, doc, onSnapshot } from "firebase/firestore";
import { useContext } from "react";
import { Avatar } from "@mui/material";

const ArtCard = styled.div`
  text-align: center;
  overflow: hidden;
  background-color: #fff;
  /* height: 6vh; */
  border-radius: 5px;
  transition: box-shadow 83ms;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;

const Container = styled.div`
  grid-area: leftside;
  /* height: 6vh; */
  span {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px 0px;
  }
  /* margin-top: -76px ; */
`;
  const DisplayPatient = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: center;
    div {
      margin-left: 10px;
      font-size: 25px;
    }
  `;

  const CommunityCard = styled(ArtCard)`
    padding: 12px 0px 12px 0px;
    height: 6vh;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-weight: 600;
    /* a {
      color: black;
      padding: 0px 5px 0px 5px;
      font-size: 12px;
      span {
        display: flex;
        align-items: center;
        justify-content: space-between;
      } */
    /* } */
  `;

const DoctorNav = ({ displayData }) => {
  console.log(displayData.Patient.PatientName);
  return (
    <Container>
      <CommunityCard>
        {displayData ? (
          
            <DisplayPatient>
              <Avatar
                sx={{
                  marginRight: "5px",
                  marginLeft: "20px",
                }}
              />
              <div>
                {displayData.Patient.PatientName}
              </div>
            </DisplayPatient>
          ): (
            "Patient not Selected"
          )
          }
      </CommunityCard>
      {/* <div>
        {userData ? (
          <p>Welcome {userData.displayName}</p>
        ) : (
          <p>Loading user data...</p>
        )}
      </div> */}
    </Container>
  );
};

export default DoctorNav;
