import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 93%;
  padding: 0px 20px;
  border-radius: 5px;

  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
  margin-bottom: 6px;
  span {
    width: 100%;
    padding: 4px;
    font-size: 18px;
    line-height: 1.5;
    font-weight: 600;
  }
`;

function MainTextHeaders(props) {
  return (
    <Container>
      {/* <Heading>Doctor's Prescription</Heading>  */}
      <span>{ props.heading}</span>
    </Container>
  );
}

export default MainTextHeaders;
