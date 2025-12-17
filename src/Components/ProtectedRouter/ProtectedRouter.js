import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
const ProtectedRouter = ({ setSnackbar, snackbar }) => {
  const user = localStorage.getItem("user");

  return user ? (
    <>
      <Navbar setSnackbar={setSnackbar} snackbar={snackbar} />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRouter;
