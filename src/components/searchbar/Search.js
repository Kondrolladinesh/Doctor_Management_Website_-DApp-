import React from "react";
import styled from "styled-components";
import {
  FaSearch,
  // FaHome,
  // FaUser,
  // FaCog,
  // FaUserPlus,
  // FaTimes,
} from "react-icons/fa";

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 0.5rem;
  padding: 0.5rem 0.5rem;
  border: 1px solid black;
  &:hover {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  }

  &:focus-within {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  }

  input[type="text"] {
    border: none;
    outline: none;
    font-size: 1rem;
    width: 100%;
    margin-left: 0.25rem;
    background-color: transparent;

    &:placeholder {
      color: #a5a5a5;
      opacity: 1;
      transition: opacity 0.2s ease-in-out;
    }

    &:focus::placeholder {
      opacity: 0;
    }
  }
`;
const StyledFaSearch = styled(FaSearch)`
  color: #a5a5a5;
`;

const Search = () => {
    return (
      <div>
        <SearchContainer>
          <StyledFaSearch />
          <input type="text" placeholder="Search" />
        </SearchContainer>
      </div>
    );
};

export default Search;