import styled from "styled-components";
import DoctorNav from "./DoctorNav";
import MainButtonCard from "./MainButtonCard";
import MainToolBox from "./MainToolBox";

const Main = (data) => {
  // console.log(data)
  return (
    <Container>
      <DoctorNav displayData={data} />
      <ArtBox>
        <ContinerAction>
          <MainButtonCard title="New Consult" />
        </ContinerAction>
        <MainToolBox displayData={data} />
      </ArtBox>
    </Container>
  );
};

const Container = styled.div`
  grid-area: main;
  height: 80vh;
  /* border: 1px solid black;   */
`;
const ContinerAction = styled.div`
  /* border-bottom: 1px solid black; */
  width: 100%;
  margin-top: 18px;
  display: flex;
  flex-direction: row;
  /* justify-content: space-evenly; */
  /* padding: 10px 5px; */
`;

const ArtBox = styled.div`
display: flex;
flex-direction: column;
`;

export default Main;
