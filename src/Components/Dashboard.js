import classes from "./Dashboard.module.css";

const DashBoard = () => {
  // const userContext = useContext(UserContext);

  //   const [portalOpened, openPortal] = useState(false);
  const data = [
    {
      name: "Gagan",
      sapId: "fad",
      projectHours: "123",
      holiday: "12",
      afternoonShift: "12",
      nightShift: "0",
      daysTa: "0",
      transportAllowance: "0",
      totalAllowance: "dfa",
    },
    {
      name: "Gagan",
      sapId: "fad",
      projectHours: "123",
      holiday: "12",
      afternoonShift: "12",
      nightShift: "0",
      daysTa: "0",
      transportAllowance: "0",
      totalAllowance: "dfa",
    },
    {
      name: "Gagan",
      sapId: "fad",
      projectHours: "123",
      holiday: "12",
      afternoonShift: "12",
      nightShift: "0",
      daysTa: "0",
      transportAllowance: "0",
      totalAllowance: "dfa",
    },
  ];
  const arr = [];

  // const data = userContext.users;
  const onSubmit = () => {
    // download csv
  };
  return (
    <div className={classes.mar}>
      <div className={classes.txt}>Allowance DashBoard</div>

      <div className={"table  table-responsive "}>
        <table className="table table-light  ">
          <tr className="table-info">
            <th> Name </th>
            <th> SAP Id </th>
            <th> Project Hours </th>
            <th> Holiday/ leaves hours </th>
            <th> AfternoonShift</th>
            <th> Night Shift </th>
            <th> Days eligible for Ta </th>
            <th> Transport Allowance </th>
            <th> Total Allowance </th>
            <th></th>
          </tr>
          {data.map((element, key) => (
            <tr className="table-success">
              <td> {element.name} </td>
              <td> {element.sapId} </td>
              <td> {element.projectHours}</td>
              <td> {element.holiday} </td>
              <td> {parseInt(parseInt(element.projectHours) / 8)}</td>
              <td contentEditable="true"> {element.nightShift}</td>
              <td>
                {" "}
                {parseInt(element.projectHours) / 8 +
                  parseInt(element.nightShift)}
              </td>
              <td> {element.transportAllowance}</td>
              <td> {element.totalAllowance}</td>
              {
                <td>
                  <button
                    onClick={() => {
                      // onConfirm(element);
                    }}
                    className={classes.confirmButton}
                  >
                    Edit
                  </button>
                </td>
              }
            </tr>
          ))}
        </table>
      </div>

      <button className={classes.addButton} onClick={onSubmit}>
        Add
      </button>
    </div>
  );
};
export default DashBoard;
