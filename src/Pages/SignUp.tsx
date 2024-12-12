import React, { useState } from 'react';

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Submitted', formData);
  };

  return (
    <div className="flex items-center justify-center bg-color-light p-5">
      <form 
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg tru"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>
        
        <div className="mb-4 tru">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-text-color-dark">Name</label>
          <input 
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4 tru">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-text-color-dark">Email</label>
          <input 
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4 tru">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-text-color-dark">Password</label>
          <input 
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        <button 
          type="submit"
          className="w-full p-3 bg-bg-button text-white rounded-md font-semibold cursor-pointer"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;