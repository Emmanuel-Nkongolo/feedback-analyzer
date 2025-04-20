import { gql } from "@apollo/client";

export const GET_ALL_FEEDBACK = gql`
  query GetAllFeedback {
    getAllFeedback {
      id
      content
      source
      createdAt
      analysis {
        id
        category
        sentiment
        keywords
      }
    }
  }
`;

export const GET_FEEDBACK_BY_ID = gql`
  query GeFeedbakcById($id: ID!) {
    getFeedbackById(id: $id) {
      id
      content
      source
      createdAt
      analysis {
        id
        category
        sentiment
        keywords
      }
    }
  }
`;

export const GET_ANALYSIS_SUMMARY = gql`
  query GetAnalysisSummary {
    getAnalysisSummary {
      category
      count
    }
  }
`;
