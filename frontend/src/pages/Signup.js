import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/images/signup.jpg';

function Signup() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simulating form submission and response
    setTimeout(() => {
      const success = Math.random() < 0.5; // Random success or failure
      if (success) {
        alert('Registration successful');
        navigate('/login');
      } else {
        setError('Username already taken');
      }
    }, 1000);
  };

  return (
    <div className="App flex justify-center items-center min-h-screen py-40 from-mycolour to-mycolour2 bg-gradient-115">
      <div className="container">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="flex">
          <div className="w-1/2 bg-register-image" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
            <div className="w-1/2 py-16 px-12">
              <h2 className="text-3xl text-center mb-4">Register</h2>
              <p className="mb-4 text-center">Create your account</p>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={userName}
                  className="border w-full border-gray-400 py-1 px-2 mb-5"
                  placeholder="Username"
                  required
                  onChange={(e) => setUserName(e.target.value)}
                />
          
                <input
                  type="email"
                  value={email}
                  className="border w-full border-gray-400 py-1 px-2 mb-5"
                  placeholder="Email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  value={pass}
                  className="border w-full border-gray-400 py-1 px-2 mb-5"
                  placeholder="Password"
                  required
                  onChange={(e) => setPass(e.target.value)}
                />
                <input
                  type="tel"
                  value={phone}
                  className="border w-full border-gray-400 py-1 px-2 mb-5"
                  placeholder="Phone Number"
                  required
                  onChange={(e) => setPhone(e.target.value)}
                />
                {error && <p className="text-red-500">{error}</p>}
                <button
                  type="submit"
                  className="border w-full bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
