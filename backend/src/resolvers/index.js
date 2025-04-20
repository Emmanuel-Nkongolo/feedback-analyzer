import feedbackService, {
  addFeedback,
  analyzeFeedback,
  getAllFeedback,
  getAnalysisSummary,
  getFeedbackById,
} from "../services/feedbackService.js";

const resolvers = {
  Query: {
    getAllFeedback: async () => {
      return await feedbackService.getAllFeedback();
    },
    getFeedbackById: async (_, { id }) => {
      return await feedbackService.getFeedbackById(id);
    },
    getAnalysisSummary: async () => {
      return await feedbackService.getAnalysisSummary();
    },
  },
  Mutation: {
    addFeedback: async (_, { content, source }) => {
      return await feedbackService.addFeedback({ content, source });
    },
    analyzeFeedback: async (_, { feedbackId }) => {
      return await feedbackService.analyzeFeedback(feedbackId);
    },
  },
};

export default resolvers;
