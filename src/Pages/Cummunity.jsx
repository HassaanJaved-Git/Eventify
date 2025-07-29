import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const Community = () => {
  const { token } = useContext(AuthContext);
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/community/get-communities`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCommunities(response.data.communities);
      } catch (error) {
        console.error("Error fetching communities:", error);
        setError("Failed to fetch communities");
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchCommunities();
  }, [token]);

  if (loading) return <div className="p-5 bg-light text-dark">Loading communities...</div>;
  if (error) return <div className="p-5 text-red-500">{error}</div>;

  return (
    <div className="p-6 bg-light text-dark">
      <h1 className="text-3xl font-semibold mb-6">Your Communities</h1>
      {!communities.length ? (
        <p className="text-gray-500">You are not a member of any communities.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {communities.map((community) => (
            <div
              key={community._id}
              onClick={() => navigate(`/community-chat/${community._id}`)}
              className="cursor-pointer bg-white border rounded-xl shadow hover:shadow-lg transition duration-300 p-4"
            >
              <h2 className="text-xl font-bold">{community.event?.title}</h2>
              {community.event?.image?.imageURL && (
                <img
                  src={community.event.image.imageURL}
                  alt={community.event.title}
                  className="mt-2 w-full h-48 object-cover rounded-lg"
                />
              )}
              <h3 className="font-semibold mt-4 mb-2">Members:</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                {community.members.map((member) => (
                  <li key={member.user._id}>
                    <span className="font-medium">{member.user.name}</span> ({member.role})
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Community;