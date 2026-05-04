# 🧠 Sentiment Analyzer

> An AI-powered full-stack web application that analyzes the emotional tone of any text in real time — built with React, FastAPI, and LLaMA 3.1 via Groq.

**Live Demo → [sentiment-analyzer-phi.vercel.app](https://sentiment-analyzer-phi.vercel.app)**

---

## 📸 Overview

Sentiment Analyzer is a production-deployed, end-to-end AI web app that takes any natural language input and returns a classified sentiment — **positive**, **negative**, or **neutral** — along with a concise AI-generated explanation. The entire pipeline, from frontend to LLM inference, runs in under a second.

---

## ⚡ Key Features

- **Real-time AI inference** — Sends text to a FastAPI backend, which calls the Groq API with LLaMA 3.1 8B for near-instant sentiment classification
- **Structured JSON output** — The LLM is prompted to return only valid JSON, with robust parsing and error handling on both ends
- **Clean, responsive UI** — Custom monospace design built from scratch in React + CSS, fully mobile-responsive
- **Interactive system design diagram** — In-app popup visualizing the full request lifecycle for transparency
- **Production deployment** — Frontend on Vercel, backend on Render, with HTTPS and CORS properly configured
- **Zero dependencies on sentiment libraries** — All classification is done natively by the LLM, not rule-based heuristics

---

## 🏗️ Architecture

```
User Browser
    │
    │  HTTPS
    ▼
Vercel (Frontend)
  React + Vite
  App.jsx · App.css
    │
    │  POST /analyze  (JSON body)
    ▼
Render (Backend)
  FastAPI · Python
  main.py · sentiment.py
    │
    │  Groq API call
    ▼
Groq AI
  LLaMA 3.1 8B Instant
  Returns: { sentiment, explanation }
```

The backend is stateless and horizontally scalable. The frontend handles all UI state locally with React hooks — no Redux, no unnecessary complexity.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite 8, CSS3 |
| Backend | FastAPI, Python, Uvicorn |
| AI / LLM | LLaMA 3.1 8B via Groq API |
| Frontend Hosting | Vercel |
| Backend Hosting | Render |
| HTTP Client | Fetch API |
| Data Validation | Pydantic |

---

## 🔍 How It Works

### 1. Frontend (`frontend/src/App.jsx`)
The user types or pastes text into a textarea. On clicking **Analyze**, the app sends a `POST` request to the backend with the text as JSON. React state manages the loading, result, and error UI states reactively.

### 2. Backend (`backend/main.py`)
FastAPI exposes a single `/analyze` endpoint. It accepts a `TextRequest` Pydantic model, passes it to the sentiment module, and returns the result. CORS middleware is configured to allow requests from any origin, enabling seamless communication with the Vercel-hosted frontend.

### 3. AI Inference (`backend/sentiment.py`)
The core logic calls the Groq API with a carefully crafted system prompt that constrains the model to return **only valid JSON** with exactly two fields: `sentiment` and `explanation`. The response is stripped of any markdown formatting before being parsed — handling edge cases where the model wraps output in code fences.

```python
# System prompt engineering for structured output
"You are a sentiment analysis expert. You must respond with ONLY a JSON object,
no other text, no markdown, no explanation outside the JSON.
The JSON must have exactly two fields: sentiment (positive, negative, or neutral)
and explanation (one sentence)."
```

---

## 📁 Project Structure

```
sentiment-analyzer/
├── backend/
│   ├── main.py           # FastAPI app, CORS config, /analyze endpoint
│   ├── sentiment.py      # Groq API integration, LLM prompt, JSON parsing
│   └── requirements.txt  # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── App.jsx       # Main component — UI, state, API call
│   │   ├── App.css       # Custom styling, responsive layout, popups
│   │   ├── main.jsx      # React DOM entry point
│   │   └── index.css     # Base reset and root layout
│   ├── public/
│   │   └── favicon.svg   # Custom SVG favicon
│   ├── index.html        # HTML shell
│   ├── vite.config.js    # Vite + React plugin config
│   └── package.json      # npm dependencies
└── README.md
```

---

## 🚀 Running Locally

### Prerequisites
- Node.js ≥ 18
- Python ≥ 3.10
- A [Groq API key](https://console.groq.com/)

### Backend

```bash
cd backend
pip install -r requirements.txt

# Create a .env file
echo "GROQ_API_KEY=your_key_here" > .env

uvicorn main:app --reload
# Runs on http://localhost:8000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

> **Note:** Update the API URL in `App.jsx` from the Render endpoint to `http://localhost:8000` when running locally.

---

## 🌐 Deployment

| Service | Platform | Config |
|---|---|---|
| Frontend | Vercel | Auto-deploys from `frontend/` on push |
| Backend | Render | Web service running `uvicorn main:app --host 0.0.0.0 --port $PORT` |

Environment variables are managed via platform dashboards — `GROQ_API_KEY` is set securely in Render's environment settings, never exposed to the client.

---

## 🧩 Design Decisions

**Why Groq + LLaMA 3.1?**
Groq's inference hardware (LPUs) delivers extremely low latency on open-weight models. LLaMA 3.1 8B is fast, capable, and free-tier accessible — ideal for a real-time UX without cold-start delays.

**Why FastAPI over Express or Flask?**
FastAPI provides automatic request validation via Pydantic, async support out of the box, and auto-generated OpenAPI docs — all with minimal boilerplate. It's production-grade and performant.

**Why no sentiment library (NLTK, TextBlob, VADER)?**
Rule-based sentiment libraries struggle with sarcasm, nuance, and context. Using an LLM gives contextually aware, human-quality classifications — with the added bonus of a natural language explanation.

**Why Vite 8?**
Vite's Rolldown-based bundler offers significantly faster build times than Webpack. With React 19 and Vite 8, the DX is modern and the production bundle is lean.

---

## 📈 Future Improvements

- [ ] Add confidence scores to the sentiment output
- [ ] Support multi-language input detection and analysis
- [ ] Stream the explanation token-by-token for a better perceived UX
- [ ] Add batch analysis for CSV/document uploads
- [ ] Implement request rate limiting and input length validation on the backend
- [ ] Add unit tests for the sentiment parsing logic

---

## 👨‍💻 Author

**Saif Ahmed** — AI Engineer · Software Engineer

- 📧 [saifanis03@gmail.com](mailto:saifanis03@gmail.com)
- 💼 [LinkedIn](https://www.linkedin.com/in/saif-ahmed-6ba859257/)
- 🐙 [GitHub — saifDoesCode](https://github.com/saifDoesCode)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
