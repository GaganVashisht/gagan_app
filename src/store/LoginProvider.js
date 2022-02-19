import LoginContext from "./LoginContext";
import { useNavigate } from "react-router-dom";

export default function SignupProvider(props) {
  const navigate = useNavigate();
  const loginMethod = async (data) => {
    console.log(data.email, data.pass);
    navigate("/userDetails");
  };
  return (
    <LoginContext.Provider value={loginMethod}>
      {props.children}
    </LoginContext.Provider>
  );
}
