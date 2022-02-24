import classes from "./AddUser.module.css";
import { useState, useRef, useContext } from "react";
import User from "../model/User";
import UserContext from "../store/UserContext";
const isEmpty = (value) => value.trim() === "";
const isSixChars = (value) => value.trim().length >= 6;
function isValidEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}
const AddUser = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    email: true,
    pass: true,
    role: true,
  });
  const checkIncedo = (email) => {
    // hfasd@incedoinc.com
    const list = email.split("@");
    if (list[1] === "incedoinc.com") return true;
    return false;
  };
  const emailInputRef = useRef();
  const passInputRef = useRef();
  const roleInputRef = useRef();
  const userContext = useContext(UserContext);
  const confirmHandler = (event) => {
    event.preventDefault();
    console.log("CLickked");
    console.log(userContext.users);

    const enteredEmail = emailInputRef.current.value;
    const enteredPass = passInputRef.current.value;
    const enteredRole = roleInputRef.current.value;
    const enteredEmailIsValid =
      !isEmpty(enteredEmail) && checkIncedo(enteredEmail);
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
    const date = new Date().toLocaleString();
    const formatDate = date.split(",")[0];
    userContext.addUser(
      new User(
        new Date().toLocaleString(),
        enteredEmail,
        formatDate,
        enteredRole,
        "Requested"
      )
    );
    // context({
    //   email: enteredEmail,
    //   pass: enteredPass,
    //   role: enteredRole,
    // });
    console.log(userContext.users);
    emailInputRef.current.value = "";
    passInputRef.current.value = "";
    roleInputRef.current.value = "none";
    props.onClose();
  };

  const emailControlClasses = `${classes.control} ${
    formInputsValidity.email ? "" : classes.invalid
  }`;
  const passControlClasses = `${classes.control} ${
    formInputsValidity.pass ? "" : classes.invalid
  }`;

  return (
    <div className={classes.mar}>
      <h1>ADD USER</h1>
      <hr></hr>
      <form className={classes.form} onSubmit={confirmHandler}>
        <div className="form-group contaier">
          <label for="email" className={(emailControlClasses, classes.txt)}>
            Email address
          </label>
          <input
            id="email"
            ref={emailInputRef}
            type="email"
            className="form-control"
            name="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            required
          />
        </div>
        {!formInputsValidity.email && <p>Invalid Email!</p>}
        <div className="form-group">
          <label
            for="password"
            value="password"
            className={(passControlClasses, classes.txt)}
          >
            Password
          </label>
          <input
            id="pass"
            ref={passInputRef}
            type="password"
            className="form-control"
            name="pass"
            aria-describedby="passHelp"
            placeholder="Enter Password"
            required
          />
        </div>
        {!formInputsValidity.pass && <p>Invalid Password!</p>}

        <label for="role" className={classes.txt}>
          Role
        </label>
        <select
          name="roles"
          id="roles"
          className="form-control"
          ref={roleInputRef}
          key={new Date()}
        >
          <option value="none" selected disabled hidden>
            Select role
          </option>
          <option value="Lead">Lead</option>
          <option value="Admin">Admin</option>
          <option value="Developer">Developer</option>
          {/* <option *ngFor="let r of roles" [value]="r.name">{{r.name}}</option> */}
        </select>
        {!formInputsValidity.role && <p>Select a role!</p>}
        {/* <button type="button" className="btn btn-primary my-3">
          Submit
        </button> */}
        <div className={classes.actions}>
          <button className={classes.submit}>Add</button>
        </div>
      </form>
      <hr />
    </div>
  );
};
export default AddUser;
