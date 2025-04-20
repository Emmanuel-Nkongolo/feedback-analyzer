import React from "react";
import "./SummaryCards.css";

const SummaryCards = ({ feedbackData }) => {
  // Calculate metrics
  const totalFeedback = feedbackData.length;
  const analyzedFeedback = feedbackData.filter((item) => item.analysis).length;
  const positivePercentage =
    totalFeedback > 0
      ? Math.round(
          (feedbackData.filter(
            (item) => item.analysis && item.analysis.sentiment > 0.3
          ).length /
            totalFeedback) *
            100
        )
      : 0;

  return (
    <div className="summary-cards">
      <div className="summary-card">
        <div className="card-icon">
          <i className="fas fa-comment"></i>
        </div>
        <div className="card-content">
          <h3>Total Feedback</h3>
          <p className="card-value">{totalFeedback}</p>
        </div>
      </div>

      <div className="summary-card">
        <div className="card-icon">
          <i className="fas fa-chart-pie"></i>
        </div>
        <div className="card-content">
          <h3>Analyzed</h3>
          <p className="card-value">{analyzedFeedback}</p>
        </div>
      </div>

      <div className="summary-card">
        <div className="card-icon">
          <i className="fas fa-smile"></i>
        </div>
        <div className="card-content">
          <h3>Positive Feedback</h3>
          <p className="card-value">{positivePercentage}%</p>
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;
