import React, { useState, useContext } from "react";
import styled from "styled-components";
// import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";

import { getDoc, doc } from "firebase/firestore";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Head = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
`;

const Logo = styled.img`
  height: 100px;
  margin-right: auto;
`;
const UserLogo = styled(AccountCircleIcon)`
  /* font-size: 16px; */
  width: 120px;
  height: 100px;
`;

const ProfileIcon = styled.div`
  /* height: 30px; */
  border-radius: 5%;
  margin-right: 10px;
  /* padding: 10px; */
  justify-content: center;
  align-items: center;
  cursor: pointer;
  /* border: 1px solid black; */
  
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 60px;
  right: 10px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  padding: 10px;
  z-index: 1;
`;

const MenuItem = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 5px 10px;
  width: 100%;
  text-align: left;
  &:hover {
    background-color: #f2f2f2;
  }
`;

const LanguageOptions = styled.div`
  position: relative;
`;
const LogoWrapper = styled.div`
  width: 160px;
`;
const ProfileContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin: auto;
/* border: 1px solid black; */
/* padding: 20px; */
`;
const ProfileTitle = styled.div`
display: block;
justify-content: center;
align-items: center;
margin-right: 10px;
font-size: 22px;
span{
  font-weight: 600;
  text-transform: capitalize;
}
`;

const MainNav = ({ DocInfo }) => {
  const navigate = useNavigate();
  const { logout, user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [who, setWho] = useState("");
  const location = useLocation();
  // console.log(user);
  useEffect(() => {
    // Check if the current page is the home page
    if (location.pathname === "/Docdashboard") {
      localStorage.setItem("currentPage", "doctorpage");
      setWho("doctor");
    }
    // Check if the current page is the dashboard page
    else if (location.pathname === "/appointment") {
      localStorage.setItem("currentPage", "receptionistpage");
      setWho("receptionist");
    }
  }, [location]);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleEditProfile = () => {
    navigate("/profile");
  };

  const handelLogOut = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };

  const handleManageReceptionist = () => {
    navigate("/managereceptionist"); // replace with your desired URL
  };

  return (
    <>
      <Head>
        <LogoWrapper>
          <Logo src="./images/logo.png" alt="Company Logo" />
        </LogoWrapper>
        <div>
          <LanguageOptions>
            <ProfileContainer>
              {who === "doctor" && (
                <ProfileTitle>
                  <p>
                    Welcome! <span>{DocInfo.displayName}</span>
                  </p>
                </ProfileTitle>
)}
              <ProfileIcon>
                <AccountCircleIcon
                  onClick={toggleDropdown}
                  sx={{ color: "gray", fontSize: "6vh" }}
                />
              </ProfileIcon>
            </ProfileContainer>
            {isOpen && (
              <DropdownMenu>
                <MenuItem onClick={handleEditProfile}>Edit Profile</MenuItem>
                {who === "doctor" && (
                  <MenuItem onClick={handleManageReceptionist}>
                    Manage Receptionist
                  </MenuItem>
                )}
                <MenuItem onClick={handelLogOut}>Logout</MenuItem>
              </DropdownMenu>
            )}
          </LanguageOptions>
        </div>
      </Head>
    </>
  );
};

export default MainNav;
