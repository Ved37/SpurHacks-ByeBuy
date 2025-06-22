import React, { useState } from "react";
import { fakeReturns } from "./data/returns";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [returnId, setReturnId] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (!returnId || !postalCode) {
      alert("Please fill in all fields");
      return;
    }

    const match = fakeReturns.find(
      (entry) =>
        entry.returnId.toLowerCase() === returnId.toLowerCase() &&
        entry.postalCode.replace(/\s+/g, "").toLowerCase() ===
          postalCode.replace(/\s+/g, "").toLowerCase()
    );

    if (!match) {
      alert("Invalid Return ID or Postal Code");
      return;
    }

    // 👇 Inject product category manually
    const productCategories = {
      ab100: "Clothing",
      xy101: "Clothing",
      de102: "Other",
      rt103: "Other",
      qw104: "Other",
      zx105: "Clothing",
      cv106: "Other",
      bn107: "Other",
      mk108: "Clothing",
      lp109: "Other",
      ki110: "Other",
      uj111: "Other",
      hg112: "Other",
      fd113: "Other",
      sa114: "Clothing",
    };
    match.productCategory =
      productCategories[match.returnId.toLowerCase()] || "Other";

    navigate("/next", { state: match });
  }

  return (
    <div className="flex items-center justify-center h-[calc(100vh-100px)] bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-center text-gray-800 mb-6">
          Byebuy Return
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm sm:text-base md:text-lg font-medium text-gray-700">
              Return ID:
            </label>
            <input
              type="text"
              value={returnId}
              onChange={(e) => setReturnId(e.target.value)}
              placeholder="Enter Return ID"
              className="w-full border border-gray-300 rounded-md text-gray-700 p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm sm:text-base md:text-lg font-medium text-gray-700">
              Postal Code:
            </label>
            <input
              type="text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              placeholder="Enter Postal Code"
              className="w-full border border-gray-300 text-gray-700 rounded-md p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-md transition duration-200"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
}
