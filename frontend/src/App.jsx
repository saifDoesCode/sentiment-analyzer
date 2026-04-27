import { useState } from 'react'
import './App.css'

function App() {
  const [text, setText] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [isOpen, setIsOpen] = useState(false)

  const handleAnalyze = async () => {
    if (text.trim() === ""){
      setError("Please add or paste some text first")
      setResult(null)
      return
    }
    setError(null)
    setLoading(true)
    setResult(null)

    const response = await fetch("https://sentiment-analyzer-7s9v.onrender.com/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: text })
    })

    const data = await response.json()
    setResult(data)
    setLoading(false)
  }

  return (
    <div className="card">
      <h1>
        <span className="title-sentiment">Sentiment </span>
        <span className="title-analyzer">Analyzer.</span>
      </h1>
      <p>Paste any text below and AI will analyze the sentiment</p>
      <textarea 
        placeholder="Type or paste your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleAnalyze}>Analyze</button>
      <button className="btn-system-design" onClick={() => setIsOpen(true)}>View System Design</button>
 
      {error && (
        <p className="error">{error}</p>
      )}
      
      {loading && (
        <div>
          <p className="loading">Hang Tight! Your text is being analyzed by the AI...</p>
        </div>
      )}

      {result && (
        <div className="result">
          <h2>Result</h2>
          <p className={`sentiment-badge ${result.sentiment}`}>{result.sentiment}</p>
          <p>{result.explanation}</p>
        </div>
      )}

      {isOpen && (
        <div className='openpopup'>
          <div className='popupcontent'>
            <h2>System Design</h2>

            <div className="diagram">

              <div className="diagram-row">
                <div className="diagram-box gray">User browser</div>
              </div>

              <div className="diagram-arrow">↓ HTTPS request ↓</div>

              <div className="diagram-row">
                <div className="diagram-box purple">
                  <strong>Vercel — Frontend</strong>
                  <span>React · App.jsx · App.css</span>
                </div>
              </div>

              <div className="diagram-arrow">↓ POST /analyze ↓</div>

              <div className="diagram-row">
                <div className="diagram-box teal">
                  <strong>Render — Backend</strong>
                  <span>FastAPI · main.py · sentiment.py</span>
                </div>
              </div>

              <div className="diagram-arrow">↓ Groq API call ↓</div>

              <div className="diagram-row">
                <div className="diagram-box amber">
                  <strong>Groq AI</strong>
                  <span>LLaMA 3.1 · returns JSON</span>
                </div>
              </div>

            </div>

            <button onClick={() => setIsOpen(false)}>Close</button>
          </div>
        </div>
      )}

    </div>
  )
}

export default App