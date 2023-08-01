import React, { useState, useEffect } from "react";
import Image from "next/image";
import IconImg from "../../src/app/ui/images/81910ddd-d139-4abc-89a6-a71f64701a26.svg";
import Cookies from "js-cookie";
import { AppContext } from "../../public/context/AppContext";
import { useContext } from "react";
import { useRouter } from "next/router"; // Update the import statement
import SpinningLoader from "@/app/ui/loaders/spinning-loader";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [photo, setPhoto] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loggedInUserData, setLoggedInUserData] = useState(null);
  const { setUser } = useContext(AppContext);
  const [loading,setLoading]=useState("idle");
  const [imagePreview, setImagePreview] = useState("");
  const router = useRouter();

  const handleImageUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', photo);
      formData.append("api_key", "743174149656362");
      formData.append("upload_preset","j1d4ychj")
      const uploadRes = await fetch('https://api.cloudinary.com/v1_1/dg0kdnwt1/auto/upload', {
        method: 'POST',
        body: formData,
      });
      const Pic = await uploadRes.json();
      if (Pic.url) {
        return Pic.secure_url;
      }
    } catch (error) {
      console.error('Image upload error:', error);
    }
  };
 
  const handleSignUp = async (e:any) => {
   
    e.preventDefault();
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
      let imageUrl ="";
 
      if(photo){
       imageUrl = await handleImageUpload();
      }else{
        imageUrl="https://th.bing.com/th/id/R.24b823241775b806d626d4a624f03dbf?rik=noe3cJUJEyhJjw&riu=http%3a%2f%2fwww.mrctemiscamingue.org%2fwp-content%2fuploads%2f2021%2f06%2fblank-profile-picture-973460_960_720-1-400x400.png&ehk=ITnmgofPuK7Ob7bTkCa7Vu3QKPrH21Ys2Rmrvtw%2bhPE%3d&risl=&pid=ImgRaw&r=0"
      }

      const newUser = {
        name:userName ,
        email,
        phoneNumber,
        DOB: birthdate,
        password,
        avatar:imageUrl
        // Add any other fields you want to store in the database
      };
      setLoading("loading")
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
        if(userData){
          setLoggedInUserData(userData)
        }
      } else {
        // Handle signup error
        console.error("Sign-up error:", await signupResponse.json());
      }
    } catch (error) {
      // Handle any other errors
      console.error("Sign-up error:", error);
    }
  };


  const handleLogin = async ()=>{

    try{
      const LoggedInUser={
        password,
        heroName:userName
      }
      setLoading("loading")
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
        setLoading("failed")
      }
    }catch (error) {
      // Handle any other errors
      
      console.error("Sign-up error:", error);
    }
    }

  useEffect(()=>{
  if(loggedInUserData ){
    handleLogin()
  }
 
},[loggedInUserData])


const handleFileUpload = (event: any) => {
  const file = event.target.files[0];
  setPhoto(file);
  // Create a temporary URL for image preview
  const filePreview = URL.createObjectURL(file);
  setImagePreview(filePreview);
};
 

  return (
    <div className="w-[85%] m-auto h-[80%] p-4 flex">
      <form
        className="w-full sm:w-[400px] sm:m-auto flex flex-col gap-2"
        onSubmit={handleSignUp}
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
        <div
          className="rounded-full border m-auto border-black overflow-hidden "
          style={{ width: "100px", height: "100px" }}
        >
          {!imagePreview ?  
        
          <label className="label m-auto ml-[28.8%] mt-[25%]">
          <input
              name="photo"
              className="p-2 bg-addPhoto bg-no-repeat "
              type="file"
              accept=".png, .jpg, .jpeg, .svg"
              onChange={handleFileUpload}
            />
          </label>
           :
            
              <Image src={imagePreview} alt="preview" width={100} height={100} />
            
          }
          </div>
        </div>
        <input
          className="border border-black rounded-md bg-[#f0f5fa] w-full p-2"
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter hero name"
          required
        />
        <input
          className="border border-black rounded-md bg-[#f0f5fa] w-full p-2 text-[#a09d9d]"
          type="date"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
          required        
        />
        <input
          className="border border-black rounded-md bg-[#f0f5fa] w-full p-2"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <input
          className="border border-black rounded-md bg-[#f0f5fa] w-full p-2"
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter your phone number"
          required
        />
        <input
          className="border border-black rounded-md bg-[#f0f5fa] w-full p-2"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />
        {passwordError && <p className="text-red-500">{passwordError}</p>} {/* Display password error message */}
        <input
          className="border border-black rounded-md bg-[#f0f5fa] w-full p-2"
          type="password"
          name="confirmPassword"
          placeholder="Confirm your password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button className={`text-white bg-black  p-1 h-10 rounded-md ${loading==="loading" && "cursor-none opacity-[85]"}`} type="submit"> 
          {loading==="idle"? "Sign Up":loading==="loading"?<SpinningLoader/>:loading==="failed"?"please try again":""}
        </button>
        {loading=="error" &&
          <p className="text-red-700">An error occured please try again or try to sign in if told account already exists</p>
        }
      </form>
    </div>
  );
};

export default SignUp;
