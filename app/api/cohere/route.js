import { CohereClient } from "cohere-ai"
import dotenv from "dotenv"
dotenv.config()

const cohere = new CohereClient({
  token: process.env.CO_API_KEY,
})

export async function POST(req) {
  try {
    const { decisionData } = await req.json()

    const prompt = `
You are a witty but professional career advisor. 
User input:
${JSON.stringify(decisionData, null, 2)}

CRITICAL: Return ONLY plain text with section headers. NO JSON. NO code blocks. NO quotes around the entire response.

Format exactly like this:

Summary
Brief witty summary here

Key Considerations
Pros:
- Point 1
- Point 2
Cons:
- Point 1
- Point 2

Short-term Steps
- Step 1
- Step 2

Long-term Guidance
- Guidance 1
- Guidance 2

Final Recommendation
Final advice here

RESPOND WITH PLAIN TEXT ONLY. DO NOT USE JSON FORMAT.
`

    const response = await cohere.chat({
      model: "command-r-plus",
      message: prompt,
    })

    // The key fix: make sure we're getting the actual text content
    const aiOutput = response.text || response.message || response.response

    console.log("Raw AI Output:", aiOutput) // Debug log to see what we're getting

    return new Response(JSON.stringify({ aiOutput }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Cohere API error:", error)
    return new Response(JSON.stringify({ error: "Cohere API error" }), {
      status: 500,
    })
  }
}