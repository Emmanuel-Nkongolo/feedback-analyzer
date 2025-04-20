import React from "react";
import "./FeedbackItem.css";

const FeedbackItem = ({ feedback }) => {
  const { content, source, createdAt, analysis } = feedback;

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(parseInt(dateString));
    return date.toLocaleDateString("en-Us", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Determine sentiment emoji
  const getSentimentEmoji = (sentiment) => {
    if (sentiment > 0.3) return "😃";
    if (sentiment < -0.3) return "😞";
    return "😐";
  };

  // Determine sentiment class
  const getSentimentClass = (sentiment) => {
    if (sentiment > 0.3) return "positive";
    if (sentiment < -0.3) return "negative";
    return "neutral";
  };

  return (
    <div className="feedback-item">
      <div className="feedback-content">
        <p>{content}</p>
      </div>
      <div className="feedback-meta">
        {source && <span className="source">Source: {source}</span>}
        <span className="date">{formatDate(createdAt)}</span>
      </div>

      {analysis ? (
        <div className="feedback-analysis">
          <div className="analysis-heading">AI Analysis</div>

          <div className="analysis-details">
            <div className="category">
              <span className="label">Category:</span>
              <span
                className={`value category-${analysis.category
                  .toLowerCase()
                  .replace(/\//g, "-")}`}
              >
                {analysis.category}
              </span>
            </div>

            <div className="sentiment">
              <span className="label">Sentiment:</span>
              <span
                className={`value sentiment-${getSentimentClass(
                  analysis.sentiment
                )}`}
              >
                {getSentimentEmoji(analysis.sentiment)}
                {`${(analysis.sentiment * 100).toFixed(0)}%`}
              </span>
            </div>

            {analysis.keywords && analysis.keywords.length > 0 && (
              <div className="keywords">
                <span className="label">Keywords:</span>
                <div className="keywords-list">
                  {analysis.keywords.map((keyword, index) => (
                    <span key={index} className="keyword">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="analysis-pending">Analysis pending...</div>
      )}
    </div>
  );
};

export default FeedbackItem;
