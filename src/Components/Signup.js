import { useContext, useRef, useState } from "react";
import Card from "../UI/Card.js";
import classes from "./Login.module.css";

import { Link } from "react-router-dom";
import SignupContext from "../store/SignupContext";
const isEmpty = (value) => value.trim() === "";
const isSixChars = (value) => value.trim().length >= 6;
function isValidEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}
const Signup = (props) => {
  const context = useContext(SignupContext);
  const [formInputsValidity, setFormInputsValidity] = useState({
    email: true,
    pass: true,
    role: true,
  });

  const emailInputRef = useRef();
  const passInputRef = useRef();
  const roleInputRef = useRef();
  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPass = passInputRef.current.value;
    const enteredRole = roleInputRef.current.value;
    const enteredEmailIsValid =
      !isEmpty(enteredEmail) && isValidEmail(enteredEmail);
    const enteredPassIsValid = !isEmpty(enteredPass) && isSixChars(enteredPass);
    const enteredRoleIsValid = enteredRole != "none";
    setFormInputsValidity({
      email: enteredEmailIsValid,
      pass: enteredPassIsValid,
      role: enteredRoleIsValid,
    });

    const formIsValid =
      enteredEmailIsValid && enteredPassIsValid && enteredRoleIsValid;
    console.log(formIsValid);
    if (!formIsValid) {
      return;
    }
    context({
      email: enteredEmail,
      pass: enteredPass,
      role: enteredRole,
    });

    emailInputRef.current.value = "";
    passInputRef.current.value = "";
    roleInputRef.current.value = "none";
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
        <label for="roles">Choose a role: </label>
        <div>
          <select name="roles" id="roles" ref={roleInputRef}>
            <option value="none" selected disabled hidden>
              Select an Option
            </option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="developer">Developer</option>
          </select>
          {!formInputsValidity.role && <p>Please select a role!</p>}
        </div>
        <div className={classes.actions}>
          <button className={classes.submit}>Request</button>
        </div>
      </form>
      <p>
        Already a user?
        <Link to="/">Login</Link>
      </p>
    </Card>
  );
};

export default Signup;
