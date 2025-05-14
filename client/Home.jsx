import { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';

export default function Home() {
  // const [form, setForm] = useState({ name: "", email: "", goals: "" });
  // const [success, setSuccess] = useState(false);
  // const [users, setUsers] = useState([]);
  const [Animate, setAnimate] = useState(true);
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
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

  // const handleChange = (e) => {
  //   setForm({ ...form, [e.target.name]: e.target.value });
  // };

  // const validateForm = () => {
  //   if (!form.name.trim() || !form.email.trim() || !form.goals.trim()) {
  //     setError("All fields are required.");
  //     return false;
  //   }
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   if (!emailRegex.test(form.email)) {
  //     setError("Enter a valid email address.");
  //     return false;
  //   }
  //   setError("What happened:" + error );
  //   return true;
  // };

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   // if (!validateForm()) return;

  //   try {
  //     const res = await axios.post("http://localhost:5000/api/users", form);
  //     setSuccess(true);
  //     // setForm({ name: "", email: "", goals: "" });
  //     // fetchUsers();
  //   } catch (err) {
  //     setError("Failed to save user");
  //   }
  // };

useEffect(() => {
  setTimeout(() => {
    setAnimate(false);
  }, 3030);
}, []);

//   const fetchUsers = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/users");
//       setUsers(res.data);
//     } catch (err) {
//       console.error("Failed to fetch users");
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

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
        
        <div className="flex flex-row py-1 mb-4 items-center gap-2"><p className="mt-4 text-sm py-1">Already have an account?</p>
        <Link className="text-green-500 font-bold mt-4 text-sm" to="/login">Sign in</Link>
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
          > {loading ? 'Signing up...' : 'Sign Up'}</button>
        {error && <p className="mb-3 text-red-500">{error}</p>}
      </form>

      {/* <div className="flex flex-row bg-gray-100 p-2 gap-4">
      <Link className="text-green-500 font-bold mt-4 text-xl" to="/dashboard">Dashboard</Link>
      <Link className="text-green-500 font-bold mt-4 text-xl" to="/second">Second</Link>
      </div> */}
    </div>
  );
}
