import { motion } from "framer-motion";
import { Lock, Mail, Loader2, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { loginUser } from "@/store/auth-slice";

function AuthLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const result = await dispatch(loginUser(formData));
      if (result?.payload?.success) {
        toast({
          title: "Access granted",
          description: "Welcome to your dashboard",
          className: "bg-gradient-to-r from-emerald-600 to-teal-500 text-white border-0"
        });
      } else {
        toast({
          title: "Access denied",
          description: result?.payload?.message || "Invalid credentials",
          className: "bg-gradient-to-r from-rose-600 to-pink-500 text-white border-0"
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full"
    >
      <motion.div
        whileHover={{ scale: 1.005 }}
        whileTap={{ scale: 0.995 }}
        className="bg-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-700/50 shadow-2xl overflow-hidden"
        style={{
          boxShadow: "0 0 30px rgba(167, 171, 192, 0.99)"
        }}
      >
        <div className="p-8">
          <div className="text-center mb-8">
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center mb-4"
            >
              <div className="">
                <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                </svg>
              </div>
            </motion.div>
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-2">
              Login
            </h2>
            <p className="text-gray-400 font-medium">Enter your credentials to continue</p>
          </div>

          <form className="space-y-6" onSubmit={onSubmit}>
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-500" />
                </div>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="your@email.com"
                  className="pl-10 h-12 w-full rounded-lg bg-gray-700/50 border-gray-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 text-white placeholder-gray-400 transition-all duration-200"
                />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-500" />
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  placeholder="••••••••"
                  className="pl-10 h-12 w-full rounded-lg bg-gray-700/50 border-gray-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 text-white placeholder-gray-400 transition-all duration-200"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-lg text-white font-medium text-sm shadow-lg hover:shadow-indigo-500/20 transition-all duration-300 flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  <>
                    Submit <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </motion.div>
          </form>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 text-center"
          >
            <p className="text-sm text-gray-500">
              New user?{" "}
              <Link
                to="/auth/register"
                className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 hover:from-indigo-300 hover:to-purple-300 transition-all duration-200"
              >
                Create account
              </Link>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default AuthLogin;