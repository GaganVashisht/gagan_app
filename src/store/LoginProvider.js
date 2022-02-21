import LoginContext from "./LoginContext";
import { useNavigate } from "react-router-dom";

export default function SignupProvider(props) {
  const navigate = useNavigate();
  const loginMethod = async (data) => {
    console.log(data.email, data.pass);
    // if(data.role==="Admin")
    // navigate("/userDetails");
    // else{
    navigate("/dashboard");
    // }
  };
  return (
    <LoginContext.Provider value={loginMethod}>
      {props.children}
    </LoginContext.Provider>
  );
}
