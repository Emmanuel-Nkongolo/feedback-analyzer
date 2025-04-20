import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_FEEDBACK, GET_ANALYSIS_SUMMARY } from "../../graphql/queries";
import SummaryCards from "../../components/SummaryCards/SummaryCards";
import DashboardCharts from "../../components/DashboardCharts/DashboardCharts";
import FeedbackList from "../../components/FeedbackList/FeedbackList";
import "./Dashboard.css";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("all");

  const {
    loading: feedbackLoading,
    error: feedbackError,
    data: feedbackData,
    refetch: refetchFeedback,
  } = useQuery(GET_ALL_FEEDBACK);

  const {
    loading: summaryLoading,
    error: summaryError,
    data: summaryData,
    refetch: refetchSummary,
  } = useQuery(GET_ANALYSIS_SUMMARY);

  const isLoading = feedbackLoading || summaryLoading;
  const hasError = feedbackError || summaryError;

  const feedbackItems = feedbackData?.getAllFeedback || [];
  const categorySummary = summaryData?.getAnalysisSummary || [];

  // Filter feedback based on active tab
  const getFilteredFeedback = () => {
    switch (activeTab) {
      case "positive":
        return feedbackItems.filter(
          (item) => item.analysis && item.analysis.sentiment > 0.3
        );

      case "negtive":
        return feedbackItems.filter(
          (item) => item.analysis && item.analysis.sentiment < -0.3
        );
      case "neutral":
        return feedbackItems.filter(
          (item) =>
            item.analysis &&
            item.analysis.sentiment >= -0.3 &&
            item.analysis.sentiment <= 0.3
        );
      case "all":
      default:
        return feedbackItems;
    }
  };

  const handleRefresh = () => {
    refetchFeedback();
    refetchSummary();
  };

  if (isLoading)
    return <div className="loading">Loading dashboard data...</div>;
  if (hasError)
    return (
      <div className="error">
        Error loading dashboard. Please try again later.
      </div>
    );

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>Feeback Analysis Dashboard</h1>
        <button className="refresh-button" onClick={handleRefresh}>
          Refresh Data
        </button>
      </div>

      <SummaryCards feedbackData={feedbackItems} />

      <DashboardCharts
        feedbackData={feedbackItems}
        categorySummary={categorySummary}
      />

      <div className="feedback-section">
        <div className="feedback-header">
          <h2>Recent Feedback</h2>
          <div className="feedback-tabs">
            <button
              className={activeTab === "all" ? "active" : ""}
              onClick={() => setActiveTab("all")}
            >
              All
            </button>
            <button
              className={activeTab === "positive" ? "active" : ""}
              onClick={() => setActiveTab("positive")}
            >
              Positive
            </button>
            <button
              className={activeTab === "neutral" ? "active" : ""}
              onClick={() => setActiveTab("neutral")}
            >
              Neutral
            </button>
            <button
              className={activeTab === "negative" ? "active" : ""}
              onClick={() => setActiveTab("negative")}
            >
              Negative
            </button>
          </div>
        </div>

        <FeedbackList
          feedbackItems={getFilteredFeedback()}
          loading={isLoading}
          error={hasError}
        />
      </div>
    </div>
  );
};

export default Dashboard;
