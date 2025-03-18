import { Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <AlertCircle size={50} className="text-red-300 mb-7" />
      <h1 className="text-4xl font-bold text-red-300 mb-4">
        Oops! Something went wrong.
      </h1>
      <p className="text-lg text-gray-400 mb-6  max-w-2xl text-center">
        Please ensure you've minted our membership NFT and completed the
        onboarding process correctly.
      </p>
      <Link
        to="/"
        className="px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition duration-300"
      >
        Go back to Home
      </Link>
    </div>
  );
};

export default Error;
