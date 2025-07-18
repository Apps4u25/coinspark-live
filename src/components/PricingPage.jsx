import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';

// --- Main Pricing Page Component ---
export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const pricingData = {
    monthly: {
      hobby: { price: 0, features: ["5 AI Generations per day", "Standard Tone Controls", "Save up to 10 Favorite Ideas"] },
      pro: { price: 19, features: ["Unlimited AI Generations", "All Advanced Tone Controls", "Unlimited Favorites & CSV Export", "Generation History", "Whitepaper Snippets", "Real-Time Collaboration (up to 5 users)", "Priority Support"] },
      enterprise: { price: null, features: ["Everything in Pro", "Custom number of users", "Dedicated Onboarding & Support", "Advanced Security & Compliance", "Custom Integrations (API Access)", "Centralized Billing"] }
    },
    annually: {
      hobby: { price: 0, features: ["5 AI Generations per day", "Standard Tone Controls", "Save up to 10 Favorite Ideas"] },
      pro: { price: 15, features: ["Unlimited AI Generations", "All Advanced Tone Controls", "Unlimited Favorites & CSV Export", "Generation History", "Whitepaper Snippets", "Real-Time Collaboration (up to 5 users)", "Priority Support"] },
      enterprise: { price: null, features: ["Everything in Pro", "Custom number of users", "Dedicated Onboarding & Support", "Advanced Security & Compliance", "Custom Integrations (API Access)", "Centralized Billing"] }
    }
  };

  const PricingTier = ({ title, price, description, features, isPopular = false, isEnterprise = false }) => (
    <div className={`p-8 rounded-2xl border w-full max-w-md flex flex-col ${isPopular ? 'bg-gray-100 border-purple-500 shadow-2xl shadow-purple-500/10' : 'bg-white border-gray-200'}`}>
      {isPopular && <p className="text-center font-semibold text-purple-600 mb-2 tracking-wider">MOST POPULAR</p>}
      <h3 className="text-2xl font-bold text-center mb-4 text-gray-900">{title}</h3>
      <p className="text-center text-gray-600 mb-6 h-12">{description}</p>
      
      <div className="text-center mb-8">
        {isEnterprise ? (
          <p className="text-4xl font-bold text-gray-900">Custom</p>
        ) : (
          <p className="text-5xl font-bold text-gray-900">${price}<span className="text-lg font-normal text-gray-500">/mo</span></p>
        )}
        {isPopular && billingCycle === 'annually' && <p className="text-purple-600 font-semibold mt-2">Billed as $180 per year</p>}
      </div>
      
      <ul className="space-y-4 mb-8 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
      
      <button className={`w-full py-3 mt-4 rounded-lg font-semibold transition-transform duration-300 transform hover:scale-105 ${isPopular ? 'bg-purple-600 text-white hover:bg-purple-700' : isEnterprise ? 'bg-gray-800 text-white hover:bg-gray-900' : 'bg-gray-200 hover:bg-gray-300'}`}>
        {isEnterprise ? 'Contact Sales' : 'Get Started'}
      </button>
    </div>
  );

  return (
    <div className="bg-white text-gray-900 font-sans antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        
        {/* --- Header --- */}
        <div className="text-center">
          <p className="font-semibold text-purple-600">Pricing</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold mt-2 bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
            The Right Plan for Your Vision
          </h1>
          <p className="max-w-2xl mx-auto mt-6 text-lg text-gray-600">
            Start for free, and scale up as your ideas grow. All plans include access to our powerful AI idea generator.
          </p>
        </div>

        {/* --- Billing Cycle Toggle --- */}
        <div className="flex justify-center mt-10">
          <div className="relative flex p-1 bg-gray-100 rounded-full">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`relative w-1/2 rounded-full py-2 text-sm font-semibold transition-colors ${billingCycle === 'monthly' ? 'text-white' : 'text-gray-600 hover:bg-gray-200'}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annually')}
              className={`relative w-1/2 rounded-full py-2 text-sm font-semibold transition-colors ${billingCycle === 'annually' ? 'text-white' : 'text-gray-600 hover:bg-gray-200'}`}
            >
              Annually <span className="ml-1 bg-green-200 text-green-800 text-xs font-bold px-2 py-1 rounded-full">Save 20%</span>
            </button>
            <div
              className="absolute top-1 h-10 w-1/2 bg-purple-600 rounded-full transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(${billingCycle === 'monthly' ? '0%' : '100%'})` }}
            />
          </div>
        </div>

        {/* --- Pricing Tiers --- */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          <PricingTier
            title="Free"
            price={pricingData[billingCycle].hobby.price}
            description="Perfect for getting started and exploring basic ideas."
            features={pricingData[billingCycle].hobby.features}
          />
          <PricingTier
            title="Pro"
            price={pricingData[billingCycle].pro.price}
            description="For serious builders who need the full suite of creative tools."
            features={pricingData[billingCycle].pro.features}
            isPopular={true}
          />
          <PricingTier
            title="Enterprise"
            description="For organizations requiring advanced features, security, and support."
            features={pricingData[billingCycle].enterprise.features}
            isEnterprise={true}
          />
        </div>
      </div>
    </div>
  );
}
