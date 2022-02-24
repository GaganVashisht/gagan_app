import React, { useState, useContext, useEffect, useRef } from "react";
import UserContext from "../store/UserContext";
import classes from "./UserAdmin.module.css";

import Modal from "../UI/Modal";
import AddUser from "./AddUser";
import User from "../model/User";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

// import DownArrow from "material-ui/svg-icons/navigation";

const UserAdmin = () => {
  const userContext = useContext(UserContext);
  const dialogRef = useRef();
  const [portalOpened, openPortal] = useState(false);
  const [counter, setCounter] = useState(0);
  const [changeData, setChangeData] = useState([]);
  const [order, setOrder] = useState("ASC");
  const [sortKey, setSortKey] = useState();
  const [showDialog, setDialog] = useState(false);

  const data = userContext.users;

  const onConfirm = async (data) => {
    var changedUser = null;

    const d = changeData.filter((e) => data.userId === e.userId);
    if (d.length === 1) {
      changedUser = d[0];
    }

    const temp = changeData.filter((e) => data.userId !== e.userId);
    setChangeData(temp);

    if (
      (changedUser != null && changedUser.status === "Requested") ||
      changedUser == null
    ) {
      changedUser = data;
      var newStatus;

      const confirmBox = window.confirm("Do you Want to Make the User Active");
      if (confirmBox === true) {
        newStatus = "Active";
      } else {
        newStatus = "Inactive";
      }

      changedUser.status = newStatus;
    }

    userContext.updateUserStatus(
      new User(data.userId, data.name, data.activeFrom, data.role, data.status),
      changedUser
    );
    setCounter(counter + 1);
  };

  const display = async () => {
    console.log("dasfas");
    setDialog(true);
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
      const sorted = [...data].sort((a, b) => (a[col] < b[col] ? 1 : -1));
      userContext.users = sorted;
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...data].sort((a, b) => (a[col] > b[col] ? 1 : -1));
      userContext.users = sorted;
      setOrder("ASC");
    }
    console.log(order, sortKey);
  };
  // var changeData = [];
  useEffect(() => {
    console.log("use effect");
    console.log(changeData);
  }, [counter, changeData, data]);

  const roleChange = (value, element) => {
    const u = new User(
      element.userId,
      element.name,
      element.activeFrom,
      value.target.value,
      element.status
    );

    var flag = false;
    for (var i = 0; i < changeData.length; i++) {
      // console.log(e.userId, u.userId);
      if (changeData[i].userId === u.userId) {
        changeData[i].role = u.role;
        flag = true;
        break;
      }
    }
    if (!flag) {
      changeData.push(u);
    }
    setCounter(counter + 1);
    setChangeData(changeData);

    // console.log(value.target.value, u);
  };

  const statusChange = (value, element) => {
    const u = new User(
      element.userId,
      element.name,
      element.activeFrom,
      element.role,
      value.target.value
    );

    // u.status = value.target.value;
    var usePresent = false;
    for (var i = 0; i < changeData.length; i++) {
      // console.log(e.userId, u.userId);
      if (changeData[i].userId === u.userId) {
        changeData[i].status = u.status;
        usePresent = true;
        break;
      }
    }
    if (!usePresent) {
      changeData.push(u);
    }
    setCounter(counter + 1);
    setChangeData(changeData);

    // console.log(value.target.value, element);
  };

  const checkConfirm = (element) => {
    console.log("Inside checkconfirm");

    for (var i = 0; i < changeData.length; i++) {
      if (changeData[i].userId === element.userId) return false;
    }

    console.log("Not matched");
    return true;
  };

  return (
    <div className={classes.mar}>
      <div className={classes.txt}>User Administration</div>

      <div className={"table  table-responsive "}>
        <table className="table table-light table-hover  ">
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
                  {"userId" === sortKey ? (
                    "ASC" === order ? (
                      <AiFillCaretUp />
                    ) : (
                      <AiFillCaretDown></AiFillCaretDown>
                    )
                  ) : (
                    <AiFillCaretUp />
                  )}
                </div>
              </th>
              <th
                onClick={() => {
                  sorting("name");
                }}
              >
                <div>
                  Name{" "}
                  {"name" === sortKey ? (
                    "ASC" === order ? (
                      <AiFillCaretUp />
                    ) : (
                      <AiFillCaretDown></AiFillCaretDown>
                    )
                  ) : (
                    <AiFillCaretUp />
                  )}
                </div>
              </th>
              <th> Active From </th>
              <th> Role </th>
              <th> Status</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {data.map((element) => (
              <tr className="table-success">
                <td> {element.userId} </td>
                <td> {element.name} </td>
                <td> {element.activeFrom}</td>
                <td>
                  {
                    <select
                      id="role"
                      name="role"
                      onChange={(e) => roleChange(e, element)}
                      key={element.userId}
                    >
                      <option selected hidden>
                        {element.role}
                      </option>

                      <option value="Lead">Lead</option>
                      <option value="Developer">Developer</option>
                      <option value="Admin">Admin</option>
                    </select>
                  }
                </td>
                {/* <td> {element.role} </td> */}
                <td>
                  {
                    <select
                      id="status"
                      key={element.userId}
                      name="status"
                      onChange={(e) => statusChange(e, element)}
                    >
                      <option selected disabled hidden value={element.status}>
                        {element.status}
                      </option>
                      <option value="Requested">Requested</option>

                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  }
                </td>
                {
                  <td>
                    <button
                      onClick={() => {
                        onConfirm(element);
                      }}
                      disabled={
                        element.status === "Requested"
                          ? false
                          : checkConfirm(element)
                      }
                      className={
                        element.status === "Requested"
                          ? false
                          : checkConfirm(element)
                          ? "btn btn-sm"
                          : "btn btn-info btn-sm"
                      }
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
