import React from "react";

const UserContext = React.createContext({
  users: [],
  addUser: () => {},
  addAllUser: () => {},

  updateUserStatus: () => {},
});

export default UserContext;
