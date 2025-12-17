import "./Dashboard.css";
import { mockdata } from "../../Data/Mockdata";
import { CiSearch } from "react-icons/ci";
import { CiFilter } from "react-icons/ci";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { MdOutlineCancel } from "react-icons/md";
import { MdOutlinePending } from "react-icons/md";

const Dashboard = ({setSnackbar, snackbar}) => {
  const [status, setStatus] = useState("All Status");
  const [loanType, setLoanType] = useState("All Types");
  const [filterData, setFilterData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const loanstatus = ["Total loans", "Approved", "Pending", "Rejected"];
  const statusData = [
    { id: 1, status: "All Status" },
    { id: 2, status: "Approved" },
    { id: 3, status: "Pending" },
    { id: 4, status: "Rejected" },
  ];

  const loanStatus = [
    { id: 1, loanType: "All Types" },
    { id: 2, loanType: "Home Loan" },
    { id: 3, loanType: "Personal Loan" },
    { id: 4, loanType: "Education Loan" },
    { id: 5, loanType: "Business Loan" },
    { id: 6, loanType: "Vehicle Loan" },
    { id: 7, loanType: "Gold Loan" },
  ];

  const handleStatusChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value, "status");
    setStatus(value);
  };

  console.log(status, "status");

  const handleLoanTypeChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value, "loan type");
    setLoanType(value);
  };

  useEffect(() => {
    let filterData = mockdata;

    if (status !== "All Status") {
      filterData = filterData?.filter((item) => item?.status === status);
    }

    if (loanType !== "All Types") {
      filterData = filterData?.filter((item) => item?.loanType === loanType);
    }

    if (searchQuery?.length > 0) {
      filterData = filterData?.filter((item) =>
        item?.customerName?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
    }

    setFilterData(filterData);
  }, [status, loanType, searchQuery]);

  const buttonStatus = (btnStatus) => {
    const bgColors = ["#d1fae5", "#fef3c7", "#fee2e2"];
    const colors = ["#065f46", "#92400e", "#991b1b"];
    const icons = [<FaCheck />, <MdOutlinePending />, <MdOutlineCancel />];

    const index =
      btnStatus === "Approved" ? 0 : btnStatus === "Pending" ? 1 : 2;

    const icon = icons[index];

    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          background: bgColors[index],
          color: colors[index],
          padding: "1rem",
          borderRadius: "8px",
          width: "120px",
        }}
      >
        {icon} {btnStatus}
      </div>
    );
  };

  return (
    <div className="dashboard-container">
      <div className="status-container">
        {loanstatus?.map((eachItem, index) => {
          const count =
            eachItem === "Total loans"
              ? mockdata?.length
              : mockdata?.filter((item) => item?.status === eachItem).length;

          const borderColors = ["#ff523b", "#2e7d32", "#ffca28", "#3936e1ff"];

          return (
            <div
              className="each-cart-item"
              style={{
                borderLeft: `5px solid ${borderColors[index]}`,
              }}
            >
              {eachItem}
              <p>{`${count}`}</p>
            </div>
          );
        })}
      </div>
      <div className="row-container">
        <div className="search-container">
          <CiSearch />
          <input
            type="search"
            placeholder="Search"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <CiFilter style={{ fontSize: "1.5rem" }} className="filter-icon" />
        <div className="select-container">
          <select onChange={handleStatusChange} name="status">
            {statusData?.map((eachStatus) => (
              <option key={eachStatus?.id} value={eachStatus?.status}>
                {eachStatus?.status}
              </option>
            ))}
          </select>
        </div>

        <div className="select-container">
          <select onChange={handleLoanTypeChange}>
            {loanStatus?.map((eachLoan) => (
              <option key={eachLoan.id} value={eachLoan.loanType}>
                {eachLoan?.loanType}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Customer name</th>
              <th>Loan id</th>
              <th>Loan type</th>
              <th>Amount</th>
              <th>city</th>
              <th>Applied date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filterData?.length > 0 ? (
              filterData?.map((eachItem) => {
                return (
                  <tr>
                    <td style={{ fontWeight: "bold" }}>
                      {eachItem.customerName}
                    </td>
                    <td>{eachItem.loanId}</td>
                    <td>{eachItem.loanType}</td>
                    <td>{eachItem.amount}</td>
                    <td>{eachItem.city}</td>
                    <td>{eachItem.applicationDate}</td>
                    <td>{buttonStatus(eachItem.status)}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={6}
                  style={{ textAlign: "center", padding: "2rem" }}
                >
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
