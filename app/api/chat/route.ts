import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { CONTEXT } from "../../../data/about-john";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.warn(
    "[chat api] GEMINI_API_KEY is not set. The Ask about John chatbot will not work until it is configured."
  );
}

const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

const BASE_SYSTEM_PROMPT = `
You are a concise assistant that answers questions strictly about John Wilberth Botin using ONLY the facts in the provided CONTEXT.

Rules:
- Only use information that appears in the CONTEXT text.
- If a question asks for anything not present in CONTEXT (including personal opinions, dates, salary, contact methods beyond what is listed, or any guesses), reply with exactly:
  "I don’t have that detail yet—please contact John at contactjohnbotin@gmail.com."
- If the user asks whether John is single, has a girlfriend, or any relationship-status question, answer clearly that he is in a relationship with Micah and is happily committed to her, based on the CONTEXT.
- Keep answers between 1 and 6 sentences.
- Do not invent or infer new facts.
`.trim();

const MODEL_PRIMARY = "gemini-3-flash-preview";
const MODEL_FALLBACK = "gemini-2.0-flash";

async function generateReply(message: string): Promise<string> {
  if (!ai || !apiKey) {
    return "I don’t have that detail yet—please contact John at contactjohnbotin@gmail.com.";
  }

  const prompt = [
    BASE_SYSTEM_PROMPT,
    "",
    "CONTEXT:",
    CONTEXT,
    "",
    "User question:",
    message.trim()
  ].join("\n");

  const generationConfig = {
    maxOutputTokens: 600,
    temperature: 0.4
  };

  const attempt = async (model: string) => {
    const result = await ai.models.generateContent({
      model,
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: generationConfig
    });
    const parts = result.candidates?.[0]?.content?.parts ?? [];
    const text = parts
      .map((part: any) => (typeof part?.text === "string" ? part.text : ""))
      .join(" ")
      .trim();
    return text || "I don’t have that detail yet—please contact John at contactjohnbotin@gmail.com.";
  };

  try {
    return await attempt(MODEL_PRIMARY);
  } catch (err: any) {
    const messageText =
      typeof err?.message === "string" ? err.message.toLowerCase() : "";
    const shouldFallback =
      messageText.includes("not found") ||
      messageText.includes("unknown") ||
      messageText.includes("unavailable");

    if (shouldFallback) {
      try {
        return await attempt(MODEL_FALLBACK);
      } catch (err2) {
        console.error("[chat api] Fallback model failed:", err2);
      }
    } else {
      console.error("[chat api] Primary model error:", err);
    }

    return "I don’t have that detail yet—please contact John at contactjohnbotin@gmail.com.";
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    const message = typeof body?.message === "string" ? body.message.trim() : "";

    if (!message || message.length === 0) {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }

    if (message.length > 1000) {
      return NextResponse.json(
        { error: "Message is too long. Please keep it under 1000 characters." },
        { status: 400 }
      );
    }

    const reply = await generateReply(message);

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("[chat api] Unexpected error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}

