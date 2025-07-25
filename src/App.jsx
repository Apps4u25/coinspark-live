import React, { useState, useEffect } from 'react';
import { Sparkles, Coins, Clipboard, Dices, Sun, Moon, Trash2, Wand2, Pin } from 'lucide-react';

// --- Main App Component ---
export default function App() {
  const [topic, setTopic] = useState('');
  const [style, setStyle] = useState('');
  const [history, setHistory] = useState([]);
  const [pinnedIdeas, setPinnedIdeas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [theme, setTheme] = useState('dark');

  // --- Theme & Local Storage Management ---
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem('coinsparkHistory');
      const savedPins = localStorage.getItem('coinsparkPinnedIdeas');
      if (savedHistory) setHistory(JSON.parse(savedHistory));
      if (savedPins) setPinnedIdeas(JSON.parse(savedPins));
    } catch (e) {
      console.error("Failed to load data from localStorage", e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('coinsparkHistory', JSON.stringify(history));
      localStorage.setItem('coinsparkPinnedIdeas', JSON.stringify(pinnedIdeas));
    } catch (e) {
      console.error("Failed to save data to localStorage", e);
    }
  }, [history, pinnedIdeas]);


  // --- Live AI Generation Function ---
  const generateIdeas = async (promptTopic = topic, promptStyle = style) => {
    if (!promptTopic.trim()) {
      setError('Please enter a topic to generate ideas.');
      return;
    }

    setIsLoading(true);
    setError(null);

    const prompt = `Generate 3 unique and funny meme coin ideas based on the topic: "${promptTopic}". Apply the following style or adjective: "${promptStyle}". For each idea, provide a coin name, a 3-5 letter ticker symbol, a short hilarious concept, a creative mascot idea, a simple 1-3 emoji combination for the mascot, a catchy slogan, and a "community vibe" description.`;

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
                mascot: { type: "STRING" },
                emoji: { type: "STRING" },
                slogan: { type: "STRING" },
                communityVibe: { type: "STRING" }
              },
              required: ["coinName", "ticker", "concept", "mascot", "emoji", "slogan", "communityVibe"]
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
        const newIdeas = JSON.parse(jsonText).map(idea => ({
          ...idea,
          hypeScore: Math.floor(Math.random() * 51) + 50
        }));
        setHistory(prevHistory => [{ topic: promptTopic, style: promptStyle, ideas: newIdeas }, ...prevHistory]);
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

  const handleSurpriseMe = () => {
    const randomTopics = ["Sleepy Sloths", "Cosmic Corgis", "Quantum Quokkas", "Laser Lizards", "Galactic Gerbils", "Techno Turtles", "Spicy Sausages", "Caffeinated Cats"];
    const randomStyles = ["Cyberpunk", "Vintage", "Minimalist", "Goofy", "Epic", "Mystical"];
    const randomTopic = randomTopics[Math.floor(Math.random() * randomTopics.length)];
    const randomStyle = randomStyles[Math.floor(Math.random() * randomStyles.length)];
    setTopic(randomTopic);
    setStyle(randomStyle);
    generateIdeas(randomTopic, randomStyle);
  };

  const handleCopyToClipboard = (text, fullIndex) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      setCopiedIndex(fullIndex);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) { console.error('Failed to copy text: ', err); }
    document.body.removeChild(textArea);
  };

  const formatIdeaForCopy = (idea) => {
    return `Coin Name: ${idea.coinName} ${idea.emoji}\nTicker: $${idea.ticker}\nSlogan: ${idea.slogan}\nConcept: ${idea.concept}\nMascot: ${idea.mascot}\nCommunity Vibe: ${idea.communityVibe}`;
  };

  const clearHistory = () => setHistory([]);
  const clearPinned = () => setPinnedIdeas([]);

  const isPinned = (idea) => pinnedIdeas.some(p => p.coinName === idea.coinName && p.concept === idea.concept);

  const togglePin = (idea) => {
    if (isPinned(idea)) {
      setPinnedIdeas(pinnedIdeas.filter(p => p.coinName !== idea.coinName || p.concept !== idea.concept));
    } else {
      setPinnedIdeas([idea, ...pinnedIdeas]);
    }
  };

  const IdeaCard = ({ idea, fullIndex }) => {
    const pinned = isPinned(idea);
    return (
      <div className={`bg-gray-100 dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 flex flex-col relative`}>
        <button onClick={() => togglePin(idea)} className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
          <Pin className={`w-5 h-5 ${pinned ? 'text-purple-500 fill-current' : 'text-gray-400'}`} />
        </button>
        <div className="flex-grow">
          <div className="flex items-start justify-between mb-2">
            <h4 className="text-xl font-bold text-purple-600 dark:text-purple-300 pr-8">{idea.coinName}</h4>
            <span className="text-3xl ml-2">{idea.emoji}</span>
          </div>
           <span className="block bg-gray-200 dark:bg-gray-700 text-purple-600 dark:text-purple-300 text-xs font-mono font-bold px-2.5 py-1 rounded-full mb-4 w-min">${idea.ticker}</span>
          <p className="text-gray-500 dark:text-gray-400 italic text-sm mb-4">"{idea.slogan}"</p>
          <p className="text-gray-600 dark:text-gray-300 mb-2 text-sm"><strong className="text-gray-800 dark:text-gray-100">Concept:</strong> {idea.concept}</p>
          <p className="text-gray-600 dark:text-gray-300 mb-2 text-sm"><strong className="text-gray-800 dark:text-gray-100">Mascot:</strong> {idea.mascot}</p>
          <p className="text-gray-600 dark:text-gray-300 text-sm"><strong className="text-gray-800 dark:text-gray-100">Vibe:</strong> {idea.communityVibe}</p>
        </div>
        <div className="mt-6">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-2">
                <div className="bg-gradient-to-r from-pink-500 to-purple-500 h-2.5 rounded-full" style={{ width: `${idea.hypeScore}%` }}></div>
            </div>
            <p className="text-xs text-center font-semibold text-gray-500 dark:text-gray-400">Hype Meter: {idea.hypeScore}%</p>
        </div>
        <button
          onClick={() => handleCopyToClipboard(formatIdeaForCopy(idea), fullIndex)}
          className="mt-4 w-full flex items-center justify-center gap-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
        >
          <Clipboard className="w-4 h-4" />
          <span>{copiedIndex === fullIndex ? 'Copied!' : 'Copy Idea'}</span>
        </button>
      </div>
    );
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white min-h-screen flex flex-col items-center p-4 font-sans transition-colors duration-300">
      <div className="w-full max-w-5xl mx-auto bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl shadow-purple-500/10 overflow-hidden border border-gray-200 dark:border-purple-500/20 my-8">
        
        <header className="p-6 border-b border-gray-200 dark:border-purple-500/20 text-center relative">
          <div className="flex items-center justify-center gap-3">
            <Sparkles className="w-8 h-8 text-purple-500 dark:text-purple-400" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
              CoinSpark
            </h1>
          </div>
          <p className="text-gray-500 dark:text-gray-400 mt-2">The Simple AI Meme Coin Idea Generator</p>
          <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
        </header>

        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Enter a topic (e.g., 'Cats')" className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg p-4 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all" />
              <input type="text" value={style} onChange={(e) => setStyle(e.target.value)} placeholder="Enter a style (e.g., 'Cyberpunk')" className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg p-4 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all" />
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <button onClick={handleSurpriseMe} disabled={isLoading} className="w-full md:w-auto flex-1 flex items-center justify-center gap-2 bg-pink-600 hover:bg-pink-700 disabled:bg-pink-900 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105"><Dices className="w-5 h-5" /><span>Surprise Me</span></button>
            <button onClick={() => generateIdeas()} disabled={isLoading} className="w-full md:w-auto flex-1 flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-900 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105">{isLoading ? <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div><span>Generating...</span></> : <><Wand2 className="w-5 h-5" /><span>Generate</span></>}</button>
          </div>
          {error && <p className="text-red-500 dark:text-red-400 mt-4 text-center">{error}</p>}
        </div>

        <div className="p-6 md:p-8 space-y-8">
          {pinnedIdeas.length > 0 && (
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold flex items-center gap-2"><Pin className="w-6 h-6 text-purple-500"/> Pinned Ideas</h2>
                    <button onClick={clearPinned} className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" />Clear Pins</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{pinnedIdeas.map((idea, index) => <IdeaCard key={`pin-${index}`} idea={idea} fullIndex={`pin-${index}`} />)}</div>
            </div>
          )}

          {history.length > 0 && (
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Generation History</h2>
                <button onClick={clearHistory} className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" />Clear History</button>
            </div>
          )}
          {history.length > 0 ? (
            history.map((generation, genIndex) => (
              <div key={genIndex}>
                <h3 className={`text-xl font-semibold mb-4 pb-2 border-b-2 ${genIndex === 0 ? 'border-purple-500' : 'border-gray-300 dark:border-gray-700'}`}>{genIndex === 0 ? "Latest:" : "Previous:"} <span className="text-purple-500 dark:text-purple-400">"{generation.topic}"</span> {generation.style && `in a "${generation.style}" style`}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{generation.ideas.map((idea, ideaIndex) => <IdeaCard key={ideaIndex} idea={idea} fullIndex={`${genIndex}-${ideaIndex}`} />)}</div>
              </div>
            ))
          ) : (
            !isLoading && (
              <div className="text-center py-10 px-6 bg-gray-100 dark:bg-gray-800/50 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
                <Coins className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-500 mb-4" /><h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Your brilliant ideas will appear here</h3><p className="text-gray-500 dark:text-gray-500 mt-1">Type a topic or click "Surprise Me" to begin!</p>
              </div>
            )
          )}
        </div>
      </div>
       <footer className="text-center my-8">
            <p className="text-gray-500 dark:text-gray-500 text-sm">Powered by Google Gemini</p>
        </footer>
    </div>
  );
}










