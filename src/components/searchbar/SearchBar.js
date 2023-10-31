import React from 'react';
import styled from "styled-components";
import {
  FaUserPlus,
  FaTimes,
} from "react-icons/fa";
import Search from "./Search";

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #eee;
  padding: 10px 0px;
  /* padding 0.5rem; */
  margin-bottom: 20px;
  text-align: center;
  justify-content: space-evenly;
  width: 100%;
  margin: auto;

  .exit-icon {
    color: #a5a5a5;
    cursor: pointer;
    transition: color 0.2s ease-in-out;
    
    &:hover {
      color: #555;
    }
    .add-user-icon {
      color: #a5a5a5;
      margin-left: 0.5rem;
      cursor: pointer;
      transition: color 0.2s ease-in-out;
      
 

      &:hover {
        color: #555;
      }
    }
    @media (max-width: 768px) {
      .exit-icon {
        margin-right: 5px;
      }

      .add-user-icon {
        margin-left: 5px;
      }

      input[type="text"] {
        width: 80%;
        font-size: 1rem;
      }
    }
  }
`;

const StyledFaTimes = styled(FaTimes)`
  /* font-size: 1.2rem; */
  border: 1px solid black;
  border-radius: 15px;
  padding: 3px;
  font-size: 23px;
`;

const StyledFaUserPlus = styled(FaUserPlus)`
  /* font-size: 1.2rem; */
  border: 1px solid black;
  border-radius: 15px;
  padding: 3px;
  font-size: 23px;
`;
function SearchBar() {
  return (
    <SearchContainer>
      <StyledFaTimes className="exit-icon" />
      <Search />
      <StyledFaUserPlus className="add-user-icon" />
    </SearchContainer>
  );
}

export default SearchBar;