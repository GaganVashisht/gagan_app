import React from "react";

const ReadOnlyRow = (props) => {
  return (
    <tr>
      <td>{props.data.name}</td>
      <td>{props.data.sapId}</td>
      <td>{props.data.projectHours}</td>
      <td>{props.data.holiday}</td>
      <td>{props.data.afternoonShift}</td>
      <td>{props.data.nightShift}</td>
      <td>{props.data.daysTa}</td>
      <td>{props.data.transportAllowance}</td>
      <td>{props.data.totalAllowance}</td>

      <td>
        <button
          type="button"
          className="btn btn-info"
          onClick={(event) => props.handleEditClick(event, props.data)}
        >
          Edit
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
