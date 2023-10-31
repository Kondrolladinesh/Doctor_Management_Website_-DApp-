import React, { useEffect, useState } from "react";
import { auth, db, storage } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import TextField from "@mui/material/TextField"; 
import {
  // Container,
  // Typography,
  // TextField,
  // Button,
  // Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
// import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* height: 90vh; */
`;
const TextInput = styled(TextField)`
  // border: none;
  font-size: 15px;
  width: 200px;
  // padding: 5px;
  background-color: #fff;
`;

const Form = styled.form`
  background-color: lightgray;
  /* height: 60vh; */
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* background-color: #fff; */
  padding: 50px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`;
const Input = styled.input`
  padding: 18px;
  width: 300px;
  margin-bottom: 20px;
  border: none;
  font-size: 18px;
  border-radius: 5px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  &.gender {
    text-transform: capitalize;
  }
  &.email {
    text-transform: lowercase;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;
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
  margin-top: 25px;
  grid-column: 2/3;

  &:hover {
    background-color: grey;
    color: #333;
  }
`;
// const Select = styled.select`
//   padding: 16px;
//   background-color: #fff;
//   width: 340px;
//   font-size: 18px;
//   margin-bottom: 25px;
//   /* padding: 10px; */
//   border: none;
//   border-radius: 5px;
//   box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
// `;

const Option = styled.option`
  padding: 10px;
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

const SignUp = () => {
  const [data, setData] = useState("");
  // const [file, setFile] = useState({});
  const navigate = useNavigate();
  const { signup, user } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleInput = (e) => {
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

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signup(email, password);
      // Signed in
      const user = userCredential.user;
      const collectionName = "doctor";
      await setDoc(doc(db, collectionName, user.uid), {
        ...data,
        timeStamp: serverTimestamp(),
      });
      toast("✅ SignUp Sucessfull!");
      console.log(data);
      navigate("/login");
    } catch (error) {
      toast("Email-Id Already exist !");
      console.log(error);
    }
  };
  const handlelogin = () => {
    navigate("/login");
  };
  return (
    <>
      <Nav>
        <Logo src="./images/logo.png" alt="Logo" />
        <div>
          <Button onClick={handlelogin}>Login</Button>
        </div>
      </Nav>
      <Container>
        <h1>Enter Details</h1>
        <Form onSubmit={handleSignup}>
          {/* <input type="file" accept="image/*" id="file" onChange={(e) => {
            setFile(e.target.files[0])
          }}

          /> */}
          <TextInput
            id="displayName"
            type="text"
            varient="outlined"
            required
            fullWidth
            label="FullName"
            onChange={handleInput}
          />
          <TextInput
            id="phone"
            type="number"
            varient="outlined"
            required
            fullWidth
            label="Number"
            onChange={handleInput}
          />
          <TextInput
            id="email"
            type="email"
            className="email"
            varient="outlined"
            required
            fullWidth
            label="Email"
            onChange={handleInput}
          />
          <TextInput
            id="password"
            type="password"
            varient="outlined"
            required
            fullWidth
            label="Password"
            onChange={handleInput}
          />
          <TextInput
            id="gender"
            className="gender"
            type="text"
            varient="outlined"
            required
            fullWidth
            label="M/F/Other"
            onChange={handleInput}
            maxLength={1}
          />
          <Input
            id="dob"
            type="date"
            onChange={handleInput}
          />
          <TextInput
            id="address"
            type="text"
            varient="outlined"
            required
            fullWidth
            label="Address"
            onChange={handleInput}
          />
          <TextInput
            id="city"
            type="text"
            varient="outlined"
            required
            fullWidth
            label="City"
            onChange={handleInput}
          />
          <FormControl fullWidth required>
            <InputLabel>State</InputLabel>
            <Select id="state" name="state">
              <Option value="Andhra Pradesh">Andhra Pradesh</Option>
              <Option value="Arunachal Pradesh">Arunachal Pradesh</Option>
              <Option value="Assam">Assam</Option>
              <Option value="Bihar">Bihar</Option>
              <Option value="Chhattisgarh">Chhattisgarh</Option>
              <Option value="Goa">Goa</Option>
              <Option value="Gujarat">Gujarat</Option>
              <Option value="Haryana">Haryana</Option>
              <Option value="Himachal Pradesh">Himachal Pradesh</Option>
              <Option value="Jharkhand">Jharkhand</Option>
              <Option value="Karnataka">Karnataka</Option>
              <Option value="Kerala">Kerala</Option>
              <Option value="Madhya Pradesh">Madhya Pradesh</Option>
              <Option value="Maharashtra">Maharashtra</Option>
              <Option value="Manipur">Manipur</Option>
              <Option value="Meghalaya">Meghalaya</Option>
              <Option value="Mizoram">Mizoram</Option>
              <Option value="Nagaland">Nagaland</Option>
              <Option value="Odisha">Odisha</Option>
              <Option value="Punjab">Punjab</Option>
              <Option value="Rajasthan">Rajasthan</Option>
              <Option value="Sikkim">Sikkim</Option>
              <Option value="Tamil Nadu">Tamil Nadu</Option>
              <Option value="Telangana">Telangana</Option>
              <Option value="Tripura">Tripura</Option>
              <Option value="Uttar Pradesh">Uttar Pradesh</Option>
              <Option value="Uttarakhand">Uttarakhand</Option>
              <Option value="West Bengal">West Bengal</Option>
            </Select>
          </FormControl>

          <TextInput
            id="zipcode"
            type="number"
            varient="outlined"
            required
            fullWidth
            label="Zip Code"
            onChange={handleInput}
          />
          <FormControl fullWidth required>
            <InputLabel>Specialization for doctors</InputLabel>
            <Select id="specialization" name="specialization">
              <Option value="general-practitioner">General Practitioner</Option>
              <Option value="cardiologist">Cardiologist</Option>
              <Option value="dermatologist">Dermatologist</Option>
              <Option value="pediatrician">Pediatrician</Option>
              <Option value="psychiatrist">Psychiatrist</Option>
              <Option value="urologist">Urologist</Option>
            </Select>
            </FormControl>
          <TextInput
            id="qualification"
            type="text"
            varient="outlined"
            required
            fullWidth
            label="Qualification"
            onChange={handleInput}
          />
          <TextInput
            id="experience"
            type="text"
            varient="outlined"
            required
            fullWidth
            label="Experience"
            onChange={handleInput}
          />
          <FormControl fullWidth required>
            <InputLabel>Profession</InputLabel>
            <Select id="role" name="role" onChange={handleInput}>
              <Option value="" disabled selected hidden>
                -Select-
              </Option>
              <Option value="doctor">Doctor</Option>
            </Select>
          </FormControl>
          <Click type="submit">Sign up</Click>
        </Form>
      </Container>
    </>
  );
};

export default SignUp;
