import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Paper } from "@mui/material";
import { onSnapshot, collection, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import { toast } from "react-toastify";

const ProfileIcon = styled.div`
  height: 10px;
  cursor: pointer;
`;
const QueueButton = styled.button`
  padding: 10px 14px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 700;
  background-color: #eee;
  color: black;
  cursor: pointer;
  /* margin-left: 10px; */

  &:hover {
    background-color: #2196f3;
    color: white;
  }
`;

const LiveQueueTable = ({ handleVital, handleBill }) => {
  const [liveQueuePatient, setLiveQueuePaitents] = useState([]);

  useEffect(() => {
    const collectionName = "liveQueue";
    const queryRef = query(
      collection(db, collectionName),
      orderBy("timeStamp", "asc")
    ); // replace with your collection name
    const unsub = onSnapshot(queryRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLiveQueuePaitents(data);
    });
    return unsub;
  }, []);

  return (
    <div>
      <TableContainer component={Paper} sx={{ width: "100%", height: "100%" }}>
        <Table sx={{ minWidth: 200, color: "black" }}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Phone</TableCell>
              <TableCell align="center">Vitals</TableCell>
              <TableCell align="center">Bill</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {liveQueuePatient.map((liveQueuePatient, index) => (
              <TableRow
                key={index}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell component="th" scope="row">
                  {liveQueuePatient.PatientName}
                </TableCell>

                <TableCell align="center">
                  {liveQueuePatient.PatientNum}
                </TableCell>
                <TableCell align="center">
                  <QueueButton onClick={handleVital}>Add Vitals</QueueButton>
                </TableCell>
                <TableCell align="center">
                  <QueueButton onClick={handleBill}>Add Bill</QueueButton>
                </TableCell>
                <TableCell align="center">
                  <ProfileIcon>
                    <MoreVertIcon
                      onClick={() => toast("More Clicked")}
                      // onClick={() => handleRowClick(patients)}
                      sx={{ color: "black", fontSize: "3vh" }}
                    />
                  </ProfileIcon>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default LiveQueueTable;
