import axios from 'axios';

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export const summarizeText = async (text) => {
  try {
    const response = await axios.post(
      GROQ_API_URL,
      {
        model: "mixtral-8x7b-32768",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant that summarizes news articles concisely."
          },
          {
            role: "user",
            content: `Please provide a brief summary of this news article: ${text}`
          }
        ],
        temperature: 0.5,
        max_tokens: 150
      },
      {
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.data && response.data.choices && response.data.choices[0]) {
      return response.data.choices[0].message.content.trim();
    } else {
      throw new Error('No summary found in the response.');
    }
  } catch (error) {
    console.error('Error summarizing text:', error);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    }
    return 'Unable to generate summary at this time.';
  }
};