import "./SignUp.css";
import { IoIosContact } from "react-icons/io";
import { CiMail } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { UserContext } from "../../Context/AuthContext";
import SnackbarPopup from "../../utils/Snackbar";

const SignUp = ({ setSnackbar, snackbar }) => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [singUpUser, setSignUpUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignUpUser({ ...singUpUser, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setUser((prevUser) => {
      const existingUser = prevUser?.find(
        (user) =>
          user.email.toLowerCase().trim() ===
          singUpUser.email.toLowerCase().trim()
      );

      if (existingUser) {
        setSnackbar({
          open: true,
          message: "User already exists",
          severity: "error",
        });
        return prevUser;
      }

      setSnackbar({
        open: true,
        message: "User registered successfully",
        severity: "success",
      });
      setTimeout(() => {
        navigate("/login");
      }, 500);

      return [...prevUser, singUpUser];
    });
  };
  return (
    <div className="signUp-container">
      <form className="signUp-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <p>Join us today! Fill up the form below.</p>

        <div className="form-group">
          <IoIosContact className="form-icon" />
          <input
            type="text"
            id="name"
            placeholder="Enter Name"
            name="name"
            required
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <CiMail className="form-icon" />
          <input
            type="email"
            id="email"
            placeholder="Enter Email"
            name="email"
            required
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <CiLock className="form-icon" />
          <input
            type="password"
            id="password"
            placeholder="Enter Password"
            name="password"
            required
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <IoCallOutline className="form-icon" />
          <input
            type="tel"
            id="phone"
            placeholder="Enter Phone"
            name="phone"
            required
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <IoLocationOutline className="form-icon" />
          <input
            type="text"
            id="address"
            placeholder="Enter Address"
            name="address"
            required
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="signUp-button">
          Sign Up
        </button>
        <span>
          Already have an account? <Link to={"/login"}>Login</Link>
        </span>
      </form>
      <SnackbarPopup
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        setSnackbar={setSnackbar}
      />
    </div>
  );
};

export default SignUp;
