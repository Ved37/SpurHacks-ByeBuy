import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function SecondPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { returnId, postalCode, status } = location.state || {};

  if (!returnId || !postalCode) {
    navigate("/");
    return null;
  }

  return (
    <div className="flex items-center justify-center h-[calc(100vh-100px)] bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-center text-gray-800 mb-6">
          {status === "eligible" ? "Return Found ✅" : "Return Not Eligible ❌"}
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-4">
          <strong>Return ID:</strong> {returnId}
        </p>
        <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-4">
          <strong>Postal Code:</strong> {postalCode}
        </p>
        <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-6">
          Next steps will be here...
        </p>

        <button
          className="w-full bg-gray-300 hover:bg-gray-400 text-white font-medium py-3 rounded-md transition duration-200"
          onClick={() => navigate(-1)} // Goes back to previous page
        >
          Back
        </button>
      </div>
    </div>
  );
}
