import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './FeedbackForm.css';

const FeedbackForm = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submittedComment, setSubmittedComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleStarClick = (star) => {
    // Toggle: if the clicked star is the current rating, reset to 0; otherwise, set to clicked star
    setRating(star === rating ? 0 : star);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async () => {
    if (rating === 0 && !comment.trim()) {
      alert('Please provide a rating or comment!');
      return;
    }

    try {
      const feedbackData = {
        eventId,
        rating,
        comment: comment.trim() || 'No comment provided',
      };

      const response = await axios.post('http://your-backend-api.com/api/feedback', feedbackData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token') || 'yourToken'}`,
        },
      });

      if (response.status === 200 || response.status === 201) {
        setSubmittedComment(feedbackData.comment);
        setSubmitted(true);
        setError('');
        setTimeout(() => {
          navigate('/');
        }, 1000);
      }
    } catch (err) {
      setError('Failed to submit feedback. Please try again later.');
      console.error('Error submitting feedback:', err);
    }
  };

  return (
    <div className="feedback-container">
      <h2>Submit Feedback for Event {eventId}</h2>
      {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
      {!submitted ? (
        <>
          <div className="stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => handleStarClick(star)}
                style={{ cursor: 'pointer', color: star <= rating ? '#ffd700' : '#ccc', fontSize: '1.8em' }}
              >
                ★
              </span>
            ))}
          </div>
          <textarea
            placeholder="Your feedback..."
            className="feedback-input"
            value={comment}
            onChange={handleCommentChange}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
          ></textarea>
          <button className="submit-btn" onClick={handleSubmit}>
            SUBMIT FEEDBACK
          </button>
        </>
      ) : (
        <div className="submission-confirmation">
          <h3>Thank You!</h3>
          <p>Your feedback for Event {eventId} has been saved.</p>
          {submittedComment && <p><strong>Submitted Comment:</strong> {submittedComment}</p>}
          <p>Redirecting to landing page...</p>
        </div>
      )}
    </div>
  );
};

export default FeedbackForm;