import { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    userType: "User", // Default role
    experienceLevel: "New",
    skills: "",
    emergencyContact: "",
    bloodGroup: "O+", // Default blood group
    specialNeeds: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data before submitting
    if (!formData.name || !formData.email || !formData.phone || !formData.address || !formData.skills || !formData.emergencyContact || !formData.password) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/signup", formData);
      alert(res.data.message);
    } catch (error) {
      console.error(error);
      alert("Signup failed: " + error.response?.data?.message || "Internal error");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Signup for Disaster Management</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "300px",
          margin: "auto",
        }}
      >
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
        />

        <label>User Type:</label>
        <select
          name="userType"
          value={formData.userType}
          onChange={handleChange}
        >
          <option value="User">User</option>
          <option value="Volunteer">Volunteer</option>
          <option value="Rescue Team">Rescue Team</option>
          <option value="Admin">Admin</option>
          <option value="Affected Person">Affected Person</option>
        </select>

        <label>Experience Level:</label>
        <select
          name="experienceLevel"
          value={formData.experienceLevel}
          onChange={handleChange}
        >
          <option value="New">New</option>
          <option value="Trained">Trained</option>
          <option value="Expert">Expert</option>
        </select>

        <input
          type="text"
          name="skills"
          placeholder="Skills (Medical, Engineering, Logistics)"
          value={formData.skills}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="emergencyContact"
          placeholder="Emergency Contact Person"
          value={formData.emergencyContact}
          onChange={handleChange}
          required
        />

        <label>Blood Group:</label>
        <select
          name="bloodGroup"
          value={formData.bloodGroup}
          onChange={handleChange}
        >
          <option value="O+">O+</option>
          <option value="O-">O-</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
        </select>

        <input
          type="text"
          name="specialNeeds"
          placeholder="Special Needs (Medical, Disabilities)"
          value={formData.specialNeeds}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
