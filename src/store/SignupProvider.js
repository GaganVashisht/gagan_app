import SignupContext from "./SignupContext";
import { useNavigate } from "react-router-dom";
export default function SignupProvider(props) {
  const navigate = useNavigate();
  const signupMethod = async (data) => {
    console.log(data.email, data.pass, data.role);
    navigate("/");
  };
  return (
    <SignupContext.Provider value={signupMethod}>
      {props.children}
    </SignupContext.Provider>
  );
}
