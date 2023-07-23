import React, { useState, useEffect } from "react";
import Image from "next/image";
import IconImg from "../../src/app/ui/images/81910ddd-d139-4abc-89a6-a71f64701a26.svg";
import Cookies from "js-cookie";
import { AppContext } from "../../public/context/AppContext";
import { useContext } from "react";
import { useRouter } from "next/router"; // Update the import statement

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [photo, setPhoto] = useState(null);
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);
  const { setUser } = useContext(AppContext);
  const router = useRouter();

  useEffect(() => {
    // Your effect will run on initial render and whenever the dependencies change
  }, []); // Empty dependency array means it will only run on initial render

  const handleSignUp = async (e:any) => {
    e.preventDefault(); // Prevent the form from submitting in the default way

    // Validate the password to contain both letters and numbers
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must contain at least 8 characters, including letters and numbers."
      );
      return;
    }

    // Check if the passwords match
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }

    // Clear the password error if it was previously set
    setPasswordError("");

    try {
      const newUser = {
        name: firstName + " " + lastName,
        email,
        phoneNumber,
        DOB: birthdate,
        password,
        // Add any other fields you want to store in the database
      };

      const signupResponse = await fetch(
        "https://ephraim-iyanda.onrender.com/user/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        }
      );

      if (signupResponse.ok) {
        // Handle successful signup
        const userData = await signupResponse.json();
        console.log("Sign-up success:", userData);
        //login after signup
        handleLogin();
      } else {
        // Handle signup error
        console.error("Sign-up error:", await signupResponse.json());
      }
    } catch (error) {
      // Handle any other errors
      console.error("Sign-up error:", error);
    }
  };
  const handleLoginAfterSignUp = async (e:any) => {
    try {
       await handleSignUp(e); // Wait for handleSignUp to finish
      
        // If handleSignUp is successful, proceed with handleLogin
        handleLogin();
      
    } catch (error) {
      console.error("handleSignUp error:", error);
    }
  };
  const handleLogin = async ()=>{

    try{
      const LoggedInUser={
        password,
        heroName:email
      }
      const LoggedInRes = await fetch("https://ephraim-iyanda.onrender.com/user/login",{
        method:"POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(LoggedInUser),
      })
      if (LoggedInRes.ok) {
        // Handle successful signup
        const userData = await LoggedInRes.json();
        setUser(userData);
        Cookies.set('user', JSON.stringify(userData));
        router.push('/');
      }
      else{
        console.log("login-up error:", await LoggedInRes.json())
      }
    }catch (error) {
      // Handle any other errors
      console.error("Sign-up error:", error);
    }
    }

  const handleFileUpload = (event:any) => {
    const file = event.target.files[0];
    setPhoto(file);
  };

  return (
    <div className="w-[85%] m-auto h-[80%] p-4 flex">
      <form
        className="w-full sm:w-[400px] sm:m-auto flex flex-col gap-2"
        onSubmit={handleLoginAfterSignUp}
      >
        <div className="flex w-fit m-auto">
          <Image
            className="ml-auto mr-auto"
            src={IconImg}
            alt="icon"
            width={100}
          />
          <h1 className="w-fit mt-auto mb-auto text-3xl font-bold">Sign Up</h1>
        </div>
        <div className="flex gap-2">
          <label className="label">
            <input
              name="photo"
              className="p-2 bg-addPhoto bg-no-repeat"
              type="file"
              accept=".png, .jpg, .jpeg, .svg"
              onChange={handleFileUpload}
            />
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
        {passwordError && <p className="text-red-500">{passwordError}</p>} {/* Display password error message */}
        <input
          className="border border-black rounded-md bg-[#f0f5fa] w-full p-2"
          type="password"
          name="confirmPassword"
          placeholder="Confirm your password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button className="text-white bg-black p-2 rounded-md" type="submit"> 
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
