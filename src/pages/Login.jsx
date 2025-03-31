import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService"; // ✅ Import AuthService

const Login = () => {
  const navigate = useNavigate();

  // State for email, password, and error handling
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Handle Login Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // ✅ Call AuthService to login
    const response = await AuthService.login(email, password);

    if (response.error) {
      setError(response.error); // ✅ Show error if not admin
    } else {
      alert("Login Successful!");
      navigate("/"); // ✅ Redirect to dashboard after login
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-base">
      <div className="w-full max-w-md bg-base-300 p-8 shadow-lg rounded-xl">
        <h2 className="text-2xl font-bold text-center">Admin Login</h2>

        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

        <form className="mt-6" onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Field */}
          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button className="btn btn-primary w-full mt-6" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
