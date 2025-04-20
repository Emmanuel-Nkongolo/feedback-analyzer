import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import "./DashboardCharts.css";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#82ca9d",
  "#ffc658",
];

const DashboardCharts = ({ feedbackData, categorySummary }) => {
  // Prepare sentiment data
  const prepareSentimentData = (feedbackItems) => {
    const sentimentData = [
      { name: "Positive", value: 0 },
      { name: "Neutral", value: 0 },
      { name: "Negative", value: 0 },
    ];

    feedbackItems.forEach((item) => {
      if (item.analysis) {
        const sentiment = item.analysis.sentiment;
        if (sentiment > 0.3) {
          sentimentData[0].value++;
        } else if (sentiment < -0.3) {
          sentimentData[2].value++;
        } else {
          sentimentData[1].value++;
        }
      }
    });

    return sentimentData;
  };

  const sentimentData = prepareSentimentData(feedbackData);

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label}: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  //   Only show charts if we have data
  if (!feedbackData.length || !categorySummary.length) {
    return (
      <div className="no-chart-data">
        <p>Submit feedback to see analysis charts</p>
      </div>
    );
  }

  return (
    <div className="dashboard-charts">
      <div className="chart-contaire">
        <h3>Feedback by Category</h3>
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categorySummary}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="chart-container">
        <h3>Sentiment Distribution</h3>
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={sentimentData}
                cx="50%"
                cy="50"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  percent > 0 ? `${name}: ${(percent * 100).toFixed(0)}%` : ""
                }
              >
                {sentimentData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;
