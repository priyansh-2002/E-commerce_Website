import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";

function AuthLayout() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Glowing background elements */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 ] opacity-20 bg-cover bg-center"></div>
        
        {/* Animated gradient circles */}
        <motion.div 
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-gradient-to-r from-purple-600/20 to-blue-500/20 blur-xl"
        />
        
        <motion.div 
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-gradient-to-r from-emerald-500/20 to-cyan-400/20 blur-xl"
        />
      </div>

      {/* Main content container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full h-screen overflow-y-auto py-12 px-4 flex items-center justify-center"
      >
        <div className="max-w-md w-full">
          <Outlet />
        </div>
      </motion.div>
    </div>
  );
}

export default AuthLayout;