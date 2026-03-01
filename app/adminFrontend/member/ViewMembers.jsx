import axios from "axios";
import { useEffect, useState } from "react";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  /* ================= FETCH USERS ================= */
  const fetchUsers = async () => {
    if (!token) {
      alert("No token found. Please login again.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  /* ================= EDIT ================= */
  const handleEdit = (user) => {
    setEditingUser(user._id);
    setFormData(user);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* ================= UPDATE ================= */
  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/users/${editingUser}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      alert("User updated successfully");
      setEditingUser(null);
      fetchUsers();
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Update failed");
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("User deleted successfully");
      fetchUsers();
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Delete failed");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1 style={{ marginBottom: "20px" }}>Admin - View Members</h1>

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <table border="1" cellPadding="10" width="100%">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Membership</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="5" align="center">
                  No Users Found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id}>
                  <td>
                    {editingUser === user._id ? (
                      <input
                        name="fullName"
                        value={formData.fullName || ""}
                        onChange={handleChange}
                      />
                    ) : (
                      user.fullName
                    )}
                  </td>

                  <td>
                    {editingUser === user._id ? (
                      <input
                        name="email"
                        value={formData.email || ""}
                        onChange={handleChange}
                      />
                    ) : (
                      user.email
                    )}
                  </td>

                  <td>
                    {editingUser === user._id ? (
                      <input
                        name="mobile"
                        value={formData.mobile || ""}
                        onChange={handleChange}
                      />
                    ) : (
                      user.mobile
                    )}
                  </td>

                  <td>{user.membershipPlan}</td>

                  <td>
                    {editingUser === user._id ? (
                      <>
                        <button onClick={handleUpdate}>Save</button>{" "}
                        <button onClick={() => setEditingUser(null)}>
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => handleEdit(user)}>Edit</button>{" "}
                        <button
                          style={{ color: "red" }}
                          onClick={() => handleDelete(user._id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
