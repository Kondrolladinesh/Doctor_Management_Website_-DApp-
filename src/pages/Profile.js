import { useState, useEffect } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import MainNav from "../components/MainNav";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f5f5f5;
  border-radius: 5px;
  font-family: Arial, sans-serif;
`;

const ProfileHeader = styled.header`
  display: flex;
  align-items: center;
  border: 2px solid #00a7ff;
  background-color: #D3D3D3;
  border-radius: 5px;
  margin-bottom: 2rem;
`;

const ProfilePicture = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 1px solid #333;
  margin-left: 10px;
  margin-right: 2rem;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Heading = styled.h2`
  margin-bottom: 1rem;
  justify-content:center;
  display:flex;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Label = styled.label`
  display: block;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #0077cc;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #005fa3;
  }
`;

const CancelButton = styled(Button)`
  background-color: #ccc;
  &:hover {
    background-color: #999;
  }
`;

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [collection, setCollection] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  const docId = user.uid;

  useEffect(() => {
    if (user) {
      const doctorDocRef = doc(db, "doctors", docId);
      const receptionDocRef = doc(db, "receptions", docId);
      const doctorDoc = onSnapshot(doctorDocRef, (doc) => {
        if (doc.exists()) {
          setUserData(doc.data());
          setCollection("doctors");
        } else {
          const receptionDoc = onSnapshot(receptionDocRef, (doc) => {
            if (doc.exists()) {
              setUserData(doc.data());
              setCollection("receptions");
            }
          });
          return receptionDoc;
        }
      });
    }
  }, [user]);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setUserData((prevData) => ({ ...prevData, [name]: value }));
  // };

  const handleEdit = () => {
    setIsEditable(true);
  };

  const handleCancel = () => {
    setIsEditable(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        displayName: e.target.displayName.value,
        email: e.target.email.value,
        phone: e.target.phone.value,
        address: e.target.address.value,
      };

      const docRef = doc(db, collection, docId);
      await updateDoc(docRef, data);
      setIsEditable(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile.");
    }
  };

  const handleLogout = () => {
    navigate("/login");
    };

  return (
    <>
      <MainNav />
      <Container>
        <Button
          onClick={() => {
            navigate(-1);
          }}
        >
          Go Back
        </Button>
        <Heading>User Profile</Heading>
        <ProfileHeader>
          <ProfilePicture src="https://via.placeholder.com/50" alt="Profile" />
          <ProfileInfo>
            <Heading>{userData.displayName || ""}</Heading>
            <p>{userData.email}</p>
            <p>{userData.phone}</p>
            <p>{userData.address}</p>
          </ProfileInfo>
        </ProfileHeader>

        <Form onSubmit={handleSubmit}>
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            name="displayName"
            defaultValue={userData.displayName}
            readOnly={!isEditable}
            required
          />

          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            defaultValue={userData.email}
            readOnly={!isEditable}
            required
          />

          <Label htmlFor="phone">Phone</Label>
          <Input
            type="tel"
            id="phone"
            name="phone"
            defaultValue={userData.phone}
            readOnly={!isEditable}
            required
          />

          <Label htmlFor="address">Address</Label>
          <Input
            type="text"
            id="address"
            name="address"
            defaultValue={userData.address}
            readOnly={!isEditable}
            required
          />

          {!isEditable && (
            <ButtonContainer>
              <Button type="button" onClick={handleEdit}>
                Edit
              </Button>
            </ButtonContainer>
          )}

          {isEditable && (
            <ButtonContainer>
              <Button type="submit">Save</Button>
              <CancelButton type="button" onClick={handleCancel}>
                Cancel
              </CancelButton>
            </ButtonContainer>
          )}
          <ButtonContainer>
            <Button type="button" onClick={handleLogout}>
            Logout
            </Button>
          </ButtonContainer>
        </Form>
      </Container>
    </>
  );
};



export default Profile;
