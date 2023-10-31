import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #fff;
  /* border-bottom: 1px solid black; */
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1); // Add shadow
  div {
    display: flex;
    align-items: center;
    margin: 0 20px; // Add some distance from both the ends
  }
`;

const Logo = styled.img`
  height: 80px;
  width: 80px;
  /* border: 1px solid black; */
`;

const Button = styled.button`
  background-color: #00a7ff;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  border: 1px solid #000;
  border-radius: 5px;
  transition: all 0.3s ease;
  margin: 0px 5px;
  padding: 10px 15px;

  &:hover {
    background-color: #fff;
    color: #00a7ff;
    border: 2px solid #00a7ff;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center; /* Updated */
  align-items: center;
  padding: 50px 0px 0px 0px;
  margin: 5% auto;
  max-width: 1280px;
`;
const Section = styled.div`
  display: flex;
  justify-content: center; /* Updated */
  align-items: center;
  /* padding: 50px; */
  margin: 5% auto;
  max-width: 1280px;
`;

const TextContainer = styled.div`
  width: 50%;
  /* background-color: #f5f5f5;  */
  padding: 20px; /* Added */
  text-align: left; /* Centered */
  color: #2c4657;
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Subtitle = styled.p`
  font-size: 24px;
  line-height: 1.5;
  color: #777;
`;

const ImageContainer = styled.div`
  width: 50%;
  text-align: center; /* Centered */
`;

const Image = styled.img`
  width: 100%;
  height: auto;
`;
const DappSection = styled.div`
  background-color: #fff;
  padding: 50px;
  font-size: 24px;
  text-align: center;
  /* width: 50%;   */
  color: #2c4657;
`;

const DappTitle = styled.h2`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const DappText = styled.p`
  font-size: 24px;
  line-height: 1.5;
  color: #777;
`;
const Footer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #333;
  color: #fff;
  height: 50px;
`;

const FooterText = styled.p`
  font-size: 16px;
`;


const HomePage = () => {
  const navigate = useNavigate();
    const handlelogin = () => {
        navigate("/login")
      }
  const handlesignup = () => {  
    navigate("/signup")
      };
      return (
        <>
          <Nav>
            <Logo src="./images/logo.png" alt="Logo" />
            <div>
              <Button onClick={handlelogin}>Log In</Button>
              <Button onClick={handlesignup}>Sign Up</Button>
            </div>
          </Nav>
          <Container>
            <TextContainer>
              <Title>Welcome to Our DApp</Title>
              <Subtitle>
                Dapp is a Doctor's Appointment Management System that simplifies
                the process of booking and managing appointments for doctors,
                patients, and receptionists. It provides a personalized
                dashboard for doctors to manage their schedules and patient
                details, while also offering patients an intuitive interface to
                book appointments online and view their history.
              </Subtitle>
            </TextContainer>
            <ImageContainer>
              <Image src="./images/homeback.jpg" alt="Image" />
            </ImageContainer>
          </Container>
          <Section>
            <DappSection>
              <DappTitle>How Will It Help Doctors</DappTitle>
              <DappText>
                Dapp will help doctors by providing them with a personalized
                dashboard where they can easily manage their schedules, view
                patient details, and set their availability. The app also offers
                automated reminders for upcoming appointments and sends
                notifications to patients in case of any changes, allowing
                doctors to keep track of their appointments and manage their
                time more efficiently.
                <br></br>
                Additionally, Dapp allows doctors to generate online
                prescriptions with just a few clicks, reducing the time and
                effort required for manual prescription writing.
              </DappText>
            </DappSection>
          </Section>
          <Footer>
            <FooterText>Copyright © 2023</FooterText>
          </Footer>
        </>
      );
};

export default HomePage;
