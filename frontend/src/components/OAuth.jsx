import { FaGoogle } from "react-icons/fa";

const OAuth = () => {
  return (
    <button
      className="flex-1 p-3 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500
    text-white font-semibold rounded shadow-lg hover:shadow-xl transition duration-200 uppercase
    flex items-center justify-center gap-2
    "
    >
      <span>sign in with google</span> <FaGoogle size={25} />
    </button>
  );
};

export default OAuth;
