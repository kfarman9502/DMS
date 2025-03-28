import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Welcome to Alert360 🚀</h1>
      <p>Your all-in-one disaster management platform.</p>

      {/* Navigation Links */}
      <nav>
        <Link to="/login" style={{ margin: "10px" }}>Login</Link>
        <Link to="/signup" style={{ margin: "10px" }}>Signup</Link>
      </nav>
    </div>
  );
}
