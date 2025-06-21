import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function SecondPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { returnId, postalCode, status, productImage, productName, orderId } =
    location.state || {};

  const [selectedReason, setSelectedReason] = useState("");
  const [otherReason, setOtherReason] = useState("");

  if (!returnId || !postalCode) {
    navigate("/");
    return null;
  }

  const handleReturn = () => {
    const reason = selectedReason === "Other" ? otherReason : selectedReason;
    if (!reason) return alert("Please select a reason to return.");
    navigate("/final", {
      state: {
        returnId,
        postalCode,
        reason,
      },
    });
  };

  return (
    <div className="flex items-center justify-center h-[calc(100vh-100px)] bg-gray-100 px-4 py-10 overflow-x-hidden">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-2xl p-6 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* LEFT: Product Image */}
        <div className="flex justify-center items-center">
          <img
            src={
              productImage ||
              "https://via.placeholder.com/200x200?text=Product+Image"
            }
            alt="Product"
            className="rounded-xl max-w-full h-auto"
          />
        </div>

        {/* CENTER: Order Info */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4 text-center md:text-left">
            {status === "eligible"
              ? "Return Found ✅"
              : "Return Not Eligible ❌"}
          </h2>
          <div className="text-gray-700 space-y-3 text-sm sm:text-base">
            <p>
              <strong>Return ID:</strong> {returnId}
            </p>
            <p>
              <strong>Postal Code:</strong> {postalCode}
            </p>
            <p>
              <strong>Order ID:</strong> {orderId || "ORD12345678"}
            </p>
            <p>
              <strong>Product:</strong> {productName || "Awesome Product"}
            </p>
            <p className="text-gray-500 italic">
              Please verify the product details before proceeding.
            </p>
          </div>
        </div>

        {/* RIGHT: Return Reason */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Reason for Return
          </h3>
          <div className="space-y-2">
            {["Damaged", "Wrong Item", "Not Needed", "Other"].map((reason) => (
              <div
                key={reason}
                onClick={() => setSelectedReason(reason)}
                className={`cursor-pointer border rounded-md px-4 py-2 transition duration-150
          ${
            selectedReason === reason
              ? "bg-blue-100 border-blue-600 text-blue-700 font-medium"
              : "bg-white border-gray-300 text-gray-800 hover:bg-gray-100"
          }`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ")
                    setSelectedReason(reason);
                }}
              >
                {reason}
              </div>
            ))}
          </div>

          {selectedReason === "Other" && (
            <textarea
              placeholder="Please specify..."
              className="w-full border border-gray-800 rounded-md p-2 mt-3 text-sm text-gray-800"
              value={otherReason}
              onChange={(e) => setOtherReason(e.target.value)}
              rows={3}
            />
          )}

          <button
            onClick={handleReturn}
            className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-md transition duration-200"
          >
            Return Item
          </button>
        </div>
      </div>
    </div>
  );
}
