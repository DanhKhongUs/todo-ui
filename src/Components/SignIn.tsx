import { useState, FormEvent, JSX } from "react";
import { data, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

function SignIn(): JSX.Element {
  const { actions } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const result = await actions.signin({ email, password });
    setIsLoading(false);

    if (typeof result === "string") {
      return;
    }

    navigate("/todoapp");
  };

  console.log(data);

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-300">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-[#0f2027] mb-6">
          Sign In
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block mb-1 text-gray-700 font-medium"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#00f2fe]"
              required
            />
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="block mb-1 text-gray-700 font-medium"
            >
              Password
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#00f2fe]"
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

          <button
            type="submit"
            className="w-full py-2 bg-gray-800 text-white font-semibold rounded hover:bg-gray-700 transition duration-300 cursor-pointer"
          >
            {isLoading ? "Đang xử lý..." : "Log in"}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-[#049da5] hover:underline">
            Sign Up
          </Link>
        </p>
        <p className="text-center">
          <Link to="/forgot" className="text-[#049da5] hover:underline">
            Forgot password
          </Link>
        </p>
      </div>
    </section>
  );
}

export default SignIn;
