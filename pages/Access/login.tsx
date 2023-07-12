import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import useFetch from "../../public/fetch/userfetch";
import { AppContext } from "../../public/context/AppContext";
import Cookies from "js-cookie";
import Image from "next/image";
import IconImg from "../../src/app/ui/images/81910ddd-d139-4abc-89a6-a71f64701a26.svg"


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { user } = useFetch(`http://localhost:5000/users/0`);
  const handleLogin = () => {
    Cookies.set('user', JSON.stringify(user));
    router.push('/');
  };

  const Logout = () => {
    Cookies.remove('user');
  };

  return (
    <div className='w-[85%] m-auto h-[50%] p-4 flex'>
      <form className='w-full sm:w-[400px] sm:m-auto flex flex-col gap-2 sm:mt-[10%] mt-[30%]'>
        <div className='flex w-fit m-auto'>
          <Image className='ml-auto mr-auto' src={IconImg} alt='icon' width={100} />
          <h1 className='w-fit m-auto text-xl'>Login</h1>
        </div>
        <input
          className='border border-black rounded-md bg-[#f0f5fa] w-full p-2'
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Enter your email'
        />

        <input
          className='border border-black rounded-md bg-[#f0f5fa] w-full p-2'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Enter your password'
        />

        <button className='text-white bg-black p-2 rounded-md' type='button' onClick={handleLogin}>
          Login
        </button>
        <button className='bg-red-500' onClick={Logout}>
          Logout
        </button>
      </form>
    </div>
  );
};

export default Login;