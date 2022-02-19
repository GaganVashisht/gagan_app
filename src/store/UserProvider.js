import UserContext from "./UserContext";
import { useState, useReducer } from "react";
import User from "../model/User";

const defaultUserState = {
  users: [],
};
const userReducer = (state, action) => {
  if (action.type === "ADD") {
    let updatedUsers = [];
    var existingUser = false;
    for (var u in state.users) {
      if (u.userId === action.user.userId) {
        existingUser = true;
        break;
      }
    }

    if (!existingUser) {
      state.users.splice(0, 0, action.user);
    }
    console.log(action.user.name);
    console.log(updatedUsers);
    console.log(state.users);
    updatedUsers = [...state.users];

    return {
      users: updatedUsers,
    };
  }
  if (action.type === "UPDATE_STATUS") {
    let index;

    for (let i = 0; i < state.users.length; i++) {
      if (state.users[i].userId === action.user.userId) {
        index = i;
        console.log("Matched", state.users[i].name);

        break;
      }
    }

    const newUser = new User(
      action.user.userId,
      action.user.name,
      action.user.activeFrom,
      action.user.role,
      action.status
    );
    state.users[index] = newUser;
    const updatedUsers = [...state.users];

    return {
      users: updatedUsers,
    };
  }
  return defaultUserState;
};
export default function UserProvider(props) {
  const [userState, dispatchUserAction] = useReducer(
    userReducer,
    defaultUserState
  );
  const addUserHandler = (user) => {
    console.log("addUser");
    console.log(user.name);

    dispatchUserAction({ type: "ADD", user: user });
  };

  const updateUserHandler = (user, newStatus) => {
    dispatchUserAction({
      type: "UPDATE_STATUS",
      user: user,
      status: newStatus,
    });
  };
  const currentContext = {
    users: userState.users,
    addUser: addUserHandler,
    updateUserStatus: updateUserHandler,
  };

  return (
    <UserContext.Provider value={currentContext}>
      {props.children}
    </UserContext.Provider>
  );
}

// const CartProvider = (props) => {

// //   const addItemToCartHandler = (item) => {
// //     dispatchCartAction({ type: 'ADD', item: item });
// //   };

// //   const removeItemFromCartHandler = (id) => {
// //     dispatchCartAction({ type: 'REMOVE', id: id });
// //   };

// //   const clearCartHandler = () => {
// //     dispatchCartAction({type: 'CLEAR'});
// //   };

//   const cartContext = {
//     items: cartState.items,
//     totalAmount: cartState.totalAmount,
//     addItem: addItemToCartHandler,
//     removeItem: removeItemFromCartHandler,
//     clearCart: clearCartHandler
//   };

//   return (
//     <CartContext.Provider value={cartContext}>
//       {props.children}
//     </CartContext.Provider>
//   );
