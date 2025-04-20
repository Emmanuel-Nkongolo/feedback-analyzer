import { Feedback, Analysis } from "../models/associations.js";
import aiService from "./aiService.js";
import { Op } from "sequelize";

/**
 * Get all feedback items with their analysis
 * @returns {Promise<Array>} List of feedback items
 */

export const getAllFeedback = async () => {
  return await Feedback.findAll({
    include: [{ model: Analysis, as: "analysis" }],
    order: [["createdAt", "DESC"]],
  });
};

/**
 * Get all feedback item by ID
 * @param {string} id - The feedback ID
 * @returns {Promise<Object>} The feedback item
 */

export const getFeedbackById = async (id) => {
  return await Feedback.findByPk(id, {
    include: [{ model: Analysis, as: "analysis" }],
  });
};

/**
 * Add a new feedback item
 * @param {Object} data - The feedback data
 * @returns {Promise<Object>} The created feedback item
 */
export const addFeedback = async (data) => {
  return await Feedback.create(data);
};

/**
 * Analyze a feedback item
 * @param {string} feedbackId - The feedback ID to ananlyze
 * @returns {Promise<Object>} The analysis result
 */

export const analyzeFeedback = async (feedbackId) => {
  // find the feedback
  const feedback = await Feedback.findByPk(feedbackId);
  if (!feedback) {
    throw new Error("Feedback not found");
  }

  //  Analyze with AI
  const analysisResult = await aiService.analyzeText(feedback.content);

  //   Create or update analysis
  const [analysis, created] = await Analysis.findOrCreate({
    where: { feedbackId },
    default: {
      category: analysisResult.category,
      sentiment: analysisResult.sentiment,
      keywords: analysisResult.keywords,
    },
  });
  if (!created) {
    await analysis.update({
      category: analysisResult.category,
      sentiment: analysisResult.sentiment,
      keywords: analysisResult.keywords,
    });
  }
  return analysis;
};

/**
 * Get summary of feedback categories
 * @returns {Promise<Array>} Category counts
 */

export const getAnalysisSummary = async () => {
  const analyses = await Analysis.findAll();

  // Group by category
  const categoryCounts = {};
  analyses.forEach((analysis) => {
    const category = analysis.category;
    if (!categoryCounts[category]) {
      categoryCounts[category] = 0;
    }
    categoryCounts[category]++;
  });

  //  Convert to array format
  return Object.keys(categoryCounts).map((category) => ({
    category,
    count: categoryCounts[category],
  }));
};

export default {
  getAllFeedback,
  getFeedbackById,
  addFeedback,
  analyzeFeedback,
  getAnalysisSummary,
};
