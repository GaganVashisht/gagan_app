import { useRef, useState, useContext } from "react";
import Card from "../UI/Card.js";
import classes from "./Login.module.css";
import LoginContext from "../store/LoginContext";
import { Link, useNavigate } from "react-router-dom";
const isEmpty = (value) => value.trim() === "";
const isSixChars = (value) => value.trim().length >= 6;
function isValidEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}
const Login = (props) => {
  const context = useContext(LoginContext);
  const [formInputsValidity, setFormInputsValidity] = useState({
    email: true,
    pass: true,
  });
  const navigate = useNavigate();
  const emailInputRef = useRef();
  const passInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPass = passInputRef.current.value;

    const enteredEmailIsValid =
      !isEmpty(enteredEmail) && isValidEmail(enteredEmail);
    const enteredPassIsValid = !isEmpty(enteredPass) && isSixChars(enteredPass);

    setFormInputsValidity({
      email: enteredEmailIsValid,
      pass: enteredPassIsValid,
    });

    const formIsValid = enteredEmailIsValid && enteredPassIsValid;
    console.log(formIsValid);
    if (!formIsValid) {
      return;
    }

    // api call
    // passed by context
    context({
      email: enteredEmail,
      pass: enteredPass,
    });

    emailInputRef.current.value = "";
    passInputRef.current.value = "";
  };

  const emailControlClasses = `${classes.control} ${
    formInputsValidity.email ? "" : classes.invalid
  }`;
  const passControlClasses = `${classes.control} ${
    formInputsValidity.pass ? "" : classes.invalid
  }`;

  return (
    <Card>
      <form className={classes.form} onSubmit={confirmHandler}>
        {/* Email  */}

        {/* <Input ref={emailInputRef} input={{id: "email", type:"text" , }} label= "Email        " /> */}
        <div className={emailControlClasses}>
          <label htmlFor="email">Your Email</label>
          <input type="text" id="email" ref={emailInputRef} />
          {!formInputsValidity.email && <p>Please enter a valid email!</p>}
        </div>
        {/* <Input ref={passInputRef} input={{id: "pass", type:"password" , }} label= "PassWord" /> */}
        <div className={passControlClasses}>
          <label htmlFor="pass">Password</label>
          <input type="text" id="pass" ref={passInputRef} />
          {!formInputsValidity.pass && <p>Please enter a valid pass!</p>}
        </div>

        <div className={classes.actions}>
          <button className={classes.submit}>Login</button>
        </div>
      </form>
      <p>
        New user?
        <Link to="/signup">Signup</Link>
      </p>
    </Card>
  );
};

export default Login;
