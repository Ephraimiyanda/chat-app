import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch(`http://localhost:5000/users?email=${email} & password=${password}`);
      if (response.ok) {
        const data = await response.json();
        // Handle successful login, store user data or tokens
        console.log("Login successful:", data);
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="w-[85%] m-auto h-[50%] p-4 flex">
      <form className="w-full sm:w-[400px] sm:m-auto flex flex-col gap-2">
        <h1 className="w-fit m-auto text-xl">Login</h1>

        <input
          className="border border-black rounded-md bg-[#f0f5fa] w-full p-2"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />

        <input
          className="border border-black rounded-md bg-[#f0f5fa] w-full p-2"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />

        {error && <p className="text-red-500">{error}</p>}

        <button
          className="text-white bg-black p-2 rounded-md"
          type="button"
          onClick={handleLogin}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
