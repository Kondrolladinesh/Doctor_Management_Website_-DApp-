import styled from "styled-components";

const Container = styled.div`
  width: 93%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  `;

// const Heading = styled.h2`
//   text-align: center;
//   font-size: 24px;
//   /* margin-bottom: 20px; */
// `;

const TextBox = styled.textarea`
box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
border-radius: 5px;
  width: 100%;
  height:480px;
  /* border: 2px solid black; */
  outline: none;
  border: none;
  padding: 20px;
  font-family: Arial, sans-serif;
  font-size: 14px;
  line-height: 1.5;
  /* margin-top: 20px; */
  resize: none;
`;
const HistoryTextBox = ({
  name,
  age,
  gender,
  diagnosis,
  medications,
  instructions,
}) => {
  const preDesignedPrescription = `Doctor's Prescription
Patient Name: ${name}
Age: ${age} years
Gender: ${gender}


`;

  return (
    <Container>
      {/* <Heading>Doctor's Prescription</Heading>  */}
      <TextBox readOnly value={preDesignedPrescription} />
    </Container>
  );
};

export default HistoryTextBox;
