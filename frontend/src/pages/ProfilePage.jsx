import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useUpdateUserMutation } from "../features/user/userSlice";
import { setCredentials } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const ProfilePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    setName(userInfo?.name);
    setEmail(userInfo?.email);
  }, [userInfo?.setName, userInfo?.setEmail, userInfo?.name, userInfo?.email]);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    } else {
      try {
        const res = await updateUser({
          _id: userInfo?._id,
          name,
          email,
          password,
        });
        dispatch(setCredentials({ ...res }));
        toast.success("Profile updated successfully");
        navigate("/profile");
      } catch (err) {
        toast.error(err?.data?.message || err?.error);
      }
    }
  };

  return (
    <div className="container mx-auto p-6 sm:p-10">
  <h1 className="text-3xl font-bold mb-6 text-center">Update Profile</h1>
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
      Update
    </button>
  </form>
</div>

  );
};

export default ProfilePage;
