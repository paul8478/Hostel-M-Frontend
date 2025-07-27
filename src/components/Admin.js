import React, { useEffect, useState } from "react";
import adminAxios from "../api/admin_axios";

function Admin() {
  const [admins, setAdmins] = useState([]);
  const [newAdmin, setNewAdmin] = useState({ name: "", email: "", password: "", permission: "VIEW_ONLY" });

  const fetchAdmins = async () => {
    try {
      const res = await adminAxios.get("/");
      setAdmins(res.data);
    } catch (err) {
      console.error("Error fetching admins:", err);
    }
  };

  const createAdmin = async () => {
    try {
      await adminAxios.post("/", newAdmin);
      setNewAdmin({ name: "", email: "", password: "", permission: "VIEW_ONLY" });
      fetchAdmins();
    } catch (err) {
      console.error("Error creating admin:", err);
    }
  };

  const deleteAdmin = async (id) => {
    try {
      await adminAxios.delete(`/${id}`);
      fetchAdmins();
    } catch (err) {
      console.error("Error deleting admin:", err);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  return (
    <div>
      <h2>Admin Management</h2>

      <div>
        <input placeholder="Name" value={newAdmin.name} onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })} />
        <input placeholder="Email" value={newAdmin.email} onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })} />
        <input placeholder="Password" value={newAdmin.password} onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })} />
        <select value={newAdmin.permission} onChange={(e) => setNewAdmin({ ...newAdmin, permission: e.target.value })}>
          <option value="ALL">ALL</option>
          <option value="EDIT_ONLY">EDIT_ONLY</option>
          <option value="VIEW_ONLY">VIEW_ONLY</option>
        </select>
        <button onClick={createAdmin}>Create Admin</button>
      </div>

      <table>
        <thead>
          <tr><th>Name</th><th>Email</th><th>Permission</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin.id}>
              <td>{admin.name}</td>
              <td>{admin.email}</td>
              <td>{admin.permission}</td>
              <td>
                <button onClick={() => deleteAdmin(admin.id)}>Delete</button>
                {/* Optional: Edit button */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;
