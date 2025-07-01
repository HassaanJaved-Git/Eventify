// src/pages/CancelPage.jsx

import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const CancelPage = () => {
  const [params] = useSearchParams();
  const transactionId = params.get("transactionId");

  useEffect(() => {
    // Optionally update payment status to "failed" on cancel
    if (transactionId) {
      axios.post("http://localhost:5000/api/payfast/update-status", {
        transactionId,
        status: "failed",
      }).catch((err) => {
        console.error("Cancel update failed", err);
      });
    }
  }, [transactionId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
      <h2 className="text-3xl font-semibold text-red-600 mb-4">Payment Cancelled</h2>
      <p className="text-gray-700">
        Your payment process was canceled. No ticket has been generated.
      </p>
      {transactionId && (
        <p className="mt-4 text-sm text-gray-500">Transaction ID: {transactionId}</p>
      )}
    </div>
  );
};

export default CancelPage;
