import { useState } from "react";
import dynamic from "next/dynamic";

const Login = dynamic(() => import("./login"));
const SignUp = dynamic(() => import("./signUp"));

const App = () => {
  const [isSignUpPage, setIsSignUpPage] = useState(true);

  return (
    <div className="bg-white h-screen">
      <div className="pb-2">{isSignUpPage ? <SignUp /> : <Login />}</div>
      <div className="w-fit m-auto ">
        {isSignUpPage ? (
          <div className="flex gap-1">
            <p className="h-fit m-auto">Already have an account ? </p>
            <button
              className="p-2 bg-black text-white rounded-md"
              onClick={() => setIsSignUpPage(false)}
            >
              Login
            </button>
          </div>
        ) : (
          <div className="flex gap-1">
            <p className="h-fit m-auto">Dont have an account?</p>
            <button
              className="p-2 bg-black text-white rounded-md"
              onClick={() => setIsSignUpPage(true)}
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
