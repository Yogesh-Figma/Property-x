import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

const AttendancePOP = ({ msg, type }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => setVisible(false), 3000); // Auto-close after 3s
    return () => clearTimeout(timer);
  }, []);

  const bgColor = type === "success" ? "bg-green-500" : "bg-red-500";

  return (
    <motion.div
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: visible ? "0%" : "100%", opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className={`fixed top-5 right-5 ${bgColor} text-white px-6 py-3 rounded-2xl shadow-xl flex items-center gap-3`}
    >
      <p className="text-lg font-medium">{msg}</p>
      <button onClick={() => setVisible(false)} className="text-white hover:text-gray-200">
        <X className="w-5 h-5" />
      </button>
    </motion.div>
  );
};

export default AttendancePOP;
