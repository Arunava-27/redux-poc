import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="py-5">
      <div className="container mx-auto flex justify-center">
        <div className="p-5 flex flex-col items-center bg-gray-200 w-3/4">
          <h1 className="text-center mb-4 text-3xl font-bold">
            Proof of Concept App
          </h1>
          <p className="text-center mb-4">
            This is a POC for using REDUX authentication that stores a JWT in an
            HTTP-Only cookie also uses OAuth. It uses Redux Toolkit and the
            Tailwind CSS library. Login or Register to view the POC
            docoumentation.
          </p>
          <div className="flex">
            <Link
              to="/login"
              className="bg-blue-500 text-white py-2 px-4 rounded mr-3"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="bg-gray-500 text-white py-2 px-4 rounded"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
