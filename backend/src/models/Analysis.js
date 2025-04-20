import { DataTypes } from "sequelize";
import sequelize from "./index.js";
import Feedback from "./Feedback.js";

const Analysis = sequelize.define(
  "Analysis",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sentiment: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    keywords: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
    feedbackId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        mode: "feedbacks",
        key: "id",
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "analyses",
    timestamps: true,
  }
);

// Define relaships
Analysis.belongsTo(Feedback, { foreignKey: "feedbackId", as: "feedback" });
Feedback.hasOne(Analysis, { foreignKey: "feedbackId", as: "analysis" });

export default Analysis;
