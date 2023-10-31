import styled from "styled-components";

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin: 0;
  padding: 0;
`;

const Button = styled.button`
  background-color: white;
  color: rgb(52, 152, 219)  ;
  padding: 14px 45px;
  /* border: none; */
  border: 1px solid rgb(52, 152, 219);
  margin: 0px 20px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 500;
  /* border: 1px solid black    ; */
  &:first-child {
    background-color: rgb(52, 152, 219);
    color: white;
    padding: 20px 45px;
    border: none;
    border-radius: 5px;
  }
`;


const MainButtonCard = () => {
  return (
    <ButtonContainer>
      <Button>New Consult</Button>
      <Button>Vaccination</Button>
      <Button>Certificate</Button>
      <Button>Add Bill</Button>
    </ButtonContainer>
  );
};
export default MainButtonCard;
