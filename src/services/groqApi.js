import axios from 'axios';

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GROQ_API_URL = 'https://api.groq.com/v1/summarize';

export const summarizeText = async (text) => {
  try {
    const response = await axios.post(
      GROQ_API_URL,
      {
        text: text,
        summaryLength: 'short', 
      },
      {
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('API response:', response.data); 

    if (response.data && response.data.summary) {
      return response.data.summary;
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