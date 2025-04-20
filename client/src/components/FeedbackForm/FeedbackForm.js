import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_FEEDBACK, ANALYZE_FEEDBACK } from "../../graphql/mutations";
import "./FeedbackForm.css";

const FeedbackForm = ({ onFeedbackAdded }) => {
  const [content, setContent] = useState("");
  const [source, setSource] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [addFeedback] = useMutation(ADD_FEEDBACK);
  const [analyzeFeedback] = useMutation(ANALYZE_FEEDBACK);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Add feedback
      const { data } = await addFeedback({
        variables: { content, source },
      });

      // Analyze feeback
      await analyzeFeedback({
        variables: { feedbackId: data.addFeedback.id },
      });

      //  Clear form
      setContent("");
      setSource("");

      // Call callback if provided
      if (onFeedbackAdded) return onFeedbackAdded();
    } catch (err) {
      console.error("Error submitting feedback:", err);
      setError("Failed to submit feedback. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="feeback-form-container">
      <h2>Submit Product Feedback</h2>
      <p className="form-description">
        Share your experience with our product. Our AI will analyze your
        feedback to help us improve.
      </p>

      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="feedback-form">
        <div className="form-group">
          <label htmlFor="content">Feedback</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter you feedback here..."
            rows={5}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="source">Source (Optional)</label>
          <input
            id="source"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            placeholder="e.g., Customer Support, Survey, App Review"
          />
        </div>
        <button
          type="submit"
          className="submit-button"
          disabled={loading || !content.trim()}
        >
          {loading ? "Processing..." : "Submit Feedback"}
        </button>
      </form>

      <div className="feedback-tips">
        <h3>Tips for useful feedback:</h3>
        <ul>
          <li>Be specific about what you liked or disliked</li>
          <li>Include examples when possible</li>
          <li>Suggest improvements if you have ideas</li>
        </ul>
      </div>
    </div>
  );
};

export default FeedbackForm;
