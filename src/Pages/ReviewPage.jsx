import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaStar } from "react-icons/fa";

const ReviewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [alreadyReviewed, setAlreadyReviewed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to submit a review.");
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:5000/api/review/${id}`,
        { rating, comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccess(true);
      setRating(0);
      setComment("");
      setError("");
      setAlreadyReviewed(true);

      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (err) {
      const message = err.response?.data?.message || "Something went wrong";
      setError(message);
      if (message === "You have already reviewed this event.") {
        setAlreadyReviewed(true);
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Leave a Review</h2>

        {/* Star Rating */}
        <div style={styles.stars}>
          {[...Array(5)].map((_, i) => {
            const starValue = i + 1;
            return (
              <label key={i}>
                <input
                  type="radio"
                  name="rating"
                  value={starValue}
                  disabled={alreadyReviewed}
                  onClick={() => setRating(starValue)}
                  style={{ display: "none" }}
                />
                <FaStar
                  size={30}
                  color={
                    starValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                  }
                  onMouseEnter={() => !alreadyReviewed && setHover(starValue)}
                  onMouseLeave={() => !alreadyReviewed && setHover(0)}
                  style={{ cursor: alreadyReviewed ? "default" : "pointer", transition: "color 200ms" }}
                />
              </label>
            );
          })}
        </div>

        {/* Comment Box */}
        <textarea
          placeholder="Write your thoughts about the event..."
          value={comment}
          disabled={alreadyReviewed}
          onChange={(e) => setComment(e.target.value)}
          rows={5}
          style={styles.textarea}
        />

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          style={{
            ...styles.button,
            backgroundColor: alreadyReviewed ? "#ccc" : "#007bff",
            cursor: alreadyReviewed ? "not-allowed" : "pointer",
          }}
          disabled={alreadyReviewed}
        >
          {alreadyReviewed ? "Review Submitted" : "Submit Review"}
        </button>

        {/* Feedback Messages */}
        {success && <p style={styles.success}>✅ Review submitted!</p>}
        {success && <p style={styles.redirect}>Redirecting to dashboard...</p>}
        {error && <p style={styles.error}>⚠️ {error}</p>}
      </div>
    </div>
  );
};

export default ReviewPage;

const styles = {
  container: {
    minHeight: "100vh",
    background: "#f7f7f7",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 5px 25px rgba(0, 0, 0, 0.1)",
    maxWidth: "500px",
    width: "100%",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
  },
  stars: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    resize: "none",
    marginBottom: "20px",
    fontSize: "16px",
    fontFamily: "inherit",
    color: "black",
  },
  button: {
    width: "100%",
    padding: "12px",
    color: "#fff",
    fontSize: "16px",
    border: "none",
    borderRadius: "8px",
  },
  success: {
    marginTop: "15px",
    color: "green",
    textAlign: "center",
  },
  redirect: {
    marginTop: "10px",
    color: "#555",
    textAlign: "center",
    fontStyle: "italic",
  },
  error: {
    marginTop: "15px",
    color: "red",
    textAlign: "center",
  },
};
