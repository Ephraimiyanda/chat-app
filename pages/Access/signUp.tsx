import React, { useState } from "react";
import Image from "next/image";
import IconImg from "../../src/app/ui/images/81910ddd-d139-4abc-89a6-a71f64701a26.svg"

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [photo, setPhoto] = useState(null);

  const handleSignUp = () => {
    // Perform sign-up logic here
    console.log("Sign-up:", email, password, firstName, lastName, birthdate, phoneNumber, photo);
  };

  const handleFileUpload = (event:any) => {
    const file = event.target.files[0];
    setPhoto(file);
  };

  return (
    <div className="w-[85%] m-auto h-[80%] p-4 flex">
      <form className="w-full sm:w-[400px] sm:m-auto flex flex-col gap-2">
        <div className="flex w-fit m-auto">
        <Image
        className="ml-auto mr-auto"
        src={IconImg}
        alt="icon"
        width={100}
        />
        <h1 className="w-fit mt-auto mb-auto text-xl">Sign Up</h1>
        </div>
        
        <h2 className="text-2xl">Register to get started.</h2>
        <p className="text-[#a09d9d]">Please enter the details below</p>
        <div className="flex gap-2">
          <label className="label">
            <input
              name="photo"
              className="p-2 bg-addPhoto bg-no-repeat bg-blue-500"
              type="file"
              accept=".png, .jpg, .jpeg, .svg"
              onChange={handleFileUpload}
            />
            <span></span>
            <p className="w-max ml-8">Upload a photo</p>
          </label>
        </div>
        <input
          className="border border-black rounded-md bg-[#f0f5fa] w-full p-2"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Enter first name"
        />
        <input
          className="border border-black rounded-md bg-[#f0f5fa] w-full p-2"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Enter last name"
        />
        <input
          className="border border-black rounded-md bg-[#f0f5fa] w-full p-2 text-[#a09d9d]"
          type="date"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
        />
        <input
          className="border border-black rounded-md bg-[#f0f5fa] w-full p-2"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
        <input
          className="border border-black rounded-md bg-[#f0f5fa] w-full p-2"
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter your phone number"
        />
        <input
          className="border border-black rounded-md bg-[#f0f5fa] w-full p-2"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
        <input
          className="border border-black rounded-md bg-[#f0f5fa] w-full p-2"
          type="password"
          placeholder="Confirm your password"
        />
        <button className="text-white bg-black p-2 rounded-md" type="button" onClick={handleSignUp}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
