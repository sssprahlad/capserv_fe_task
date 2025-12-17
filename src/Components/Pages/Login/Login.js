import "./Login.css";
import { CiMail } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../../Context/AuthContext";
import SnackbarPopup from "../../utils/Snackbar";

const Login = ({ setSnackbar, snackbar }) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [activeForm, setActiveForm] = useState({
    loginForm: true,
    otpForm: false,
  });
  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
  });

  const [otp, setOtp] = useState();
  const [otpNumber] = useState(() => Math.floor(Math.random() * 1000000));

  const loginUserDetails = JSON.parse(localStorage.getItem("user"));

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingUser = user.find(
      (user) =>
        user.email === loginUser.email && user.password === loginUser.password
    );

    if (existingUser) {
      localStorage.setItem("user", JSON.stringify(existingUser));
      setActiveForm({ loginForm: false, otpForm: true });
      setSnackbar({
        open: true,
        message: "Login successfully varify with OTP",
        severity: "success",
      });
      //navigate("/dashboard");
    } else {
      // alert("Invalid email or password");
      setSnackbar({
        open: true,
        message: "Invalid email or password",
        severity: "error",
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginUser({ ...loginUser, [name]: value });
  };

  const loginForm = () => {
    return (
      <form className="signUp-form" onSubmit={handleSubmit}>
        <h2>Login In</h2>
        <p>Enter your email and password to login</p>

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

        <button type="submit" className="signUp-button">
          Login In
        </button>
        <span>
          Don't have an account? <Link to={"/signUp"}>Sign Up</Link>
        </span>
      </form>
    );
  };

  const OtpVerification = () => {
    const handleOtpVerify = (e) => {
      e.preventDefault();

      if (Number(otp) === otpNumber) {
        setSnackbar({
          open: true,
          message: "Login successful",
          severity: "success",
        });
        setTimeout(() => navigate("/dashboard"), 2000);
      } else {
        setSnackbar({
          open: true,
          message: "Invalid OTP",
          severity: "error",
        });
      }
    };

    return (
      <form className="otp-form" onSubmit={handleSubmit}>
        <h2>Loan Management System</h2>
        <p>Enter OTP to verify</p>

        <div className="otp-container">
          <p className="otp-send-number">{`OTP sent to: ${loginUserDetails?.phone}`}</p>
          <p className="otp-text">
            Hint : Use OTP {<span className="otp">{otpNumber}</span>} for{" "}
            {loginUserDetails?.email}
          </p>
        </div>

        <div className="form-group">
          <CiMail className="form-icon" />
          <input
            type="number"
            placeholder="Enter OTP"
            name="otp"
            required
            onChange={(e) => setOtp(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="signUp-button"
          onClick={handleOtpVerify}
        >
          Verify OTP
        </button>
        <button
          className="back-to-login-btn"
          onClick={() => setActiveForm({ loginForm: true, otpForm: false })}
        >
          Back to Login
        </button>
      </form>
    );
  };

  return (
    <div className="signUp-container">
      {activeForm.loginForm ? loginForm() : OtpVerification()}
      <SnackbarPopup
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        setSnackbar={setSnackbar}
      />
    </div>
  );
};

export default Login;
