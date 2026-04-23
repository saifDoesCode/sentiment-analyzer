import { useState } from 'react'
import './App.css'

function App() {
  const [text, setText] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const handleAnalyze = async () => {
    if (text.trim() === ""){
      setError("Please add or paste some text first")
      setResult(null)
      return
    }
    setError(null)
    setLoading(true)
    setResult(null)

    const response = await fetch("http://localhost:8000/analyze", {
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
      <h1>Sentiment Analyzer</h1>
      <p>Paste any text below and AI will analyze the sentiment</p>
      <textarea 
        placeholder="Type or paste your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleAnalyze}>Analyze</button>
 
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

    </div>
  )
}

export default App