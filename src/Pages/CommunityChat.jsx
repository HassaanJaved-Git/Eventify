import React, { useEffect, useState, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";

const socket = io(import.meta.env.VITE_SOCKET_URL); // Make sure it's in .env

const CommunityChat = () => {
  const { communityId } = useParams();
  const { token, user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const chatBoxRef = useRef(null);

  useEffect(() => {
    // Join community
    socket.emit("join_community", { token, communityId });

    socket.on("joined_community", () => {
      console.log("✅ Joined community via socket:", communityId);
    });

    socket.on("error", (err) => {
      console.error("❌ Socket error:", err);
    });

    // Handle new messages
    socket.on("new_message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    // Cleanup
    return () => {
      socket.off("joined_community");
      socket.off("error");
      socket.off("new_message");
    };
  }, [communityId, token]);

  // Fetch old messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/message/get-messages-by-community/${communityId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setMessages(res.data.reverse()); // Since backend sends newest first
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };

    fetchMessages();
  }, [communityId, token]);

  // Auto-scroll
  useEffect(() => {
    chatBoxRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    socket.emit("send_message", {
      text: newMessage.trim(),
    });

    setNewMessage("");
  };

  return (
    <div className="container-fluid bg-light">
    <div style={{ backgroundColor: "#F0F2F5" }} className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl text-dark font-bold mb-4">Community Chat</h2>
      <div className="border p-4 h-96 overflow-y-auto rounded shadow mb-4 bg-white">
        {messages.length === 0 ? (
          <p className="text-gray-500">No messages yet.</p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg._id}
              className={`text-black mb-2 p-2 rounded ${
                msg.sender === user._id
                  ? "bg-blue-100 text-right"
                  : "bg-gray-100 text-left" 
              }`}
            >
              <p className="text-sm font-semibold">
                {msg.role === "organizer" ? "Organizer" : "Attendee"}
              </p>
              <p className="text-md">{msg.text}</p>
              <p className="text-xs text-gray-500">
                {new Date(msg.createdAt).toLocaleTimeString()}
              </p>
            </div>
          ))
        )}
        <div ref={chatBoxRef} />
      </div>

      <form onSubmit={handleSend} className="flex">
        <input
          type="text"
          className="flex-1 border p-2 rounded-l outline-none text-black"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 rounded-r"
        >
          Send
        </button>
      </form>
    </div>
        </div>
  );
};

export default CommunityChat;
