import React from "react";
import styled from "styled-components";
import SearchBar from "../components/searchbar/SearchBar";


const Container = styled.div`

  text-align: center;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  /* margin-bottom: 8px; */
  background-color: #fff;
  border-radius: 5px;
  transition: box-shadow 83ms;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SideNav = () => {
  return (
    <Container>
     <SearchBar />
    </Container>
  );
};

export default SideNav;
