import React, { useContext, useState, useEffect, useRef } from "react";
import {doc,updateDoc,getDoc,collection,onSnapshot,deleteDoc,serverTimestamp,addDoc,} from "firebase/firestore";
import { AuthContext } from "../Firebase/AuthProvider";
import { db } from "../Firebase/Firebase";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { UserCheck, UserCog, Bell, Trash2 } from "lucide-react";

const Dashboard = () => {
  const { user, UpdateUser } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [saving, setSaving] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [currentView, setCurrentView] = useState("profile");
  const prevRoleRef = useRef("");


  useEffect(() => {
    if (!user) return;

    const fetchUserRole = async () => {
      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data();
        setRole(data.role || "user");
        prevRoleRef.current = data.role || "user";
      }
    };

    fetchUserRole();
    setName(user.displayName || user.name || "");
  }, [user]);


  useEffect(() => {
    if (!user?.uid) return;

    const q = collection(db, "notifications", user.uid, "userNotifications");
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .sort(
          (a, b) => b.createdAt?.toMillis() - a.createdAt?.toMillis()
        );
      setNotifications(list);
    });

    return () => unsubscribe();
  }, [user]);

  // role promotion check
  useEffect(() => {
    const interval = setInterval(async () => {
      if (!user) return;
      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data();
        setRole(data.role || "user");

        if (prevRoleRef.current !== "employee" && data.role === "employee") {
          toast.success("You have been promoted to Employee!");
          prevRoleRef.current = "employee";

          await addDoc(
            collection(db, "notifications", user.uid, "userNotifications"),
            {
              message: "You have been promoted to Employee!",
              type: "role",
              createdAt: serverTimestamp(),
            }
          );
        } else {
          prevRoleRef.current = data.role || "user";
        }
      }
    }, 2500);

    return () => clearInterval(interval);
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await UpdateUser({ displayName: name });
      const ref = doc(db, "users", user.uid);
      await updateDoc(ref, { name });
      toast.success("Name updated successfully!");
    } catch (err) {
      toast.error("Failed to update name");
    }
    setSaving(false);
  };

  const roleBadge = (role) => {
    const styles = {
      admin: "bg-blue-100 text-blue-600",
      employee: "bg-green-100 text-green-600",
      user: "bg-gray-200 text-gray-700",
    };
    const icons = {
      admin: <UserCog size={16} className="inline mr-1" />,
      employee: <UserCheck size={16} className="inline mr-1" />,
      user: null,
    };
    return (
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className={`px-3 py-1 rounded-full text-sm font-semibold ${
          styles[role] || styles.user}`}>{icons[role]}{role.toUpperCase()}
      </motion.span>
    );
  };

  const deleteNotification = async (id) => {
    try {
      await deleteDoc(
        doc(db, "notifications", user.uid, "userNotifications", id)
      );
      toast.success("Notification deleted!");
    } catch (err) {
      toast.error("Failed to delete notification");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 -mb-12 px-6 md:px-6 lg:px-0">
      {/* Sidebar */}
      <div className="hidden lg:flex w-64 bg-white shadow-sm flex-col">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-blue-600">Dashboard</h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setCurrentView("profile")}
            className={`flex items-center gap-2 p-2 w-full text-left rounded ${
              currentView === "profile" ? "bg-blue-50 font-semibold" : "hover:bg-blue-50 transition"}`}>
            <UserCheck size={18} /> Profile
          </button>
          <button
            onClick={() => setCurrentView("notifications")}
            className={`flex items-center gap-2 p-2 w-full text-left rounded ${
              currentView === "notifications" ? "bg-blue-50 font-semibold" : "hover:bg-blue-50 transition"}`}>
            <Bell size={18} /> Notifications ({notifications.length})
          </button>
        </nav>
      </div>

      {/* main content */}
      <div className="flex-1 p-4 lg:p-8 space-y-8">
        {/* mobile tabs */}
        <div className="lg:hidden fixed top-16 left-0 right-0 bg-white shadow z-10 flex justify-around">
          <button
            onClick={() => setCurrentView("profile")}
            className={`flex-1 py-3 text-center font-semibold ${
              currentView === "profile" ? "text-blue-600 border-b-2 border-blue-600": "text-gray-600"}`}>Profile</button>
          <button
            onClick={() => setCurrentView("notifications")}
            className={`flex-1 py-3 text-center font-semibold ${
              currentView === "notifications" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"}`}>
            Notifications ({notifications.length})</button>
        </div>

        <div className="lg:mt-0 mt-20"></div>

        {/* profile */}
        {currentView === "profile" && (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-3xl font-bold text-gray-800">Welcome, {user?.displayName || user?.name}</h2>
              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-bold text-white">
                {name.charAt(0).toUpperCase()}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="bg-white p-6 rounded-2xl shadow flex flex-col items-center">
                <p className="text-gray-500">Role</p>
                <div className="mt-2">{roleBadge(role)}</div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                className="bg-white p-6 rounded-2xl shadow flex flex-col items-center">
                <p className="text-gray-500">Name</p>
                <p className="mt-2 font-bold text-xl">{name}</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                className="bg-white p-6 rounded-2xl shadow flex flex-col items-center">
                <p className="text-gray-500">Email</p>
                <p className="mt-2 font-bold text-xl">{user?.email}</p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-2xl shadow max-w-lg mx-auto mt-6">
              <h3 className="text-xl font-bold mb-4">Update Display Name</h3>
              <form onSubmit={handleUpdate} className="space-y-4">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 border-2 border-blue-500 rounded-xl focus:ring-2 focus:ring-blue-300 outline-none"
                  required/>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  disabled={saving}
                  className="w-full bg-linear-to-r from-blue-500 to-indigo-600  hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-shadow shadow">
                  {saving ? "Saving..." : "Update Name"}
                </motion.button>
              </form>
            </motion.div>
          </>
        )}

        {/* notifications */}
        {currentView === "notifications" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-2xl shadow max-w-3xl mx-auto">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Bell /> My Notifications
            </h3>
            {notifications.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No notifications yet.</p>) : (
              <div className="space-y-3">
                {notifications.map((note) => (
                  <motion.div
                    key={note.id}
                    whileHover={{ scale: 1.02 }}
                    className="flex justify-between items-center p-4 bg-gray-50 rounded-xl shadow-sm">
                    <div>
                      <p className="text-gray-700">{note.message}</p>
                      <span className="text-xs text-gray-400">
                        {note.createdAt?.toDate().toLocaleString()}
                      </span>
                    </div>
                    <button
                      onClick={() => deleteNotification(note.id)}
                      className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition">
                      <Trash2 size={16} />
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
