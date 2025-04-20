import OpenAI from "openai";
import config from "../config/index.js";

const openai = new OpenAI({
  apiKey: config.openai.apiKey,
  basePath: config.openai.basePath,
});

// Available categories for feedback classification
const categories = [
  "UI/UX",
  "Performance",
  "Features",
  "Pricing",
  "Support",
  "Documetation",
  "Bug",
  "Other",
];

/**
 * Analyzes text feedback using OpenAI
 * @param {string} text - The feedback text to analyze
 * @returns {Promise<Object>} Analysis results with category, sentiment, and keywords
 */
export const analyzeText = async (text) => {
  try {
    const response = await openai.chat.completions.create({
      model: "en-xx-0035-t5-ff3-0203",
      messages: [
        {
          role: "system",
          content: `You are an AI assistant that analyzes products feedback.
                    Categorize the feedback into one of the following categories: ${categories.join(
                      ", "
                    )}.
                    Determine the sentiment score from -1 (very negative) to 1 (very positive).
                    Extract up to 5 keywords from the feedback.
                    Respond in JSON format with category, sentiment, and keywords fields.`,
        },
        {
          role: "user",
          content: text,
        },
      ],
      response_format: { type: "json_object" },
    });

    const content = response.choices[0].message.content;
    const analysisResult = JSON.parse(content);

    return {
      category: analysisResult.category || "Other",
      sentiment: parseFloat(analysisResult.sentiment) || 0,
      keywords: analysisResult.keywords || [],
    };
  } catch (err) {
    console.error("AI analysis error:", err);

    // Return default values in case of error
    return {
      category: "Other",
      sentiment: 0,
      keywords: [],
    };
  }
};

export default {
  analyzeText,
};
