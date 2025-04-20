const typeDefs = `#graphql
type Feedback {
id: ID!
content: String!
source: String
createdAt: String!
updatedAt: String!
analysis: Analysis
}

type Analysis {
id: ID!
category: String!
sentiment: Float
keywords: [String]
feedbackId: ID!
createdAt: String! 
updatedAt: String!
}

type CategoryCount {
category: String!
count: Int!
}

type Query {
getAllFeedback: [Feedback]
getFeedbackById(id: ID!) : Feedback
getAnalysisSummary: [CategoryCount]
}

type Mutation {
addFeedback(content: String!, source: String): Feedback 
analyzeFeedback(feedbackId: ID!): Analysis
}
`;

export default typeDefs;
