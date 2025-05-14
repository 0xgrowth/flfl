import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [Animate, setAnimate] = useState(true);
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await signup(credentials)
      // Redirect after sign-up
      navigate('/second')
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

useEffect(() => {
  setTimeout(() => {
    setAnimate(false);
  }, 3030);
}, []);

  return Animate ? (
    <div className="min-h-screen bg-gradient-to-r from-purple-300 to-blue-300 flex flex-col items-center justify-center p-6">
      <h1 className="text-white text-4xl font-bold animate-pulse-opacity">F L A S H F L O W </h1>
        {/* Create pulsing text animation  */}
    </div>
) : (
    <div className="min-h-screen bg-gradient-to-r from-purple-300 to-blue-300 flex flex-col items-center justify-center p-6 gap-12">
      <h1 className="text-white text-4xl font-bold">F L A S H F L O W </h1>
      <br/>
      <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow">
        <div className="flex flex-row gap-2">
          <div className="border border-green-500 p-2 rounded"></div>
          <div className="border border-green-500 p-2 rounded"></div>
          <div className="border border-green-500 p-2 rounded"></div>
        </div>
        
        <br/>
        <label className="block mb-2">
          Email:
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded mt-1"
          />
        </label>
        <label className="block mb-4">
          Password:
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded mt-1"
          />
        </label>
        <button type="submit" 
          className="bg-gradient-to-r from-purple-300 to-blue-300 text-white p-2 w-full"
          disabled={loading}
          > {loading ? 'Signing in...' : 'Sign In'}</button>
        {error && <p className="mb-3 text-red-500">{error}</p>}
      </form>
    </div>
  );
}
