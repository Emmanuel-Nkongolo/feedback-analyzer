import React from "react";
import { useNavigate } from "react-router-dom";
import FeedbackForm from "../../components/FeedbackForm/FeedbackForm";
import "./AddFeedback.css";

const AddFeedback = () => {
  const navigate = useNavigate();

  const handleFeedbackAdded = () => {
    //  Show success message and redirect to dashboard
    alert("Feedback submitted and analyzed successfully");
    navigate("/");
  };

  return (
    <div className="add-feedback-page">
      <FeedbackForm onFeedbackAdded={handleFeedbackAdded} />
    </div>
  );
};

export default AddFeedback;
