import React, { useEffect, useState, useContext } from "react";
import { db } from "../firebase";
import {
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
  deleteDoc, collection, onSnapshot
} from "firebase/firestore";
import ReactModal from "react-modal";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faEdit,
  faTrash,
  faLock,
  faSave,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { AuthContext} from "../context/AuthContext";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  // Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";


const ManageReceptionist = () => {
  const currentUserUid = localStorage.getItem("docId");
  const { signup, user, deleteUser } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [receptionists, setReceptionists] = useState([]);
  const [data, setData] = useState({
    displayName: "",
    email: "",
    password: "",
    phone: "",
  });
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
  // const [editingRow, setEditingRow] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
   const [confirmDelete, setConfirmDelete] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signup(email, password);
      const createdUser = userCredential.user;
      await setDoc(doc(db, "receptions", createdUser.uid), {
        ...data,
        DocId: currentUserUid,
        timeStamp: serverTimestamp(),
      });
      toast("✅ Account Created Sucessfully!");
      setIsOpen(false);
      addReceptionist();
    } catch (error) {
      console.log(error);
    }
  };
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update the selected row in Firebase
      const name = selectedRow.displayName;
      const email = selectedRow.email;
      const password = selectedRow.password;
      const phone = selectedRow.phone;
      await updateDoc(doc(db, "receptions", selectedRow.id), {
        displayName: name,
        email: email,
        password: password,
        phone: phone,
      });
      toast("✅ User Updated Sucessfully!");
      setSelectedRow(null);
    } catch (error) {
      // Handle any errors that may occur
      console.error(error);
    }
  };

//   const handleDelete = (doc) => {
//     setSelectedRow(doc);
//     setConfirmDelete(true);
//   };
//     const handleDeleteCancel = () => {
//       setSelectedRow(null);
//       setConfirmDelete(false);
//     };
// const handleDeleteConfirm = async (receptionist) => {
//   try {
//      await deleteUser(receptionist);
//     // Delete the document from the "receptions" collection in Firebase
//     await deleteDoc(doc(db, "receptions", receptionist.id));

