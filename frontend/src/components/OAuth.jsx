import { useEffect } from "react";
import { FaGoogle } from "react-icons/fa";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import firebaseApp from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { useGoogleLoginOrRegisterMutation } from "../features/user/userSlice";
import { setCredentials } from "../features/auth/authSlice";

const OAuth = () => {
  const dispatch = useDispatch();

  const page = window.location.pathname === "/register" ? "register" : "login";

  const [googleLoginOrRegister] = useGoogleLoginOrRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      window.location.href = "/";
    }
  }, [userInfo]);

  const googleLoginHandler = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(firebaseApp);

      const res = await signInWithPopup(auth, provider);

      const { user } = res;

      console.log({
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        password: user.uid,
      });

      const { data } = await googleLoginOrRegister({
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        password: user.uid,
      });

      dispatch(setCredentials(data));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button
      type="button"
      onClick={googleLoginHandler}
      className="flex-1 p-3 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500
    text-white font-semibold rounded shadow-lg hover:shadow-xl transition duration-200 uppercase
    flex items-center justify-center gap-2
    "
    >
      <span>
        {page === "register" ? "Sign Up with google" : "Sign In with google"}
      </span>{" "}
      <FaGoogle size={25} />
    </button>
  );
};

export default OAuth;
