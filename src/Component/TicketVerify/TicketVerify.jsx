import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrganizerTicketVerify = () => {
  const { id } = useParams(); // ticket id from URL
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [attendanceMarked, setAttendanceMarked] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const token = localStorage.getItem('token')

  // Fetch ticket data on mount
  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/ticket/verify-ticket/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          } 
        });
        setTicket(res.data.ticket);
        toast.success(res.data.message);
      } catch (err) {
        const backendMessage = err.response?.data?.message || 'Something went wrong';
        const status = err.response?.status;

        toast.error(`❌ ${backendMessage}`);
        setErrorMessage(backendMessage);
        setTicket(null);
      } finally {
        setLoading(false);
      }
    };
    fetchTicket();
  }, [id]);

  const handleAttendance = async () => {
    try {
      const res = await axios.post(`http://localhost:5000/api/ticket/ticket-attend/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success(res.data.message);
      setAttendanceMarked(true);
      setTicket(res.data.ticket);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to mark attendance');
    }
  };

  if (loading) return <div className="p-4 text-center">Loading ticket...</div>;

  if (!ticket && !loading) {
    return (
      <div className="p-6 mt-10 text-center bg-red-100 border border-red-300 rounded-lg max-w-md mx-auto text-red-700 font-semibold">
        <h2 className="text-xl">⚠️ Ticket Invalid</h2>
        <p className="mt-2">{errorMessage || "Ticket not found or error occurred."}</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 mt-10 border rounded-xl shadow-lg bg-white">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-4 text-center text-green-600">🎫 Ticket Verification</h2>

      <div className="space-y-3">
        <p><strong>Event:</strong> {ticket?.event?.title || "N/A"}</p>
        <p><strong>Date:</strong> {ticket?.event?.date && new Date(ticket.event.date).toLocaleDateString()}</p>
        <p><strong>Time:</strong> {ticket?.event?.startTime && new Date(ticket.event.startTime).toLocaleTimeString()}</p>
        <hr />

        <div className="flex items-center gap-4 mt-2">
          <img src={ticket.user.profileImage?.imageURL} alt="User" className="w-14 h-14 rounded-full border" />
          <div>
            <p><strong>Name:</strong> {ticket?.user?.name || "N/A"}</p>
            <p><strong>Username:</strong> @{ticket?.user?.userName || "N/A"}</p>
          </div>
        </div>

        <hr />

        {ticket.ticketUsed ? (
          <p className="text-red-600 font-bold mt-4">❌ Ticket already used</p>
        ) : attendanceMarked ? (
          <p className="text-green-600 font-bold mt-4">✅ Attendance marked successfully</p>
        ) : (
          <button
            onClick={handleAttendance}
            className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Mark Attendance
          </button>
        )}
      </div>
    </div>
  );
};

export default OrganizerTicketVerify;
