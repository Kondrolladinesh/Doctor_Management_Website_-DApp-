import styled from "styled-components";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Container = styled.div`
  margin: 0;
  padding: 0;
  width: auto;
`;
const UserInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px;
  /* border-bottom: 1px solid black; */
  height: 6vh;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  background-color: white;
  /* opacity: 0.3; */
  border-radius: 50%;
`;
const UserAge = styled.span`
  font-size: 16px;
  margin-right: 6px;
  font-size: 14px;
  /* border: 1px solid black; */
`;
const UserGender = styled.span`
  font-size: 16px;
  margin-right: 6px;
  font-size: 14px;
  /* border: 1px solid black; */
`;
const UserTime = styled.span`
  font-size: 14px;
  /* border: 1px solid black; */
`;
const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  position: relative;
  /* border: 1px solid black; */
  height: 5vh;
  margin-left: 5px;
  align-self: flex-start;
`;
const UserDetailsDesc = styled.div`
  /* border: 1px solid black; */
  display: flex;
  flex-direction: row;  
  position: relative;
  margin-top: -28px;
`;
const UserName = styled.h3`
  /* border: 1px solid black; */
  font-size: 22px;
  line-height: 0.2px;
  font-weight: bold;
  padding: 10px 0px;
  justify-content: left;
`;
const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 20px;
`;
const Usercard = (props) => {
  const { user } = useAuth();
  return (
    <Container>
      <UserInfo>
        {/* <IconContainer>
          <ProfileImage src={user?.photoURL} alt="User Profile" />
        </IconContainer> */}
        <UserDetails>
          <UserName>{props.name}</UserName>
          {/* <UserDetailsDesc>
            <UserGender>{props.gender}</UserGender>
            <UserAge>{props.age}yrs</UserAge>
            <UserTime>{props.time}s</UserTime>
          </UserDetailsDesc> */}
        </UserDetails>
      </UserInfo>
    </Container>
  );
};
export default Usercard;
