#A Fun side project AI powered 

## LocalAI Setup for Product Feedback Analyzer

This guide explains how to set up a local AI alternative to OpenAI's API using Docker. This setup allows you to run AI-powered text analysis for your Product Feedback Analyzer application without paying for API usage.

## Prerequisites

- Docker installed on your computer
- Basic knowledge of terminal/command line
- Your existing application using GraphQL, Node.js, React, and PostgreSQL

## Hardware Requirements

The setup has been optimized for:
- MacBook Pro 2017 (13-inch)
- 2.3GHz dual-core Intel Core i5
- 8GB RAM
- Intel Iris Plus Graphics 640

## Setup Instructions

### 1. Create Project Directory

```bash
mkdir localai
cd localai
```

### 2. Create Docker Configuration

Create a file named `docker-compose.yml` with the following content:

```yaml
services:
  localai:
    image: localai/localai:latest
    ports:
      - "8080:8080"
    environment:
      - THREADS=2
      - CONTEXT_SIZE=2048
      - MODELS_PATH=/models
      - MEM_LIMIT=2G
    volumes:
      - ./models:/models
    command: --api-key "your-secret-key"
```

**Note:** Replace `"your-secret-key"` with your own chosen API key.

### 3. Create Models Directory

```bash
mkdir models
```

### 4. Download AI Model

```bash
curl -LO https://gpt4all.io/models/ggml-gpt4all-j.bin
```

This will download a ~3.6GB file. Wait for the download to complete.

### 5. Move Model to Models Directory

```bash
mv ggml-gpt4all-j.bin models/
```

### 6. Start LocalAI

```bash
docker-compose up -d
```

This will download the LocalAI Docker image (~21GB) the first time. This download will happen only once, and Docker will resume from where it left off if interrupted.

### 7. Verify Installation

Check if LocalAI is running:

```bash
docker ps
```

Test the API:

```bash
curl http://localhost:8080/v1/models -H "Authorization: Bearer your-secret-key"
```

## Integrating with Your Application

### Node.js Backend Integration

Install required packages:

```bash
npm install openai
```

Create a file for AI analysis functions:

```javascript
const { Configuration, OpenAIApi } = require('openai');

// Configure to use LocalAI instead of OpenAI
const configuration = new Configuration({
  apiKey: 'your-secret-key', // Same key as in docker-compose.yml
  basePath: 'http://localhost:8080/v1', // LocalAI endpoint
});

const openai = new OpenAIApi(configuration);

// Function to analyze product feedback
async function analyzeFeedback(feedback) {
  try {
    const response = await openai.createCompletion({
      model: 'ggml-gpt4all-j', // The model we downloaded
      prompt: `Analyze the following product feedback and categorize it, extract key points, and suggest actions:\n\n${feedback}`,
      max_tokens: 500,
      temperature: 0.7,
    });
    
    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error('Error analyzing feedback:', error);
    throw error;
  }
}

module.exports = { analyzeFeedback };
```

### GraphQL Integration

Add this to your GraphQL schema:

```graphql
type FeedbackAnalysisResult {
  success: Boolean!
  analysis: String
  error: String
}

type Mutation {
  analyzeFeedback(feedbackText: String!): FeedbackAnalysisResult!
  # Your other mutations
}
```

Add this resolver:

```javascript
const { analyzeFeedback } = require('./path/to/ai-functions');

const resolvers = {
  Mutation: {
    analyzeFeedback: async (_, { feedbackText }) => {
      try {
        const analysis = await analyzeFeedback(feedbackText);
        
        // Store the analysis in PostgreSQL if needed
        await db.query(
          'INSERT INTO feedback_analysis (feedback_text, analysis_result) VALUES ($1, $2) RETURNING id',
          [feedbackText, analysis]
        );
        
        return { 
          success: true, 
          analysis,
        };
      } catch (error) {
        console.error('Error in analyzeFeedback resolver:', error);
        return {
          success: false,
          error: error.message
        };
      }
    },
  }
};
```

### React Frontend Integration

```javascript
import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';

const ANALYZE_FEEDBACK = gql`
  mutation AnalyzeFeedback($feedbackText: String!) {
    analyzeFeedback(feedbackText: $feedbackText) {
      success
      analysis
      error
    }
  }
`;

function FeedbackAnalyzer() {
  const [feedbackText, setFeedbackText] = useState('');
  const [analyzeFeedback, { loading, error, data }] = useMutation(ANALYZE_FEEDBACK);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await analyzeFeedback({ variables: { feedbackText } });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea 
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
          placeholder="Enter product feedback here"
          rows={5}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Analyzing...' : 'Analyze Feedback'}
        </button>
      </form>
      
      {error && <p>Error: {error.message}</p>}
      
      {data?.analyzeFeedback?.success && (
        <div>
          <h3>Analysis Result:</h3>
          <p>{data.analyzeFeedback.analysis}</p>
        </div>
      )}
    </div>
  );
}
```

## Performance Expectations

- Response times: 5-15 seconds for simple analyses
- Longer responses could take 20+ seconds
- Performance depends on query complexity and system load

## Troubleshooting

If LocalAI is not responding:

1. Check if the container is running:
   ```bash
   docker ps
   ```

2. Check container logs:
   ```bash
   docker-compose logs
   ```

3. Make sure the model file is in the correct location and has proper permissions

4. Ensure you're using the correct API key in your requests

## Maintenance

To stop LocalAI:
```bash
docker-compose down
```

To restart LocalAI:
```bash
docker-compose up -d
```

To update LocalAI in the future:
```bash
docker-compose pull
docker-compose up -d
```
