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
    <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        {status === "eligible" ? "Return Found ✅" : "Return Not Eligible ❌"}
      </h2>
      <p>
        <strong>Return ID:</strong> {returnId}
      </p>
      <p>
        <strong>Postal Code:</strong> {postalCode}
      </p>
      <p>Next steps will be here...</p>

      <button
        style={{
          marginTop: "20px",
          padding: "10px",
          backgroundColor: "#ccc",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          width: "100%",
          fontWeight: "600",
        }}
        onClick={() => navigate(-1)} // Goes back to previous page
      >
        Back
      </button>
    </div>
  );
}
