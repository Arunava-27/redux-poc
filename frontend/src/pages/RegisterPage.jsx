import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../features/user/userSlice";
import { setCredentials } from "../features/auth/authSlice";
import OAuth from "../components/OAuth";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await register({ name, email, password });
      dispatch(setCredentials({ ...res }));
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || err?.error);
    }
  };

  return (
    <div className="container mx-auto p-6 sm:p-10">
  <h1 className="text-3xl font-bold mb-6 text-center">Sign Up</h1>
  <form onSubmit={submitHandler} className="max-w-md mx-auto">
    <div className="mb-6">
      <label htmlFor="name" className="block text-sm font-medium text-gray-600">
        Name
      </label>
      <input
        type="name"
        id="name"
        className="mt-1 p-3 border w-full rounded"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
    <div className="mb-6">
      <label htmlFor="email" className="block text-sm font-medium text-gray-600">
        Email Address
      </label>
      <input
        type="email"
        id="email"
        className="mt-1 p-3 border w-full rounded"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>
    <div className="mb-6 relative">
      <label htmlFor="password" className="block text-sm font-medium text-gray-600">
        Password
      </label>
      <input
        type={showPassword ? "text" : "password"}
        id="password"
        className="mt-1 p-3 border w-full rounded"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="button"
        className="absolute top-[66%] right-[0.5rem] transform -translate-y-1/2 bg-gray-300 p-2 rounded"
        onClick={toggleShowPassword}
      >
        {showPassword ? "Hide" : "Show"}
      </button>
    </div>
    <div className="mb-6">
      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600">
        Confirm Password
      </label>
      <input
        type={showPassword ? "text" : "password"}
        id="confirmPassword"
        className="mt-1 p-3 border w-full rounded"
        placeholder="Confirm your password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
    </div>
    {isLoading && <Loader />}
    <button type="submit" className="bg-blue-500 text-white p-3 rounded w-full">
      Sign Up
    </button>
    <OAuth />
  </form>
  <div className="mt-6 text-center">
    <span className="text-sm">Have an Account? <Link to="/login" className="text-blue-500">Login</Link></span>
  </div>
</div>

  );
};

export default RegisterPage;
