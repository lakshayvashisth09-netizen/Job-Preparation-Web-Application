import React from 'react'
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading,handleRegister } = useAuth();


  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle registration logic here
    await handleRegister({
      username,
      email,
      password
    });
    navigate("/login");

  }

  return (
     <main className="min-h-screen flex items-center justify-center bg-gray-100">
      
      <div className="bg-white p-8 rounded-lg shadow-md w-80">
        <h2 className="text-xl font-semibold mb-4 text-center">Register</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>

             <div className="flex flex-col">
            <label htmlFor="Username" className="text-sm mb-1">Username</label>
            <input
            onChange={(e) => setUsername(e.target.value)}
              type="text"
              id="Username"
              name="Username"
              className="border rounded-md px-3 py-2"
            />
          </div>
          
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm mb-1">Email</label>
            <input
            onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              name="email"
              className="border rounded-md px-3 py-2"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm mb-1">Password</label>
            <input
            onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              name="password"
              className="border rounded-md px-3 py-2"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="confirmPassword" className="text-sm mb-1">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword "
              className="border rounded-md px-3 py-2"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md 
transition-all duration-300 ease-in-out
hover:scale-105 hover:bg-blue-600 active:scale-95"
          >
            Register
          </button>
        </form>
        <p className="text-center text-sm text-gray-600">
          Already have an account? <button className="text-blue-500 hover:underline" onClick={() => navigate('/login')}>
            Login
          </button>
        </p>
      </div>

    </main>
  )
}

export default Register