//     // Remove the deleted receptionist from the local state
//     setReceptionists((prevState) =>
//       prevState.filter((r) => r.id !== receptionist.id)
//     );
//     toast("✅ User Deleted Sucessfully!");
//   } catch (error) {
//     // Handle any errors that may occur
//     console.error(error);
//   }
// };
  
  useEffect(() => {
    const collectionName = "receptions"; // replace with your collection name
    const unsub = onSnapshot(collection(db, collectionName), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setReceptionists(data);
    });
    
    return () => unsub();
  }, []);
  
  
  const openModal = () => {
    setIsOpen(true);
  };
  
  
  const closeModal = () => {
    setIsOpen(false);
  };
  
  const handleEdit = (receptionist) => {
    setSelectedRow(receptionist);
  };




  const handleInputChange = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]: value });
    if (id === "email") {
      setEmail(value);
    }
    if (id === "password") {
      setPassword(value);
    }
  };

  const addReceptionist = () => {
    // TODO: send receptionist data to the database and update state
    setReceptionists([...receptionists, data]);
    setData({ displayName: "", email: "", password: "", phone: "" });
    closeModal();
  };

  return (
    <Container>
      <h1>Manage Receptionists</h1>
      <AddButton onClick={openModal}>
        <FontAwesomeIcon icon={faPlus} />
        Add New Receptionist
      </AddButton>

      {/* Modal to add new receptionist */}
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        className="custom-modal-class"
      >
        <ModalTitle>Add New Receptionist</ModalTitle>
        {/* Form to enter receptionist details */}
        <FormWrapper onSubmit={handleSignup}>
          {/* <FormLabel>Name:</FormLabel> */}
          <FormInput
            type="text"
            id="displayName"
            value={data.displayName}
            placeholder="...FullName"
            onChange={handleInputChange}
          />
          {/* <FormLabel>Email:</FormLabel> */}
          <FormInput
            type="email"
            id="email"
            value={data.email}
            placeholder="Email"
            onChange={handleInputChange}
          />
          {/* <FormLabel>Phone:</FormLabel> */}
          <FormInput
            type="password"
            id="password"
            value={data.password}
            placeholder="Password"
            onChange={handleInputChange}
          />
          <FormInput
            type="tel"
            id="phone"
            value={data.phone}
            onChange={handleInputChange}
            placeholder="Phone"
          />
          <FormButton type="submit">Add Receptionist</FormButton>
        </FormWrapper>
      </Modal>

      {/* Dashboard to display all receptionists */}
      <Dashboard>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Password</TableCell>
                <TableCell align="right">Phone</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {receptionists.map((receptionist) => (
                <TableRow
                  key={receptionist.email}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  // onClick={() => handleClick(receptionist)}
                >
                  <TableCell component="th" scope="row">
                    {receptionist.displayName}
                  </TableCell>
                  <TableCell align="right">{receptionist.email}</TableCell>
                  <TableCell align="right">{receptionist.password}</TableCell>
                  <TableCell align="right">{receptionist.phone}</TableCell>
                  <TableCell align="right">
                    <Button onClick={() => handleEdit(receptionist)}>
                      <FontAwesomeIcon icon={faPen} />
                    </Button>
                    {/* <Button onClick={() => handleDisableLogin(receptionist)}>
                      <FontAwesomeIcon icon={faLock} />
                    </Button> */}
                    {/* <Button onClick={() => handleDelete(receptionist)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </Button> */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
      </Dashboard>
      {selectedRow && (
        <form onSubmit={handleEditSubmit}>
          <input
            type="text"
            name="name"
            value={selectedRow.displayName}
            onChange={(e) =>
              setSelectedRow({ ...selectedRow, displayName: e.target.value })
            }
          />
          <input
            type="email"
            name="email"
            value={selectedRow.email}
            onChange={(e) =>
              setSelectedRow({ ...selectedRow, email: e.target.value })
            }
          />
          <input
            type="text"
            name="password"
            value={selectedRow.password}
            onChange={(e) =>
              setSelectedRow({ ...selectedRow, password: e.target.value })
            }
          />
          <input
            type="text"
            name="phone"
            value={selectedRow.phone}
            onChange={(e) =>
              setSelectedRow({ ...selectedRow, phone: e.target.value })
            }
          />
          <button type="submit">Save</button>
        </form>
      )}
    </Container>
  );
};

//styling
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const AddButton = styled.button`
  background-color: #0077b6;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px;
  margin: 20px 0;
  display: flex;
  align-items: center;
  cursor: pointer;

  svg {
    margin-right: 5px;
  }
`;

const Modal = styled(ReactModal)`
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  background-color: #D3D3D3;
  border-radius: 1rem;
  border: 1px solid black;
  z-index: 9999;
  width: 60%;
  padding: 20px 10px;
  max-width: 600px;
  margin: auto;
  /* top: 50%; */
  transform: translateY(60%);
`;

const ModalTitle = styled.h2`
  margin-top: 0;
`;

const Modalwrapper = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  justify-content: center;
  align-items: center;
`;

const FormInput = styled.input`
  margin-bottom: 10px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  width: 50%;
`;

const FormButton = styled.button`
  background-color: #0077b6;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px;
  margin-top: 20px;
  font-size: 16px;
  cursor: pointer;
  width: 50%;
`;

const Dashboard = styled.div`
  margin: auto;
  max-width: 1200px;
  width: 80%;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;



const Button = styled.button`
  background-color: transparent;
  /* color: #fff; */
  border: none;
  border-radius: 4px;
  padding: 5px;
  margin-right: 5px;
  cursor: pointer;
  font-size: 16px;
`;
// const SaveButton = styled.button`
//   background-color: #4caf50;
//   color: #fff;
//   border: none;
//   border-radius: 4px;
//   padding: 5px;
//   margin-right: 5px;
//   cursor: pointer;

//   svg {
//     margin-right: 5px;
//   }
// `;
// const CancelButton = styled.button`
//   background-color: #4caf50;
//   color: #fff;
//   border: none;
//   border-radius: 4px;
//   padding: 5px;
//   margin-right: 5px;
//   cursor: pointer;

//   svg {
//     margin-right: 5px;
//   }
// `;

// const DeleteButton = styled.button`
//   background-color: #f44336;
//   color: #fff;
//   border: none;
//   border-radius: 4px;
//   padding: 5px;
//   cursor: pointer;

//   svg {
//     margin-right: 5px;
//   }
// `;
// const DisableButton = styled.button`
//   background-color: #f44336;
//   color: #fff;
//   border: none;
//   border-radius: 4px;
//   padding: 5px;
//   cursor: pointer;
//   margin-right: 5px;

//   svg {
//     margin-right: 5px;
//   }
// `;
export default ManageReceptionist;
