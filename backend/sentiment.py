from groq import Groq
from dotenv import load_dotenv
import os
import json

load_dotenv()
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def analyze_sentiment(text: str) -> dict:
    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {
                "role": "system",
                "content": "You are a sentiment analysis expert. You must respond with ONLY a JSON object, no other text, no markdown, no explanation outside the JSON. The JSON must have exactly two fields: sentiment (positive, negative, or neutral) and explanation (one sentence)."
            },
            {
                "role": "user",
                "content": text
            }
        ]
    )

    result = response.choices[0].message.content
    result = result.strip()
    if result.startswith("```"):
        result = result.split("```")[1]
        if result.startswith("json"):
            result = result[:4]
    return json.loads(result)