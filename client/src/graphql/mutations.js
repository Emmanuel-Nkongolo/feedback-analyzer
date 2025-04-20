import { gql } from "@apollo/client";

export const ADD_FEEDBACK = gql`
  mutation AddFeedback($content: String!, $source: String) {
    addFeedback(content: $content, source: $source) {
      id
      content
      source
      createdAt
    }
  }
`;

export const ANALYZE_FEEDBACK = gql`
  mutation AnalyzeFeedback($feedbackId: ID!) {
    analyzeFeedback(feedbackId: $feedbackId) {
      id
      category
      sentiment
      keywords
    }
  }
`;
