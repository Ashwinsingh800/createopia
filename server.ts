import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config({ path: '.env.local' });
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize Gemini client with mandated User-Agent
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// Helper to call Gemini with graceful fallback across available flash models
async function callGeminiWithFallback(params: {
  contents: any;
  systemInstruction: string;
  responseMimeType?: string;
}) {
  if (!ai) return null;
  const candidateModels = ['gemini-3.8-flash', 'gemini-flash-latest'];

  for (const model of candidateModels) {
    try {
      const callPromise = ai.models.generateContent({
        model,
        contents: params.contents,
        config: {
          systemInstruction: params.systemInstruction,
          ...(params.responseMimeType ? { responseMimeType: params.responseMimeType } : {}),
        },
      });

      const timeoutPromise = new Promise<null>((_, reject) =>
        setTimeout(() => reject(new Error('Model call timeout')), 7000)
      );

      const response: any = await Promise.race([callPromise, timeoutPromise]);
      if (response && response.text) {
        return response.text;
      }
    } catch (err: any) {
      console.warn(`Model ${model} attempt failed:`, err?.message || err);
    }
  }
  return null;
}

// API: AI-Assisted Brief Builder
app.post('/api/brief/generate', async (req, res) => {
  try {
    const { idea } = req.body;
    if (!idea || typeof idea !== 'string') {
      return res.status(400).json({ error: 'Please provide a creative idea description.' });
    }

    const systemPrompt = `You are a Senior Creative Director at Createopia, an elite AI Creator Marketplace.
A brand has provided a rough creative idea. Transform this idea into a structured, production-ready creative brief for AI filmmakers and visual artists.
CRITICAL INSTRUCTION: Do NOT hallucinate or invent specific arbitrary details that were unstated (e.g., if the user didn't mention a deadline, flag it as a missing requirement rather than inventing an exact calendar date).
Return ONLY a valid JSON object with the following fields:
{
  "title": "A punchy, professional campaign title",
  "objective": "Clear, concise commercial or artistic goal (2 sentences max)",
  "contentType": "One of: AI Brand Film | Commercial Short | 3D Motion & VFX | Key Visuals | Product Reel | Virtual Production",
  "visualStyle": "Specific art direction description (e.g. Cinematic Neo-Noir, Minimalist Brutalism, Ethereal Organic, Anamorphic Film)",
  "deliverables": "Exact assets required (e.g. 1x 45s Film, 3x 9:16 Social Cutdowns, 4x Master 4K Stills)",
  "aspectRatio": "e.g. 16:9, 9:16, 4:5, or 1:1",
  "duration": "e.g. 30 seconds, 45 seconds, 60 seconds, or N/A for stills",
  "budgetMin": "Integer minimum budget in USD, or empty string if unstated",
  "budgetMax": "Integer maximum budget in USD, or empty string if unstated",
  "deadline": "Required delivery date as YYYY-MM-DD, or empty string if unstated",
  "commercialRequirements": "Commercial license, AI model transparency, and seed log requirements",
  "referenceNotes": "Stylistic references, lighting cues, lens suggestions, and color palette notes",
  "missingRequirements": ["List of critical parameters that the brand did NOT specify in their prompt, so they know to fill them in"]
}`;

    const text = await callGeminiWithFallback({
      contents: `Raw Creative Idea from Brand:\n"""${idea}"""\n\nGenerate the structured brief now.`,
      systemInstruction: systemPrompt,
      responseMimeType: 'application/json',
    });

    if (text) {
      try {
        const parsed = JSON.parse(text.replace(/^```json\s*/i, '').replace(/\s*```$/, '').trim());
        return res.json(parsed);
      } catch (e) {
        console.warn('Failed to parse Gemini JSON output, falling back to structured extractor');
      }
    }

    return res.status(503).json({
      error: apiKey
        ? 'Gemini did not return a valid brief. Please try again.'
        : 'Gemini is not configured. Add GEMINI_API_KEY to .env.local and restart the server.',
    });
  } catch (err: any) {
    console.error('Error in brief builder:', err);
    return res.status(500).json({
      error: 'Failed to process brief: ' + (err?.message || 'Unknown error'),
    });
  }
});

// API: Creative Copilot
app.post('/api/copilot/chat', async (req, res) => {
  try {
    const { messages, promptType = 'video_prompt' } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required.' });
    }
    if (messages.length === 0 || messages.length > 20) {
      return res.status(400).json({ error: 'Send between 1 and 20 conversation messages.' });
    }

    const systemPrompt = `You are the Createopia Creative Copilot, an expert AI prompt engineer and creative producer.
You help brands and directors generate high-converting, reproducible prompts for state-of-the-art AI video and image models (Runway Gen-3, Sora, Kling, Midjourney v6, ComfyUI, FLUX.1).
Task type requested: ${promptType}.

Rules:
1. Be succinct, professional, and knowledgeable.
2. Ask only the most essential follow-up questions if needed (camera movement, aspect ratio, lighting mood).
3. Always supply a pristine, ready-to-use Master Prompt.
4. Provide the recommended model and aspect ratio.
5. In addition to your conversational response, include a structured brief extraction snippet when applicable so the brand can transfer it directly to a Creative Brief.

Return ONLY a JSON response in this format:
{
  "reply": "Your conversational answer explaining the prompt structure, camera cues, and techniques.",
  "generatedPrompt": "The clean, copy-pasteable prompt itself with all camera/lighting/stylistic parameters.",
  "recommendedModel": "e.g. Runway Gen-3 Alpha, Kling 1.5, or Midjourney v6.1",
  "suggestedBrief": {
    "title": "Suggested short title",
    "contentType": "e.g. AI Brand Film or Key Visuals",
    "visualStyle": "e.g. Neo-Noir Anamorphic"
  }
}`;

    const formattedContents = messages.map((m: any) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content || '' }],
    }));

    const text = await callGeminiWithFallback({
      contents: formattedContents,
      systemInstruction: systemPrompt,
      responseMimeType: 'application/json',
    });

    if (text) {
      try {
        const parsed = JSON.parse(text.replace(/^```json\s*/i, '').replace(/\s*```$/, '').trim());
        return res.json(parsed);
      } catch (e) {
        console.warn('Failed to parse Gemini Copilot JSON output');
      }
    }

    return res.status(503).json({
      error: apiKey
        ? 'Gemini did not return a valid Copilot response. Please try again.'
        : 'Gemini is not configured. Add GEMINI_API_KEY to .env.local and restart the server.',
    });
  } catch (err: any) {
    console.error('Error in copilot chat:', err);
    return res.status(500).json({
      error: 'Failed to communicate with Creative Copilot: ' + (err?.message || 'Unknown error'),
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hasApiKey: !!process.env.GEMINI_API_KEY,
    timestamp: new Date().toISOString()
  });
});

async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(port, () => {
    console.log(`Createopia server running on port ${port}`);
  });
}

startServer();
