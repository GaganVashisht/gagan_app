import { useState } from "react";
import DashBoard from "./Dashboard";
import UserAdmin from "./UserAdmin";
const HomeScreen = () => {
  const [showDashBoard, setDashBoard] = useState(true);

  return (
    <>
      <div className="my-2">
        <button
          className="btn btn-info mx-3"
          onClick={() => {
            setDashBoard(false);
          }}
        >
          User Administration
        </button>
        <button
          className="btn btn-info"
          onClick={() => {
            setDashBoard(true);
          }}
        >
          Allowance DashBoard
        </button>
        {showDashBoard ? <DashBoard></DashBoard> : <UserAdmin></UserAdmin>}
      </div>
    </>
  );
};

export default HomeScreen;
