import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function SecondPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    returnId,
    postalCode,
    status,
    productImage,
    productName,
    orderId,
    productCategory,
  } = location.state || {};

  const isClothing = productCategory?.toLowerCase() === "clothing";

  const [actionType, setActionType] = useState(""); // return or replace
  const [selectedReason, setSelectedReason] = useState("");
  const [otherReason, setOtherReason] = useState("");
  const [replaceReason, setReplaceReason] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  if (!returnId || !postalCode) {
    navigate("/");
    return null;
  }

  const handleSubmit = () => {
    if (!actionType) {
      alert("Please select Return or Replace.");
      return;
    }

    if (actionType === "return") {
      const reason = selectedReason === "Other" ? otherReason : selectedReason;
      if (!reason) return alert("Please select a reason for return.");
      navigate("/final", {
        state: {
          returnId,
          postalCode,
          reason,
          action: "return",
        },
      });
    }

    if (actionType === "replace") {
      if (!replaceReason)
        return alert("Please select a reason for replacement.");
      if (!selectedSize) return alert("Please select a size.");
      navigate("/final", {
        state: {
          returnId,
          postalCode,
          action: "replace",
          replaceReason,
          size: selectedSize,
        },
      });
    }
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
              ? "Return/Replacement Eligible ✅"
              : "Return Details"}
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
            <p>
              <strong>Category:</strong> {productCategory || "General"}
            </p>
            <p className="text-gray-500 italic">
              Please verify the product details before proceeding.
            </p>
          </div>
        </div>

        {/* RIGHT: Return or Replace Logic */}
        <div>
          {isClothing && (
            <div className="mb-5">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Do you want to:
              </h3>
              <div className="flex gap-4">
                {["return", "replace"].map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      setActionType(type);
                      setSelectedReason("");
                      setReplaceReason("");
                      setSelectedSize("");
                      setOtherReason("");
                    }}
                    className={`px-4 py-2 rounded-md font-medium transition ${
                      actionType === type
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-white border border-gray-300"
                    }`}
                  >
                    {type === "return" ? "Return" : "Replace"}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Return Flow */}
          {(!isClothing || actionType === "return") && (
            <>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Reason for Return
              </h3>
              <div className="space-y-2">
                {["Damaged", "Wrong Item", "Not Needed", "Other"].map(
                  (reason) => (
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
                  )
                )}
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
            </>
          )}

          {/* Replace Flow */}
          {isClothing && actionType === "replace" && (
            <>
              <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">
                Why do you want to replace it?
              </h3>
              <div className="space-y-2">
                {["Too Small", "Too Big", "Wrong Size Sent", "Other"].map(
                  (reason) => (
                    <div
                      key={reason}
                      onClick={() => setReplaceReason(reason)}
                      className={`cursor-pointer border rounded-md px-4 py-2 transition duration-150
                    ${
                      replaceReason === reason
                        ? "bg-green-100 border-green-600 text-green-700 font-medium"
                        : "bg-white border-gray-300 text-gray-800 hover:bg-gray-100"
                    }`}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ")
                          setReplaceReason(reason);
                      }}
                    >
                      {reason}
                    </div>
                  )
                )}
              </div>

              <label className="block mt-4 text-sm font-medium text-gray-700">
                Select New Size
              </label>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="w-full border border-gray-400 rounded-md p-2 mt-1"
              >
                <option value="">-- Select Size --</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>
            </>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-md transition duration-200"
          >
            {actionType === "replace" ? "Replace Item" : "Return Item"}
          </button>
        </div>
      </div>
    </div>
  );
}
