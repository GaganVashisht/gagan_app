import React from "react";
import classes from "./EditableRow.module.css";
const EditableRow = ({ data, handleSaveClick, handleFieldChange }) => {
  const inputSize = 5;
  return (
    <tr>
      <td>{data.name}</td>
      <td>{data.sapId}</td>
      <td>{data.projectHours}</td>
      <td>{data.holiday}</td>

      {/* <td>{data.afternoonShift}</td>
      <td>{data.nightShift}</td>
      <td>{data.daysTa}</td> */}
      <td>
        <span>
          <input
            className={classes.input}
            // style="font-size: 10pt;"
            //  type="email"
            required="required"
            //  placeholder="Enter an email..."
            name="afternoonShift"
            id={"afternoonShift"}
            type="text"
            value={data.afternoonShift}
            onChange={handleFieldChange}
            size={inputSize}
          ></input>
        </span>
      </td>
      <td>
        <input
          id={"nightShift"}
          name={"nightShift"}
          type="text"
          value={data.nightShift}
          onChange={handleFieldChange}
          size={inputSize}
        ></input>
      </td>
      <td>
        {" "}
        <input
          id={"daysTa"}
          name={"daysTa"}
          type="text"
          value={data.daysTa}
          onChange={handleFieldChange}
          size={inputSize}
        ></input>
      </td>

      <td>{data.transportAllowance}</td>
      <td>{data.totalAllowance}</td>
      <td>
        <button
          className="btn btn-info"
          type="submit"
          onClick={handleSaveClick}
        >
          Save
        </button>
      </td>
    </tr>
  );
};

export default EditableRow;
