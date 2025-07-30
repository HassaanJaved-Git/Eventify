import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EventDashboard = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [buyers, setBuyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    const fetchBuyers = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/ticket/event/${eventId}/buyers`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setBuyers(res.data);
      } catch (err) {
        console.error("Failed to fetch buyers", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBuyers();
  }, [eventId]);

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this event?");
    if (!confirmed) return;

    try {
      setDeleteLoading(true);
      await axios.delete(`http://localhost:5000/api/event/${eventId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Event deleted successfully!");
      navigate("/organizer/dashboard"); // Redirect after delete
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete event.");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Buyers for Event</h2>
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/edit-event/${eventId}`)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
          >
            Edit Event
          </button>
          <button
            onClick={handleDelete}
            disabled={deleteLoading}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm"
          >
            {deleteLoading ? "Deleting..." : "Delete Event"}
          </button>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : buyers.length === 0 ? (
        <p>No buyers found for this event.</p>
      ) : (
        <div>
          <table className="w-full text-left border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">#</th>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Qty</th>
                <th className="border px-4 py-2">Paid</th>
                <th className="border px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {buyers.map((buyer, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{buyer.name}</td>
                  <td className="border px-4 py-2">{buyer.email}</td>
                  <td className="border px-4 py-2">{buyer.quantity}</td>
                  <td className="border px-4 py-2">Rs. {buyer.amount}</td>
                  <td className="border px-4 py-2">
                    {buyer.date
                      ? new Date(buyer.date).toLocaleDateString()
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4 font-semibold">
            Total Earnings: Rs.{" "}
            {buyers.reduce((sum, buyer) => sum + (buyer.amount || 0), 0)}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDashboard;
