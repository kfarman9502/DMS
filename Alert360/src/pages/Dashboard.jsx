import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles.css"; 

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Access Denied. Please log in.");
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
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Welcome to Your Dashboard</h2>
      {userData ? (
        <div>
          <p><strong>Role:</strong> {userData.userType}</p>
          <button onClick={() => { localStorage.removeItem("token"); navigate("/login"); }}>Logout</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
