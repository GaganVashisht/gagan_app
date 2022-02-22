import classes from "./Dashboard.module.css";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CSVLink } from "react-csv";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
const DashBoard = (props) => {
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
  const headers = [
    { label: "Name", key: "name" },
    { label: "SAP Id", key: "sapId" },
    { label: "project Hours", key: "projectHours" },
    { label: "Holiday", key: "holiday" },
    { label: "Af Shift", key: "afternoonShift" },
    { label: "night sht", key: "nightShift" },
    { label: "days ta", key: "daysTa" },
    { label: "transport allowance", key: "transportAllowance" },
    { label: "totalAllowance", key: "totalAllowance" },
  ];
  const csvReport = {
    data: data,
    headers: headers,
    filename: "Allowance_Report.csv",
  };

  const [sortData, setSortData] = useState(data);
  // const [arr, setArrData] = useState(data);
  //   const [portalOpened, openPortal] = useState(false);

  // setArrData(data);
  useEffect(() => {
    setSortData(data);
  }, []);
  const sorting = (col) => {
    setSortKey(col);
    if (order === "ASC") {
      const sorted = [...data].sort((a, b) => (a[col] < b[col] ? 1 : -1));
      // setArrData(sorted);
      data = sorted;
      setSortData(sorted);
      // data = arr;
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...data].sort((a, b) => (a[col] > b[col] ? 1 : -1));
      // userContext.users = sorted;
      // setArrData(sorted);
      data = sorted;
      setSortData(sorted);

      setOrder("ASC");
    }
    console.log("sorting", sortKey, order);
  };

  // const data = userContext.users;

  return (
    <div>
      <div className={classes.txt}>Allowance DashBoard</div>
      <div className="container">
        <label className={classes.lbl}>Project</label>
        <select defaultValue={"none"}>
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
                  {"name" === sortKey ? (
                    "ASC" === order ? (
                      <AiFillCaretUp />
                    ) : (
                      <AiFillCaretDown></AiFillCaretDown>
                    )
                  ) : (
                    ""
                  )}
                </th>
                <th
                  onClick={() => {
                    sorting("sapId");
                  }}
                >
                  {" "}
                  SAP Id{" "}
                  {"sapId" === sortKey ? (
                    "ASC" === order ? (
                      <AiFillCaretUp />
                    ) : (
                      <AiFillCaretDown></AiFillCaretDown>
                    )
                  ) : (
                    ""
                  )}
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
            {sortData.map((element, key) => (
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
        <CSVLink {...csvReport}>
          <button className={classes.addButton}>Download</button>
        </CSVLink>
      </div>
    </div>
  );
};

export default DashBoard;
