import { Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
// import Header from "./components/Header";
import DocDashboard from "./pages/DocDashboard";
import Login from "./pages/Login";
import { AuthContextProvider } from "./context/AuthContext";
import { PaitentAddContextProvider } from "./context/PatientAddContext";
import RecpDashboard from "./pages/RecpDashboard";
import Protected  from "./components/Protected";
import SignUp from "./pages/SignUp";
import HomePage from "./pages/Homepage";
import Profile from "./pages/Profile"
import ManageReceptionist from "./pages/ManageReceptionist";
function App() {
  
  return (
    <AuthContextProvider>
      <PaitentAddContextProvider>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover={false}
        // theme="light"
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/Docdashboard"
          element={
            <Protected>
              <DocDashboard />
            </Protected>
          }
        />

        <Route
          path="/appointment"
          element={
            <Protected>
              <RecpDashboard />
            </Protected>
          }
        />

        <Route
          path="/managereceptionist"
          element={
            <Protected>
              <ManageReceptionist />
            </Protected>
          }
        />
        <Route
          path="/profile"
          element={
            <Protected>
              <Profile />
            </Protected>
          }
        />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
          </PaitentAddContextProvider>
    </AuthContextProvider>
  );
}

export default App;
