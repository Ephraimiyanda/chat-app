
import React, { useState } from "react";
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    // Perform sign-up logic here
    console.log("Sign-up:", email, password);
  };

  return (
    <div className=" w-[85%] m-auto h-[80%] p-4 flex">

      <form className="w-full sm:w-[400px] sm:m-auto flex flex-col gap-2">
      <h1  className="w-fit m-auto">Sign Up</h1>
      <h2 className=" text-2xl">Register to get started.</h2>
      <p className=" text-[#a09d9d]">please enter below details</p>
        <div className="flex gap-2">
        <label className="label">
        <input name="photo" className= "p-2 bg-addPhoto bg-no-repeat bg-blue-500 " type="file" accept=".png, .jpg, .jpeg,.svg" />
        <span></span>
        <p className=" w-max ml-8">upload a photo</p>
        </label>
        </div>
        <input className=" border border-black rounded-md bg-[#f0f5fa] w-full p-2" type="text" placeholder="Enter first name"/>
        <input className=" border border-black rounded-md bg-[#f0f5fa] w-full p-2" type="text" placeholder="Enter last name" />
        <input className=" border border-black rounded-md bg-[#f0f5fa] w-full p-2 text-[#a09d9d]" type="date" />
        <input className=" border border-black rounded-md bg-[#f0f5fa] w-full p-2"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
        <input className=" border border-black rounded-md bg-[#f0f5fa] w-full p-2" type="tel" placeholder="Enter your phone number"/>
        <input className=" border border-black rounded-md bg-[#f0f5fa] w-full p-2"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
        <input className=" border border-black rounded-md bg-[#f0f5fa] w-full p-2" type="password" placeholder="Confirm your password"/>
        <button className="text-white bg-black p-2 rounded-md" type="button" onClick={handleSignUp}>
          Sign Up
        </button>
      </form>
    </div>
  );
};
export default SignUp
