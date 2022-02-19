import "./styles.css";
import LoginProvider from "./store/LoginProvider";
import SignupProvider from "./store/SignupProvider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Components/Signup";
import UserAdmin from "./Components/UserAdmin";
import Home from "./Components/Home";
import UserProvider from "./store/UserProvider";
export default function App() {
  return (
    <Router>
      <UserProvider>
        <LoginProvider>
          <SignupProvider>
            <Routes>
              <Route path="/" element={<Home />} exact />
              <Route path="/userDetails" element={<UserAdmin />} exact />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </SignupProvider>
        </LoginProvider>
      </UserProvider>
    </Router>
  );
}
