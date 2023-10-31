import React, { useState } from "react";
import styled from "styled-components";
import { auth, db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { async } from "@firebase/util";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import TextField from "@mui/material/TextField";
import { toast } from "react-toastify";


const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70vh;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  padding: 50px;
  gap: 0.8rem;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`;
// const Input = styled.input`
//   padding: 18px;
//   width: 300px;
//   margin-bottom: 20px;
//   border: none;
//   font-size: 18px;
//   border-radius: 5px;
//   box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
// `;

const TextInput = styled(TextField)`
  // border: none;
  font-size: 15px;
  width: 200px;
  padding: 5px;
  background-color: #fff;
`;

const Click = styled.button`
  padding: 18px;
  font-size: 18px;
  width: 340px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #fff;
    color: #333;
    border: 1px solid #333;
  }
`;
const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #fff;
  /* border-bottom: 1px solid black; */
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1); // Add shadow
  div {
    display: flex;
    align-items: center;
    margin: 0 20px; // Add some distance from both the ends
  }
`;

const Logo = styled.img`
  height: 90px;
`;

const Button = styled.button`
  background-color: #00a7ff;
  color: #fff;
  font-size: 22px;
  cursor: pointer;
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 5px;
  transition: all 0.3s ease;
  margin: 0px 5px;
  padding: 15px 30px;

  &:hover {
    background-color: #fff;
    color: #00a7ff;
    border: 2px solid #00a7ff;
  }
`;

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, user } = useContext(AuthContext);


  const handleSignup = async (e) => {
    e.preventDefault();
    await login(email, password)
    .then(async (userCredential) => {
      // Signed in
      const user = userCredential.user;
      const docId = userCredential.user.uid;
      console.log(docId);
        const documentRef1 = doc(db, "doctors", docId);
        const documentSnapshot1 = await getDoc(documentRef1);
        const documentRef2 = doc(db, "receptions", docId);
        const documentSnapshot2 = await getDoc(documentRef2);

        if (documentSnapshot1.exists()) {
          console.log("Document exists in 1");
          // setUse("doctor")
          navigate('/Docdashboard');
        } else if (documentSnapshot2.exists()) {
          // setUse("receptionist")
          console.log("Document exists in 2");
          navigate("/appointment");
        } else {
          return false;
        }
      })
      .catch((error) => {
        // console.log(error);
        toast("Something went wrong !");

      });
  };
  const handlesignup = () => {
    navigate("/signup");
  };
  const handlehome = () => {
    navigate("/");
  };

  return (
    <>
      <Nav>
        <Logo onClick={handlehome} src="./images/logo.png" alt="Logo" />
        <div>
          <Button onClick={handlesignup}>Sign Up</Button>
        </div>
      </Nav>
      <Container>
        <Form onSubmit={handleSignup}>
          <TextInput
            type="email"
            varient = "outlined"
            required
            fullWidth
            label ="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextInput
            type="password"
            varient = "outlined"
            required
            fullWidth
            label ="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Click type="submit">Login</Click>
        </Form>
      </Container>
    </>
  );
};

export default Login;
