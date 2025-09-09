import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [
    (process.env.GEMINI_API_KEY) ? googleAI({apiKey: process.env.GEMINI_API_KEY}) : googleAI(),
  ],
  model: 'googleai/gemini-1.5-flash',
});
