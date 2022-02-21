import React, { useState, useContext } from "react";
import UserContext from "../store/UserContext";
import classes from "./UserAdmin.module.css";

import Modal from "../UI/Modal";
import AddUser from "./AddUser";
import User from "../model/User";

// import DownArrow from "material-ui/svg-icons/navigation";

const UserAdmin = () => {
  const userContext = useContext(UserContext);
  const [portalOpened, openPortal] = useState(false);

  const [order, setOrder] = useState("ASC");
  const [sortKey, setSortKey] = useState();
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

  const sorting = (col) => {
    setSortKey(col);
    if (order === "ASC") {
      const sorted = [...data].sort((a, b) => (a[col] > b[col] ? 1 : -1));
      userContext.users = sorted;
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...data].sort((a, b) => (a[col] < b[col] ? 1 : -1));
      userContext.users = sorted;
      setOrder("ASC");
    }
    console.log(order, sortKey);
  };

  return (
    <div className={classes.mar}>
      <div className={classes.txt}>User Administration</div>

      <div className={"table  table-responsive "}>
        <table className="table table-light  ">
          <thead>
            <tr className="table-info">
              <th
                onClick={() => {
                  sorting("userId");
                }}
              >
                {" "}
                <div>
                  User Id{" "}
                  {"userId" === sortKey
                    ? "ASC" === order
                      ? "asc"
                      : "desc"
                    : ""}
                </div>
              </th>
              <th
                onClick={() => {
                  sorting("name");
                }}
              >
                <div>
                  Name{" "}
                  {"name" === sortKey ? ("ASC" === order ? "asc" : "desc") : ""}
                </div>
              </th>
              <th> Active From </th>
              <th> Role </th>
              <th> Status</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {data.map((element, key) => (
              <tr className="table-success">
                <td> {element.userId} </td>
                <td> {element.name} </td>
                <td> {element.activeFrom}</td>
                <td> {element.role} </td>
                <td> {element.status}</td>
                {
                  <td>
                    <button
                      onClick={() => {
                        onConfirm(element);
                      }}
                      disabled={element.status === "Requested" ? false : true}
                      // className={classes.confirmButton}
                    >
                      Confirm
                    </button>
                  </td>
                }
              </tr>
            ))}
          </tbody>
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
