import { useEffect, useState, useMemo } from "react";
import { collection, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../Firebase/Firebase";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Users, ShieldCheck, Briefcase, Trash2, Search } from "lucide-react";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10; // Show 10 users per page

  const fetchUsers = async () => {
    setLoading(true);
    const snapshot = await getDocs(collection(db, "users"));
    setUsers(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    setLoading(false);
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
    admin: "bg-gradient-to-r from-red-500 to-pink-500 text-white",
    employee: "bg-gradient-to-r from-green-400 to-green-600 text-white",
    user: "bg-gray-200 text-gray-700",
  };

  const sectionTitleColors = {
    admin: "text-red-600",
    employee: "text-green-600",
    user: "text-gray-700",
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const CardSkeleton = () => (
    <div className="p-6 rounded-3xl bg-gray-200 animate-pulse flex gap-5">
      <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
      <div className="flex flex-col gap-2">
        <div className="w-32 h-4 bg-gray-300 rounded"></div>
        <div className="w-20 h-6 bg-gray-300 rounded"></div>
      </div>
    </div>
  );

  const TableSkeleton = () => (
    <div className="overflow-x-auto rounded-3xl shadow-xl border border-gray-100 bg-white animate-pulse">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <th key={i} className="p-4 h-6"></th>
              ))}
          </tr>
        </thead>
        <tbody>
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <tr key={i} className="border-b h-12"></tr>
            ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="px-6 md:px-6 lg:px-2 max-w-6xl mx-auto mt-12">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
      >
        Admin Dashboard
      </motion.h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {loading
          ? [1, 2, 3].map((_, i) => <CardSkeleton key={i} />)
          : [
              { label: "Total Users", value: stats.total, icon: Users, color: "text-blue-600" },
              { label: "Admins", value: stats.admins, icon: ShieldCheck, color: "text-red-500" },
              { label: "Employees", value: stats.employees, icon: Briefcase, color: "text-green-600" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-white rounded-3xl shadow-xl border border-gray-100 flex items-center gap-5 hover:shadow-2xl transition"
              >
                <stat.icon size={50} className={stat.color} />
                <div>
                  <p className="text-md font-medium text-gray-500">{stat.label}</p>
                  <p className="text-3xl font-extrabold text-gray-800">{stat.value}</p>
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
            className="border border-gray-300 p-3 pl-10 rounded-full w-full shadow-md focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
          />
        </div>

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="border border-gray-300 p-3 rounded-full shadow-md w-full md:w-auto focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
        >
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="employee">Employee</option>
          <option value="user">Users</option>
        </select>
      </div>

      {/* Conditional Sections with Animations */}
      <AnimatePresence mode="wait">
        {loading ? (
          <TableSkeleton />
        ) : (
          <>
            {(!roleFilter || roleFilter === "admin") && admins.length > 0 && (
              <motion.div
                key="admins"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.4 }}
              >
                <Section
                  title="Admins"
                  data={admins}
                  badgeColors={badgeColors}
                  titleColor={sectionTitleColors.admin}
                  changeRole={changeRole}
                  deleteUser={deleteUser}
                />
              </motion.div>
            )}

            {(!roleFilter || roleFilter === "employee") && employees.length > 0 && (
              <motion.div
                key="employees"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.4 }}
              >
                <Section
                  title="Employees"
                  data={employees}
                  badgeColors={badgeColors}
                  titleColor={sectionTitleColors.employee}
                  changeRole={changeRole}
                  deleteUser={deleteUser}
                />
              </motion.div>
            )}

            {(!roleFilter || roleFilter === "user") && currentUsers.length > 0 && (
              <motion.div
                key="users"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.4 }}
              >
                <Section
                  title="Users"
                  data={currentUsers}
                  badgeColors={badgeColors}
                  titleColor={sectionTitleColors.user}
                  changeRole={changeRole}
                  deleteUser={deleteUser}
                />
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>

      {/* Pagination */}
      {(!roleFilter || roleFilter === "user") && totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.1 }}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-5 py-2 rounded-full font-semibold shadow-md transition ${
                currentPage === i + 1 ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-800"
              }`}
            >
              {i + 1}
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
};

const Section = ({ title, data, badgeColors, titleColor, changeRole, deleteUser }) => (
  <div className="mb-12">
    <h2 className={`text-2xl font-bold mb-4 ${titleColor}`}>{title}</h2>
    <div className="overflow-x-auto rounded-3xl shadow-xl border border-gray-100 bg-white">
      <table className="w-full text-left">
        <thead className="bg-gray-50">
          <tr>
            {["Name", "Email", "Role", "Actions"].map((h, i) => (
              <th key={i} className="p-4 font-medium text-gray-700">{h}</th>
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
                  className="px-3 py-2 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-indigo-300 transition"
                >
                  <option value="admin">Admin</option>
                  <option value="employee">Employee</option>
                  <option value="user">User</option>
                </select>
                <button
                  onClick={() => deleteUser(user.id)}
                  className="px-3 py-2 bg-red-600 text-white rounded-lg shadow-md flex items-center gap-1 hover:bg-red-700 transition"
                >
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
