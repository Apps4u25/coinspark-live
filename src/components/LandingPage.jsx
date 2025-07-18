import React, { useState } from 'react';
import { Sparkles, CheckCircle, Star, Users, FileText, RefreshCw, History, Zap } from 'lucide-react';

// --- Main Landing Page Component ---
export default function LandingPage() {
  const [pricingPlan, setPricingPlan] = useState('monthly');

  const Feature = ({ icon, title, children }) => (
    <div className="flex flex-col items-center text-center p-6 bg-gray-100/50 rounded-xl border border-gray-200">
      <div className="p-3 bg-purple-100 rounded-full mb-4 border border-purple-200">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-600">{children}</p>
    </div>
  );

  const PricingTier = ({ title, price, description, features, isPopular = false }) => (
    <div className={`p-8 rounded-2xl border w-full ${isPopular ? 'bg-gray-100 border-purple-500' : 'bg-white border-gray-200'}`}>
      {isPopular && <p className="text-center font-semibold text-purple-600 mb-2">MOST POPULAR</p>}
      <h3 className="text-2xl font-bold text-center mb-4">{title}</h3>
      <p className="text-5xl font-bold text-center mb-4">${price}<span className="text-lg font-normal text-gray-500">/mo</span></p>
      <p className="text-center text-gray-600 mb-8">{description}</p>
      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <button className={`w-full py-3 rounded-lg font-semibold transition-transform duration-300 transform hover:scale-105 ${isPopular ? 'bg-purple-600 text-white hover:bg-purple-700' : 'bg-gray-200 hover:bg-gray-300'}`}>
        Get Started
      </button>
    </div>
  );

  const Testimonial = ({ quote, name, role, avatar }) => (
    <div className="p-8 bg-white rounded-xl shadow-md border border-gray-200">
      <p className="text-gray-700 mb-6">"{quote}"</p>
      <div className="flex items-center">
        <img src={avatar} alt={name} className="w-12 h-12 rounded-full mr-4" />
        <div>
          <p className="font-bold text-gray-900">{name}</p>
          <p className="text-gray-500">{role}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white text-gray-900 font-sans">
      {/* --- Header --- */}
      <header className="py-4 px-8 flex justify-between items-center border-b border-gray-200 sticky top-0 bg-white/80 backdrop-blur-sm z-10">
        <div className="flex items-center gap-2">
          <Sparkles className="w-7 h-7 text-purple-500" />
          <h1 className="text-2xl font-bold">CoinSpark</h1>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <a href="#features" className="text-gray-600 hover:text-purple-500">Features</a>
          <a href="#pricing" className="text-gray-600 hover:text-purple-500">Pricing</a>
          <a href="#testimonials" className="text-gray-600 hover:text-purple-500">Testimonials</a>
        </nav>
        <div>
          <button className="text-gray-600 mr-4 hover:text-purple-500">Log In</button>
          <button className="bg-purple-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-purple-700 transition-colors">
            Sign Up
          </button>
        </div>
      </header>

      {/* --- Hero Section --- */}
      <main className="px-8 py-20 md:py-32 text-center">
        <h2 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
          Generate Viral Meme Coins in Seconds.
        </h2>
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-600 mb-10">
          Stop brainstorming in spreadsheets. CoinSpark uses AI to generate unique names, concepts, and even whitepaper snippets for your next big idea.
        </p>
        <div className="flex justify-center gap-4">
          <button className="bg-purple-600 text-white font-semibold py-3 px-8 rounded-lg text-lg hover:bg-purple-700 transition-transform duration-300 transform hover:scale-105">
            Start Generating Now
          </button>
          <button className="bg-gray-200 text-gray-800 font-semibold py-3 px-8 rounded-lg text-lg hover:bg-gray-300">
            Learn More
          </button>
        </div>
      </main>

      {/* --- Features Section --- */}
      <section id="features" className="py-20 bg-gray-50 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">The Ultimate Ideation Suite</h2>
            <p className="text-lg text-gray-600">Everything you need to go from a spark of an idea to a full-fledged concept.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Feature icon={<Zap className="w-8 h-8 text-purple-600" />} title="AI-Powered Generation">
              Instantly create unique names, tickers, and concepts with advanced AI. Select a tone to match your vision.
            </Feature>
            <Feature icon={<FileText className="w-8 h-8 text-purple-600" />} title="Whitepaper Snippets">
              Go beyond the idea. Generate professional-sounding mission statements and tokenomics concepts in one click.
            </Feature>
            <Feature icon={<RefreshCw className="w-8 h-8 text-purple-600" />} title="Generate Variations">
              Like an idea but not 100% sold? Generate multiple variations to find the perfect angle for your project.
            </Feature>
            <Feature icon={<Star className="w-8 h-8 text-purple-600" />} title="Save & Export Favorites">
              Never lose a great idea. Save your favorites and export your entire collection to CSV for offline use.
            </Feature>
            <Feature icon={<History className="w-8 h-8 text-purple-600" />} title="Full Generation History">
              The app automatically saves your recent generations, so you can always go back and find that one idea you forgot to save.
            </Feature>
            <Feature icon={<Users className="w-8 h-8 text-purple-600" />} title="Real-Time Collaboration">
              Create a shared session, invite your team, and generate ideas together. Vote on the best concepts in real-time.
            </Feature>
          </div>
        </div>
      </section>

      {/* --- Pricing Section --- */}
      <section id="pricing" className="py-20 px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Find the Perfect Plan</h2>
            <p className="text-lg text-gray-600">Start for free, and upgrade when you're ready to build the next big thing.</p>
          </div>
          <div className="flex flex-col lg:flex-row gap-8 justify-center items-center">
            <PricingTier
              title="Hobby"
              price="0"
              description="For casual creators and meme enthusiasts."
              features={[
                "5 AI Generations per day",
                "Standard Tone Controls",
                "Save up to 10 Favorite Ideas"
              ]}
            />
            <PricingTier
              title="Pro"
              price="19"
              description="For serious builders, teams, and agencies."
              features={[
                "Unlimited AI Generations",
                "All Advanced Tone Controls",
                "Unlimited Favorites & CSV Export",
                "Generation History",
                "Whitepaper Snippets",
                "Real-Time Collaboration",
                "Priority Support"
              ]}
              isPopular={true}
            />
          </div>
        </div>
      </section>

      {/* --- Testimonials Section --- */}
      <section id="testimonials" className="py-20 bg-gray-50 px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Loved by Creators Worldwide</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Testimonial
              quote="CoinSpark took our brainstorming from hours to minutes. The collaboration feature is a game-changer for our team."
              name="Alex Johnson"
              role="Founder, Degen Labs"
              avatar="https://placehold.co/100x100/E2E8F0/4A5568?text=AJ"
            />
            <Testimonial
              quote="I was stuck on a name for weeks. The 'Surprise Me' button gave me the spark I needed. I'm now a Pro subscriber!"
              name="Samantha Lee"
              role="Indie Developer"
              avatar="https://placehold.co/100x100/E2E8F0/4A5568?text=SL"
            />
            <Testimonial
              quote="The whitepaper snippet feature is insane. It helps you think about the project in a more serious way from the very beginning."
              name="Mike Chen"
              role="Crypto Content Creator"
              avatar="https://placehold.co/100x100/E2E8F0/4A5568?text=MC"
            />
          </div>
        </div>
      </section>

      {/* --- CTA Section --- */}
      <section className="py-20 px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Find Your Moonshot?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of creators and start generating world-class meme coin ideas today. Your next big idea is just a click away.
          </p>
          <button className="bg-purple-600 text-white font-semibold py-4 px-10 rounded-lg text-xl hover:bg-purple-700 transition-transform duration-300 transform hover:scale-105">
            Sign Up for Free
          </button>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="py-12 px-8 border-t border-gray-200">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500">&copy; {new Date().getFullYear()} CoinSpark. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-purple-500">Terms</a>
            <a href="#" className="text-gray-500 hover:text-purple-500">Privacy</a>
            <a href="#" className="text-gray-500 hover:text-purple-500">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
