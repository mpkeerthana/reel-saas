const OpenAI = require('openai');

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1',
});

const GROQ_MODEL = process.env.GROQ_MODEL || 'openai/gpt-oss-20b';

const generateIdea = async (niche, mood) => {
  if (!process.env.GROQ_API_KEY) {
    throw new Error('Missing GROQ_API_KEY in environment');
  }

  const prompt = `Give a short Instagram reel idea with caption and hashtags for niche: ${niche}, mood: ${mood}`;

  try {
    const response = await client.responses.create({
      model: GROQ_MODEL,
      input: prompt,
    });

    const text = response.output_text ||
      (Array.isArray(response.output)
        ? response.output
            .flatMap((item) => item.content || [])
            .find((block) => block.type === 'output_text')?.text
        : undefined);

    if (!text) {
      throw new Error('No text output returned from Groq');
    }

    return text;
  } catch (err) {
    console.error('Groq Error:', err?.message || err);
    const status = err?.status || err?.response?.status || 500;
    const rawMessage = err?.message || err?.response?.data || 'Something went wrong. Please try again.';
    const message = typeof rawMessage === 'string' ? rawMessage : JSON.stringify(rawMessage);
    const error = new Error(message);
    error.status = status;
    throw error;
  }
};

module.exports = { generateIdea };