import React, { useState } from 'react';
import { Sparkles, Mail, Lock } from 'lucide-react';

// --- Main Login Page Component ---
export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    // Basic validation
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    // --- Placeholder for your actual login logic ---
    // Here, you would typically call your authentication service (e.g., Firebase, Auth0)
    console.log('Logging in with:', { email, password });
    
    // Example of handling a failed login from a service:
    // if (loginFailed) {
    //   setError('Invalid email or password. Please try again.');
    // }
  };

  return (
    <div className="bg-white min-h-screen flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md">
        {/* --- Header --- */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-10 h-10 text-purple-500" />
            <h1 className="text-4xl font-bold text-gray-900">CoinSpark</h1>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-gray-600">Log in to access your dashboard and saved ideas.</p>
        </div>

        {/* --- Login Form --- */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
          <form onSubmit={handleLogin}>
            <div className="space-y-6">
              {/* --- Email Input --- */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-lg border-gray-300 bg-gray-50 py-3 pl-10 pr-3 text-gray-900 focus:border-purple-500 focus:ring-purple-500"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {/* --- Password Input --- */}
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Password
                  </label>
                  <a href="#" className="text-sm font-medium text-purple-600 hover:text-purple-500">
                    Forgot your password?
                  </a>
                </div>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-lg border-gray-300 bg-gray-50 py-3 pl-10 pr-3 text-gray-900 focus:border-purple-500 focus:ring-purple-500"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* --- Error Message --- */}
              {error && (
                <div className="text-red-500 text-sm text-center">
                  {error}
                </div>
              )}

              {/* --- Submit Button --- */}
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-lg bg-purple-600 px-3 py-3 text-base font-semibold text-white shadow-sm hover:bg-purple-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 transition-colors"
                >
                  Log In
                </button>
              </div>
            </div>
          </form>

          {/* --- Sign Up Link --- */}
          <p className="mt-8 text-center text-sm text-gray-500">
            Not a member?{' '}
            <a href="#" className="font-semibold leading-6 text-purple-600 hover:text-purple-500">
              Sign up for free
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
