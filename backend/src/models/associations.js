import Feedback from "./Feedback.js";
import Analysis from "./Analysis.js";

// This file ensures all associations are loaded
const setupAssociations = () => {
  // Associations are already defined in the model files
  // This function exists to ensure all models are imported
  console.log("Models and associations loaded");
};

export { Feedback, Analysis, setupAssociations };
