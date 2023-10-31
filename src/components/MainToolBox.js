import styled from "styled-components";
import HistoryTextBox from "./HistroyTextBox";
import PrescriptionTextBox from "./PrescriptionTextBox";
import MainTextHeaders from "./MainTextHeaders";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0;
  position: relative;
  /* height: 20vh; */
`;

const Box = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
/* border: 1px solid black; */
`;

const LeftBoxContent = styled.p`
  font-size: 18px;
  width: 100%;
  `;

const RightBoxContent = styled.p`
width: 100%;
  font-size: 18px;
  /* color: gray; */
`;

const MainToolBox = ({ displayData }) => {
  return (
    <Container>
      <Box>
        <LeftBoxContent>
          <MainTextHeaders heading={"Medical History"} data={displayData} />
          <HistoryTextBox />
        </LeftBoxContent>
      </Box>
      <Box>
        <RightBoxContent>
          <MainTextHeaders heading={"Prescription"} />
          <PrescriptionTextBox data={displayData} />
        </RightBoxContent>
      </Box>
    </Container>
  );
};

export default MainToolBox;
