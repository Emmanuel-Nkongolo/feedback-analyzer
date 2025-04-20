import React from "react";
import FeedbackItem from "../FeedbackItem/FeedbackItem";
import "./FeedbackList.css";

const FeedbackList = ({ feedbackItems, loading, error }) => {
  if (loading)
    return <div className="loading-message">Loading feedback...</div>;
  if (error) return <div className="error-message">Error loading feeback.</div>;
  if (!feedbackItems || feedbackItems.length === 0) {
    return (
      <div className="empty-feedback">
        <p>No feeback available yet.</p>
        <p>
          Be the first to submit your feedback and see AI analysis in action!
        </p>
      </div>
    );
  }

  return (
    <div className="feedback-list">
      {feedbackItems.map((item) => (
        <FeedbackItem key={item.id} feedback={item} />
      ))}
    </div>
  );
};

export default FeedbackList;
