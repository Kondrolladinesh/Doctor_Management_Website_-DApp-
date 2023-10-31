import styled from "styled-components";
import SideNav from "./SideNavbar";
import Usercard from "./Usercard";
import {
  doc,
  onSnapshot,
  collection,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebase";
import React, { useState, useContext, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Paper } from "@mui/material";
import { Avatar } from "@mui/material";

const Leftside = ({ setPatient }) => {
  const [liveQueuePatient, setLiveQueuePaitents] = useState([]);
  const [count, setLiveCount] = useState(0);

  // const [patients, setPatient] = useState({});

  useEffect(() => {
    const collectionName = "liveQueue";
    const queryRef = query(
      collection(db, collectionName),
      orderBy("timeStamp", "asc")
    );
    const unsub = onSnapshot(queryRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLiveQueuePaitents(data);
      setLiveCount(snapshot.size);
    });
    return unsub;
  }, []);

  const handleRowClick = async (data) => {
    // console.log(data);
    setPatient(data);
  };

  // console.log(liveQueuePatient);
  return (
    <Container>
      <ArtCard>
        <SideNav />
      </ArtCard>
      <span>Live Queue ({count})</span>
      <CommunityCard>
        <div>
          <TableContainer
            component={Paper}
            sx={{ width: "100%", height: "100%" }}
          >
            <Table
              sx={{
                minWidth: 200,
                color: "black",
                outline: "none",
                border: "none",
              }}
            >
              {/* <TableHead>
                <TableRow>
                  <TableCell align="left"></TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell align="center">Phone</TableCell>
                </TableRow>
              </TableHead> */}
              <TableBody>
                {liveQueuePatient.map((liveQueuePatient, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                    onClick={() => handleRowClick(liveQueuePatient)}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{
                        color: "black",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Avatar
                        sx={{
                          marginRight: "15px",
                        }}
                      />
                      <Content>
                        <ContentName>
                          {liveQueuePatient.PatientName}
                        </ContentName>
                        <ContentNum>{liveQueuePatient.PatientNum}</ContentNum>
                      </Content>
                    </TableCell>

                    {/* <TableCell align="center" sx={{
                      fontSize: "18px"
                    }}>
                    </TableCell>  */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </CommunityCard>
      <span>Early Today (0)</span>
      <CommunityCardEarly>
        <a>
          <Usercard name={"Vineet"} gender={"M"} age={"35"} time={"3"} />
        </a>
      </CommunityCardEarly>
      <CommunityCardSection>
        <a>
          <span>Live Queue(1)</span>
        </a>
        <a>
          <span>All Paitents</span>
        </a>
      </CommunityCardSection>
    </Container>
  );
};

const Container = styled.div`
  grid-area: leftside; 
  span{
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px 0px;

  }
  /* margin-top: -76px ; */
`;

const ArtCard = styled.div`
  text-align: center;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
  border-radius: 5px;
  transition: box-shadow 83ms;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;
const Content = styled.div`
display: flex;
flex-direction: column;
`;
const ContentName = styled.div`
  font-size: 20px;
  font-family: 600;
`;
const ContentNum = styled.div`
font-size: 12px;
`;

const CommunityCard = styled(ArtCard)`
  padding: 6px 0;
  text-align: left;
  display: flex;
  flex-direction: column;
  height: fit-content;
  overflow: auto;
  height: 30vh;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
  border-radius: 5px;
  a {
    color: black;
    padding: 0px 12px 0px 12px;
    font-size: 12px;

    span {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
`;
const CommunityCardEarly = styled(ArtCard)`
  padding: 6px 0;
  text-align: left;
  display: flex;
  flex-direction: column;
  height: 30vh;
  overflow: auto;
  a {
    color: black;
    padding: 4px 12px 4px 12px;
    font-size: 12px;

    span {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
`;

const CommunityCardSection = styled(ArtCard)`
  padding: 10px 0;
  margin-top: 10px;
  text-align: center;
  display: flex;
  flex-direction: row;
  height: fit-content;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
  border-radius: 5px;
  /* border: 1px solid black; */
  a {
    color: black;
    padding: 0px 12px 0px 12px;
    font-size: 16px;
    cursor: pointer;

    span:hover {
      color: #0a66c2;
    }

    span {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
`;

export default Leftside;
