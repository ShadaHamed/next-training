"use client"

import { useState } from "react"
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";

const LoginForm = () => {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const formSubmitHandler = (e:React.FormEvent) => {
        e.preventDefault();
        if (email === "") return toast.error('email is required')
        if (password === "") return toast.error('password is required')

        // //store token in local storage; this can cause hydration error if used in client component
        // const jwtToken ="asjdlaskds"
        // window.localStorage.setItem("token", jwtToken)
        // //get token from local storage 
        // const tokenfromlocalstorage = window.localStorage.getItem("token")

        console.log({email,password})
        router.replace('/')      //not back navigation
        // router.push('/')        // with back navigation
    }
    return (
        <form onSubmit={formSubmitHandler} className='flex flex-col'>
            <input
            className="mb-4 border rounded p-2 text-xl" 
            type="email" 
            placeholder='Enter Your Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
             />
            <input
            className="mb-4 border rounded p-2 text-xl"
            type="password" 
            placeholder='Enter Your Password' 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <button type='submit' className='text-2xl text-white bg-blue-800 p-2 rounded-lg font-bold'>
            Login
            </button>
        </form>
  )
}

export default LoginForm