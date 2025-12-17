import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { MdOutlineLogout } from "react-icons/md";
import SnackbarPopup from "../utils/Snackbar";

const Navbar = ({ setSnackbar, snackbar }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user");
    setSnackbar({
      open: true,
      message: "Logout successfully",
      severity: "error",
    });
    navigate("/login");
  };
  const username = JSON.parse(localStorage.getItem("user"));
  console.log(username, "user");
  return (
    <div className="navbar-container">
      <div className="nav-part-1">
        <h3>Loan Management Dashboard</h3>
        <p>
          Welcome back, <span className="span-name-text">{username.name}</span>
        </p>
      </div>
      <div className="nav-part-2" onClick={handleLogout}>
        <MdOutlineLogout style={{ fontSize: "1.2rem" }} />
        Logout
      </div>
      <SnackbarPopup
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        setSnackbar={setSnackbar}
      />
    </div>
  );
};

export default Navbar;
