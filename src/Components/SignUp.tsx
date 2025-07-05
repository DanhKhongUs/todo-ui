import { useState, FormEvent, JSX } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/auth/AuthContext";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SignUp(): JSX.Element {
  const { actions } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Mật khẩu không khớp!");
      return;
    }

    setIsLoading(true);
    const result = await actions.signup({
      name: username,
      email,
      password,
      confirmPassword,
    });
    setIsLoading(false);

    if (typeof result === "string") {
      return;
    }

    navigate("/signin");

    // Reset form
    setEmail("");
    setUsername("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-300 px-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-[#0f2027] mb-6">
          Sign Up
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-gray-700 font-medium">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#02afae]"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700 font-medium">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#02afae]"
              required
            />
          </div>

          <div className="relative">
            <label className="block mb-1 text-gray-700 font-medium">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#02afae]"
              required
            />
            {password.length > 0 && (
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-12 transform -translate-y-1/2 cursor-pointer text-gray-500"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <FontAwesomeIcon icon={faEye} />
                ) : (
                  <FontAwesomeIcon icon={faEyeSlash} />
                )}
              </span>
            )}
          </div>

          <div className="relative">
            <label className="block mb-1 text-gray-700 font-medium">
              Confirm Password
            </label>
            <input
              type={showPassword ? "type" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your password"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#02afae]"
              required
            />
            {confirmPassword.length > 0 && (
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-12 transform -translate-y-1/2 cursor-pointer text-gray-500"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <FontAwesomeIcon icon={faEye} />
                ) : (
                  <FontAwesomeIcon icon={faEyeSlash} />
                )}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-gray-800 text-white font-semibold rounded hover:bg-gray-700 transition duration-300 cursor-pointer"
          >
            {isLoading ? "Đang xử lý..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/signin" className="text-[#02afae] hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </section>
  );
}

export default SignUp;
