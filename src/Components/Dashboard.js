import classes from "./Dashboard.module.css";
import { useState, useEffect, Fragment } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CSVLink } from "react-csv";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import EditableRow from "./EditableRow";
import ReadOnlyRow from "./ReadOnlyRow";
const DashBoard = () => {
  // const userContext = useContext(UserContext);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [order, setOrder] = useState("ASC");
  const [sortKey, setSortKey] = useState("sapId");
  const [rowId, setRowId] = useState(-1);

  const [editData, setEditData] = useState({
    id: "",
    name: "",
    sapId: "",
    projectHours: "",
    holiday: "",
    afternoonShift: "",
    nightShift: "",
    daysTa: "",
    transportAllowance: "",
    totalAllowance: "",
  });
  const [editTa, setEditTa] = useState(false);

  var data = [
    {
      id: "1",
      name: "Gagan",
      sapId: "1",
      projectHours: "123",
      holiday: "12",
      afternoonShift: "12",
      nightShift: "0",
      daysTa: "0",
      transportAllowance: "12323",
      totalAllowance: "12312",
    },
    {
      id: "3",

      name: "Gagan Vashisht",
      sapId: "3",
      projectHours: "123",
      holiday: "12",
      afternoonShift: "12",
      nightShift: "0",
      daysTa: "0",
      transportAllowance: "12323",
      totalAllowance: "12312",
    },
    {
      id: "2",

      name: "Gagandeep",
      sapId: "2",
      projectHours: "123",
      holiday: "12",
      afternoonShift: "12",
      nightShift: "0",
      daysTa: "0",
      transportAllowance: "12323",
      totalAllowance: "12312",
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

  const [sortData, setSortData] = useState(data);

  useEffect(() => {
    setSortData(data);
  }, []);
  const sorting = (col) => {
    setSortKey(col);
    if (order === "ASC") {
      const sorted = [...data].sort((a, b) => (a[col] < b[col] ? 1 : -1));

      setSortData(sorted);
      data = sorted;

      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...data].sort((a, b) => (a[col] > b[col] ? 1 : -1));

      setSortData(sorted);
      data = sorted;

      setOrder("ASC");
    }
    console.log("sorting", sortKey, order);
  };
  const csvReport = {
    data: sortData,
    headers: headers,
    filename: "Allowance_Report.csv",
  };
  const handleEditClick = (event, data) => {
    console.log("inside handle edit click");
    event.preventDefault();
    setRowId(data.id);
    const tempData = {
      id: data.id,
      name: data.name,
      sapId: data.sapId,
      projectHours: data.projectHours,
      holiday: data.holiday,
      afternoonShift: data.afternoonShift,
      nightShift: data.nightShift,
      daysTa: data.daysTa,
      transportAllowance: data.transportAllowance,
      totalAllowance: data.totalAllowance,
    };
    setEditTa(false);
    setEditData(tempData);
  };

  const handleSaveClick = (event) => {
    console.log("inside handle save click");
    console.log(editData);
    event.preventDefault();
    const editedData = {
      id: rowId,
      name: editData.name,
      sapId: editData.sapId,
      projectHours: editData.projectHours,
      holiday: editData.holiday,
      afternoonShift: editData.afternoonShift,
      nightShift: editData.nightShift,
      daysTa: editTa
        ? editData.daysTa
        : parseInt(editData.afternoonShift) + parseInt(editData.nightShift),
      transportAllowance: editData.transportAllowance,
      totalAllowance: editData.totalAllowance,
    };

    const tempData = [...sortData];
    const index = sortData.findIndex((e) => e.id === rowId);
    tempData[index] = editedData;
    setEditTa(false);
    setRowId(null);
    setSortData(tempData);
  };

  const handleFieldChange = (event) => {
    console.log("inside handle form change click");

    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editData };

    if (fieldName === "daysTa") {
      setEditTa(true);
    }

    newFormData[fieldName] = fieldValue;
    console.log(fieldValue, fieldName);

    setEditData(newFormData);
  };

  return (
    <div>
      <div className={classes.txt}>Allowance DashBoard</div>
      <div className="container">
        <div className={classes.row}>
          {" "}
          <span>
            <label className={classes.lbl}>Project</label>
            <div>
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
          </span>
          <span className={classes.pad}>
            <label className={classes.lbl}>Period</label>
            <div>
              <input disabled></input>
            </div>
          </span>
        </div>
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
      <br />
      <div className={classes.mar}>
        <div>
          <form>
            <table className="table  table-hover table-striped">
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
                      <AiFillCaretUp />
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
                      <AiFillCaretUp />
                    )}
                  </th>
                  <th> Project Hours </th>
                  <th> Holiday/ Leaves Hours </th>
                  <th> AfternoonShift</th>
                  <th> Night Shift </th>
                  <th> Days eligible for Ta </th>
                  <th> Transport Allowance </th>
                  <th> Total Allowance </th>
                  <th></th>
                </tr>
              </thead>
              {sortData.map((element, key) => (
                <Fragment>
                  {rowId === element.id ? (
                    <tbody>
                      <EditableRow
                        data={editData}
                        handleSaveClick={handleSaveClick}
                        handleFieldChange={handleFieldChange}
                      ></EditableRow>
                    </tbody>
                  ) : (
                    <tbody>
                      <ReadOnlyRow
                        data={element}
                        handleEditClick={handleEditClick}
                      ></ReadOnlyRow>
                    </tbody>
                  )}
                </Fragment>
              ))}
            </table>
          </form>
        </div>
        <CSVLink {...csvReport}>
          <button className={classes.addButton}>Approve and Download</button>
        </CSVLink>
      </div>
    </div>
  );
};

export default DashBoard;
