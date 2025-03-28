import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userType = localStorage.getItem("userType");

    if (!token || userType !== "Admin") {
      alert("Access Denied. Admins only.");
      navigate("/login");
      return;
    }

    axios
      .get("http://localhost:5000/dashboard", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setUserData(res.data))
      .catch((err) => {
        console.error(err);
        alert("Session expired, please log in again.");
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [navigate]);

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>
      {userData ? (
        <>
          <p><strong>Role:</strong> {userData.userType}</p>
          <button onClick={() => { localStorage.removeItem("token"); navigate("/login"); }}>Logout</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default AdminDashboard;
