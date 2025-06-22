import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function FinalPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { action = "return", productCategory = "Other" } = location.state || {};

  const isClothing = productCategory.toLowerCase() === "clothing";

  const message =
    action === "replace" && isClothing
      ? "Your replacement request for the clothing item has been submitted successfully."
      : "Your return has been successfully processed.";

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="h-[calc(100vh-100px)] flex items-center justify-center bg-gray-100 px-4 font-[Poppins]">
      <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 w-full max-w-md text-center animate-fade-in">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-16 h-16 text-green-500 mx-auto mb-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
        <h1 className="text-3xl font-semibold text-gray-800 mb-2">
          Thank You!
        </h1>
        <p className="text-lg text-gray-600 mb-6">{message}</p>
        <button
          onClick={handleGoHome}
          className="bg-purple-500 hover:bg-purple-600 text-white font-medium py-3 px-6 rounded-full shadow-md transition-all duration-300 hover:shadow-lg"
        >
          Back to Home
        </button>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeInUp 0.8s ease forwards;
        }
      `}</style>
    </div>
  );
}
