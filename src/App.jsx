import React, { useState } from 'react';
import { Sparkles, Coins, Clipboard } from 'lucide-react';

// --- Main App Component ---
export default function App() {
  const [topic, setTopic] = useState('');
  const [ideas, setIdeas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);

  // --- Live AI Generation Function ---
  const generateIdeas = async () => {
    if (!topic.trim()) {
      setError('Please enter a topic to generate ideas.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setIdeas([]); // Clear previous ideas

    const prompt = `Generate 3 unique and funny meme coin ideas based on the topic: "${topic}". For each idea, provide a coin name, a 3-5 letter ticker symbol, a short, hilarious concept or tagline, and a creative mascot idea.`;

    try {
      const chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
      const payload = {
        contents: chatHistory,
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: {
                coinName: { type: "STRING" },
                ticker: { type: "STRING" },
                concept: { type: "STRING" },
                mascot: { type: "STRING" }
              },
              required: ["coinName", "ticker", "concept", "mascot"]
            }
          }
        }
      };

      const apiKey = "AIzaSyA0hLJDQ0xxvMGf2VqfMWfbiltpdCRRuho"; 
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}. Check your API key and permissions.`);
      }

      const result = await response.json();
      
      if (result.candidates?.[0]?.content?.parts?.[0]?.text) {
        const jsonText = result.candidates[0].content.parts[0].text;
        const newIdeas = JSON.parse(jsonText);
        setIdeas(newIdeas);
      } else {
        console.error("Unexpected API response structure:", result);
        throw new Error("Failed to parse ideas from the API response.");
      }

    } catch (err) {
      console.error("Error generating ideas:", err);
      setError(`Something went wrong. Please try again. Details: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyToClipboard = (text, index) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) { console.error('Failed to copy text: ', err); }
    document.body.removeChild(textArea);
  };

  const formatIdeaForCopy = (idea) => {
    return `Coin Name: ${idea.coinName}\nTicker: $${idea.ticker}\nConcept: ${idea.concept}\nMascot: ${idea.mascot}`;
  };

  // --- Render the Application ---
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-3xl mx-auto bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl shadow-purple-500/10 overflow-hidden border border-purple-500/20 my-8">
        
        <header className="p-6 border-b border-purple-500/20 text-center">
          <div className="flex items-center justify-center gap-3">
            <Sparkles className="w-8 h-8 text-purple-400" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
              CoinSpark
            </h1>
          </div>
          <p className="text-gray-400 mt-2">The Simple AI Meme Coin Idea Generator</p>
        </header>

        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter a topic..."
              className="flex-grow bg-gray-900 border border-gray-700 rounded-lg p-4 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all"
              onKeyPress={(e) => e.key === 'Enter' && generateIdeas()}
            />
            <button
              onClick={generateIdeas}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-900 text-white font-bold py-4 px-6 rounded-lg transition-all transform hover:scale-105"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Generate Ideas</span>
                </>
              )}
            </button>
          </div>
          {error && <p className="text-red-400 mt-4 text-center">{error}</p>}
        </div>

        <div className="p-6 md:p-8 space-y-6">
          {isLoading ? (
             <div className="text-center py-10">
                <div className="w-8 h-8 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="mt-4 text-gray-400">Generating brilliant ideas...</p>
             </div>
          ) : ideas.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ideas.map((idea, index) => (
                <div key={index} className="bg-gray-800 p-6 rounded-xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 flex flex-col">
                  <div className="flex-grow">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-purple-300">{idea.coinName}</h3>
                      <span className="bg-gray-700 text-purple-300 text-xs font-mono font-bold px-2.5 py-1 rounded-full">${idea.ticker}</span>
                    </div>
                    <p className="text-gray-300 mb-2"><strong className="text-gray-100">Concept:</strong> {idea.concept}</p>
                    <p className="text-gray-300"><strong className="text-gray-100">Mascot:</strong> {idea.mascot}</p>
                  </div>
                  <button
                    onClick={() => handleCopyToClipboard(formatIdeaForCopy(idea), index)}
                    className="mt-6 w-full flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
                  >
                    <Clipboard className="w-4 h-4" />
                    <span>{copiedIndex === index ? 'Copied!' : 'Copy Idea'}</span>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 px-6 bg-gray-800/50 rounded-lg border border-dashed border-gray-700">
              <Coins className="w-12 h-12 mx-auto text-gray-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-300">Your brilliant ideas will appear here</h3>
              <p className="text-gray-500 mt-1">Just type a topic above and hit generate!</p>
            </div>
          )}
        </div>
      </div>
       <footer className="text-center my-8">
            <p className="text-gray-500 text-sm">Powered by Google Gemini</p>






