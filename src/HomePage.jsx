import React, { useState } from "react";
import { fakeReturns } from "./data/returns";

import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [returnId, setReturnId] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault(); // Prevent page reload

    if (!returnId || !postalCode) {
      alert("Please fill in all fields");
      return;
    }

    // Simulate looking up in the fake return database
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

    // If match found, navigate to SecondPage and pass data
    navigate("/next", { state: match });
  }

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <h2>Byebuy Return</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Return ID:</label>
          <br />
          <input
            type="text"
            value={returnId}
            onChange={(e) => setReturnId(e.target.value)}
            placeholder="Enter Return ID"
          />
        </div>
        <div style={{ marginTop: 10 }}>
          <label>Postal Code:</label>
          <br />
          <input
            type="text"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            placeholder="Enter Postal Code"
          />
        </div>
        <button type="submit" style={{ marginTop: 20 }}>
          Next
        </button>
      </form>
    </div>
  );
}
