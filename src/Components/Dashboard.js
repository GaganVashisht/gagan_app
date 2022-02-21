import classes from "./Dashboard.module.css";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const DashBoard = () => {
  // const userContext = useContext(UserContext);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [order, setOrder] = useState("ASC");
  const [sortKey, setSortKey] = useState("sapId");
  var data = [
    {
      name: "Gagan",
      sapId: "1",
      projectHours: "123",
      holiday: "12",
      afternoonShift: "12",
      nightShift: "0",
      daysTa: "0",
      transportAllowance: "0",
      totalAllowance: "dfa",
    },
    {
      name: "Gagan Vashisht",
      sapId: "2",
      projectHours: "123",
      holiday: "12",
      afternoonShift: "12",
      nightShift: "0",
      daysTa: "0",
      transportAllowance: "0",
      totalAllowance: "dfa",
    },
    {
      name: "Gagandeep",
      sapId: "3",
      projectHours: "123",
      holiday: "12",
      afternoonShift: "12",
      nightShift: "0",
      daysTa: "0",
      transportAllowance: "0",
      totalAllowance: "dfa",
    },
  ];
  const [sortData, setSortData] = useState(data);
  // const [arr, setArrData] = useState(data);
  //   const [portalOpened, openPortal] = useState(false);

  // setArrData(data);
  const sorting = (col) => {
    setSortKey(col);
    if (order === "ASC") {
      const sorted = [...data].sort((a, b) => (a[col] > b[col] ? 1 : -1));
      // setArrData(sorted);
      // setSortData(sorted);
      // data = arr;
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...data].sort((a, b) => (a[col] < b[col] ? 1 : -1));
      // userContext.users = sorted;
      // setArrData(sorted);
      // data = arr;
      setOrder("ASC");
    }
    console.log("sorting", sortKey, order);
  };

  // const data = userContext.users;
  const onSubmit = () => {
    // download csv
  };
  return (
    <div>
      <div className={classes.txt}>Allowance DashBoard</div>
      <div className="container">
        <label className={classes.lbl}>Project</label>
        <select>
          <option value="none" selected disabled hidden>
            Select an Option
          </option>
          <option value="digital">Digital</option>
          <option value="ep">Enterprise Platforms</option>
          <option value="cet">CET</option>
          <option value="data">Data</option>
        </select>
      </div>
      <div className="container">
        <label>Start Date</label>
        <DatePicker
          selected={startDate}
          // endDate={new Date()}
          maxDate={new Date()}
          onChange={(date) => setStartDate(date)}
        />
      </div>
      <div className="container">
        <label>End Date</label>
        <DatePicker
          selected={endDate}
          // endDate={new Date()}
          maxDate={new Date()}
          onChange={(date) => setEndDate(date)}
        />
      </div>
      <br />
      <div className={classes.mar}>
        <div className={"table  table-responsive "}>
          <table className="table table-light  ">
            <thead className="table-info">
              <tr>
                <th
                  onClick={() => {
                    sorting("name");
                  }}
                >
                  {" "}
                  Name{" "}
                  {"userId" === sortKey
                    ? "ASC" === order
                      ? "asc"
                      : "desc"
                    : ""}
                </th>
                <th
                  onClick={() => {
                    sorting("sapId");
                  }}
                >
                  {" "}
                  SAP Id{" "}
                  {"userId" === sortKey
                    ? "ASC" === order
                      ? "asc"
                      : "desc"
                    : ""}
                </th>
                <th> Project Hours </th>
                <th> Holiday/ leaves hours </th>
                <th> AfternoonShift</th>
                <th> Night Shift </th>
                <th> Days eligible for Ta </th>
                <th> Transport Allowance </th>
                <th> Total Allowance </th>
                {/* <th></th> */}
              </tr>
            </thead>
            {data.map((element, key) => (
              <tbody>
                <tr className="table-success">
                  <td> {element.name} </td>
                  <td> {element.sapId} </td>
                  <td> {element.projectHours}</td>
                  <td> {element.holiday} </td>
                  <td> {parseInt(parseInt(element.projectHours) / 8)}</td>
                  <td> {element.nightShift}</td>
                  <td>
                    {" "}
                    {parseInt(element.projectHours) / 8 +
                      parseInt(element.nightShift)}
                  </td>
                  <td> {element.transportAllowance}</td>
                  <td> {element.totalAllowance}</td>
                  {/* {
                    <td>
                      <button
                        onClick={() => {
                          // onConfirm(element);
                        }}
                        // className={classes.confirmButton}
                      >
                        Edit
                      </button>
                    </td>
                  } */}
                </tr>
              </tbody>
            ))}
          </table>
        </div>

        <button className={classes.addButton} onClick={onSubmit}>
          Download
        </button>
      </div>
    </div>
  );
};
export default DashBoard;
