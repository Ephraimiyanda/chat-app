import { useState } from "react";
import Login from "./login";
import SignUp from "./signUp";
const App = () => {
    const [isSignUpPage, setIsSignUpPage] = useState(true);
  
    return (
      <div className="bg-white h-full">
        {isSignUpPage ? <SignUp /> : <Login />}     
      <div className="w-fit m-auto">
      { isSignUpPage ?
       <div className="flex">
        <p>Already have an account ?  </p> <button onClick={() => setIsSignUpPage(false)}>Login</button></div>:
      <div className="flex"> <p>Dont have an account?</p> <button onClick={() => setIsSignUpPage(true)}>Sign Up</button></div>
        }
      </div>
      </div>
    );
  };
  
  export default App;