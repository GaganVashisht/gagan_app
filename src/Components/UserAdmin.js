import React, { useState, useContext } from "react";
import UserContext from "../store/UserContext";
import classes from "./UserAdmin.module.css";

import Modal from "../UI/Modal";
import AddUser from "./AddUser";
import User from "../model/User";
const UserAdmin = () => {
  const userContext = useContext(UserContext);
  const [portalOpened, openPortal] = useState(false);

  const data = userContext.users;
  const onConfirm = (data) => {
    console.log("Confirmed");
    userContext.updateUserStatus(
      new User(data.userId, data.name, data.activeFrom, data.role, data.status),
      "ACTIVE"
    );
  };
  const onSubmit = () => {
    console.log("dddddddddd");
    openPortal(true);
  };
  const onClose = () => {
    openPortal(false);
  };
  return (
    <div className={classes.mar}>
      <div className={classes.txt}>User Administration</div>

      <div className={"table  table-responsive "}>
        <table className="table table-light  ">
          <tr className="table-info">
            <th> UserId </th>
            <th> Name </th>
            <th> Active From </th>
            <th> Role </th>
            <th> Status</th>
            <th> </th>
          </tr>
          {data.map((element, key) => (
            <tr className="table-success">
              <th> {element.userId} </th>
              <th> {element.name} </th>
              <th> {element.activeFrom}</th>
              <th> {element.role} </th>
              <th> {element.status}</th>
              {
                <th>
                  <button
                    onClick={() => {
                      onConfirm(element);
                    }}
                    disabled={element.status === "Requested" ? false : true}
                    className={classes.confirmButton}
                  >
                    Confirm
                  </button>
                </th>
              }
            </tr>
          ))}
        </table>
      </div>
      {portalOpened && (
        <Modal onClose={onClose}>
          <AddUser onClose={onClose}></AddUser>
        </Modal>
      )}
      <button className={classes.addButton} onClick={onSubmit}>
        Add
      </button>
    </div>
  );
};
export default UserAdmin;
