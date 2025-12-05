import { useEffect, useState, useMemo } from "react";
import { collection, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../Firebase/Firebase";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Users, ShieldCheck, Briefcase, Trash2, Search } from "lucide-react";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const fetchUsers = async () => {
    const snapshot = await getDocs(collection(db, "users"));
    setUsers(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const changeRole = async (id, newRole) => {
    try {
      await updateDoc(doc(db, "users", id), { role: newRole });
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, role: newRole } : u))
      );
      toast.success(`Role updated to ${newRole}`);
    } catch {
      toast.error("Failed to update role");
    }
  };

  const deleteUser = async (id) => {
    try {
      await deleteDoc(doc(db, "users", id));
      setUsers((prev) => prev.filter((u) => u.id !== id));
      toast.success("User deleted successfully");
    } catch {
      toast.error("Failed to delete user");
    }
  };

  const stats = useMemo(() => {
    const total = users.length;
    const admins = users.filter((u) => u.role === "admin").length;
    const employees = users.filter((u) => u.role === "employee").length;
    return { total, admins, employees };
  }, [users]);

  const filtered = users.filter(
    (u) =>
      (u.name?.toLowerCase().includes(search.toLowerCase()) ||
        u.email?.toLowerCase().includes(search.toLowerCase())) &&
      (roleFilter ? u.role === roleFilter : true)
  );

  const admins = filtered.filter((u) => u.role === "admin");
  const employees = filtered.filter((u) => u.role === "employee");
  const normalUsers = filtered.filter((u) => u.role === "user");

  const totalPages = Math.ceil(normalUsers.length / usersPerPage);
  const currentUsers = normalUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const badgeColors = {
    admin: "bg-blue-100 text-blue-700",
    employee: "bg-green-100 text-green-700",
    user: "bg-gray-200 text-gray-700",
  };

  return (
    <div className="px-6 md:px-6 lg:px-2 max-w-6xl mx-auto mt-12">

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-extrabold text-center mb-12 bg-linear-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">Admin Dashboard
      </motion.h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {[
          { label: "Total Users", value: stats.total, icon: Users, color: "text-blue-600" },
          { label: "Admins", value: stats.admins, icon: ShieldCheck, color: "text-purple-600" },
          { label: "Employees", value: stats.employees, icon: Briefcase, color: "text-green-600" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.03 }}
            className="p-6 bg-white rounded-2xl shadow-lg border flex items-center gap-4">
            <stat.icon size={45} className={stat.color} />
            <div>
              <p className="text-lg font-semibold">{stat.label}</p>
              <p className="text-3xl font-extrabold">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div className="relative w-full md:w-1/2">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email..."
            className="border p-3 pl-10 rounded-xl w-full shadow-sm"
          />
        </div>

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="border p-3 rounded-xl shadow-sm w-full md:w-auto">
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="employee">Employee</option>
          <option value="user">Users</option>
        </select>
      </div>

      {/* Admins */}
      <Section title="Admins" data={admins} badgeColors={badgeColors} changeRole={changeRole} deleteUser={deleteUser} />

      {/* Employees */}
      <Section title="Employees" data={employees} badgeColors={badgeColors} changeRole={changeRole} deleteUser={deleteUser} />

      {/* Users with Pagination */}
      <Section title="Users" data={currentUsers} badgeColors={badgeColors} changeRole={changeRole} deleteUser={deleteUser} />

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.1 }}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 rounded-xl font-semibold shadow ${
              currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
            }`}>{i + 1}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

const Section = ({ title, data, badgeColors, changeRole, deleteUser }) => (
  <div className="mb-12">
    <h2 className="text-2xl font-bold mb-4">{title}</h2>

    <div className="overflow-x-auto rounded-2xl shadow-lg border bg-white">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            {["Name", "Email", "Role", "Actions"].map((h, i) => (
              <th key={i} className="p-4 text-left font-semibold">{h}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((user) => (
            <tr key={user.id} className="border-b hover:bg-gray-50 transition">
              <td className="p-4 font-medium">{user.name}</td>
              <td className="p-4 text-gray-600">{user.email}</td>
              <td className="p-4">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${badgeColors[user.role]}`}>
                  {user.role.toUpperCase()}
                </span>
              </td>
              <td className="p-4 flex flex-wrap gap-2">
                <select
                  value={user.role}
                  onChange={(e) => changeRole(user.id, e.target.value)}
                  className="px-3 py-2 border rounded-lg bg-gray-100">
                  <option value="admin">Admin</option>
                  <option value="employee">Employee</option>
                  <option value="user">User</option>
                </select>
                <button
                  onClick={() => deleteUser(user.id)}
                  className="px-3 py-2 bg-red-600 text-white rounded-lg shadow flex items-center gap-1">
                  <Trash2 size={16} /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default AdminPanel;
