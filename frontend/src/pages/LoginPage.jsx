import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../features/user/userSlice";
import { setCredentials } from "../features/auth/authSlice";
import OAuth from "../components/OAuth";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const [login, { isLoading }] = useLoginMutation();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        const res = await login({ email: values.email, password: values.password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate("/");
      } catch (err) {
        toast.error(err?.data?.message || err?.error);
      }
    },
  });

  return (
    <div className="container mx-auto p-6 sm:p-10 border-blue-500 border-2 rounded-xl bg-gradient-to-tl from-green-500 via-yellow-500 to-red-500">
      <h1 className="text-3xl font-bold mb-6 text-center text-white underline">
        Sign In
      </h1>
      <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-100"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={`mt-1 p-3 border-2 w-full rounded hover:border-blue-500
              focus:border-blue-500 focus:outline-none ${
                formik.touched.email && formik.errors.email ? "border-red-500" : ""
              }`}
            placeholder="Enter your email address"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500 text-sm">{formik.errors.email}</div>
          )}
        </div>
        <div className="mb-6 relative">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-100"
          >
            Password
          </label>
          <input
            type={formik.values.showPassword ? "text" : "password"}
            id="password"
            name="password"
            className={`mt-1 p-3 border-2 w-full rounded hover:border-blue-500
              focus:border-blue-500 focus:outline-none ${
                formik.touched.password && formik.errors.password ? "border-red-500" : ""
              }`}
            placeholder="Enter your password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <button
            type="button"
            className="absolute top-[66%] right-[0.5rem] transform -translate-y-1/2 bg-blue-500 p-2 rounded text-white"
            onClick={() => formik.setFieldValue("showPassword", !formik.values.showPassword)}
          >
            {formik.values.showPassword ? (
             <svg
             xmlns="http://www.w3.org/2000/svg"
             fill="none"
             viewBox="0 0 24 24"
             strokeWidth={1.5}
             stroke="currentColor"
             className="w-6 h-6"
           >
             <path
               strokeLinecap="round"
               strokeLinejoin="round"
               d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
             />
             <path
               strokeLinecap="round"
               strokeLinejoin="round"
               d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
             />
           </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              </svg>
            )}
          </button>
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500 text-sm">{formik.errors.password}</div>
          )}
        </div>
        {isLoading && <Loader />}
        <button
          type="submit"
          className="uppercase flex justify-center  font-semibold bg-gradient-to-r from-blue-500 via-green-500 to-yellow-500 text-white p-3 rounded w-full"
        >
          <span>Sign In</span>
          <span>
            {/* Your SVG */}
          </span>
        </button>
        <div className="flex w-full mt-5">
          <OAuth />
        </div>
      </form>
      <div className="mt-6 text-center">
        <span className="text-sm">
          New User?{" "}
          <Link
            to="/register"
            className="text-white underline hover:text-blue-500"
          >
            Register
          </Link>
        </span>
      </div>
    </div>
  );
};

export default LoginPage;
