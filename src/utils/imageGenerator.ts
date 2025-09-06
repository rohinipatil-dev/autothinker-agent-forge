const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export async function generateAgentThumbnail(prompt: string): Promise<string | null> {
  try {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: `Professional, clean thumbnail illustration for AI agent: "${prompt}". Modern tech design, dashboard-friendly, minimalist style, suitable for a collection card`,
        n: 1,
        size: "512x512",
        quality: "standard"
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    return data.data[0].url;
  } catch (error) {
    console.error('Failed to generate thumbnail:', error);
    return null;
  }
}
