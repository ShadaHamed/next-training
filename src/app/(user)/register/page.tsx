import React from 'react'
import RegisterForm from './RegisterForm'
// import { redirect } from 'next/navigation'
// import { cookies } from 'next/headers'

const RegisterPage = () => {
  //if we don't use middleware we will write this
  // const token = cookies().get("jwtToken")?.value;
  // if(token) redirect("/")

  return (
    <section className='fix-height container m-5 px-7 flex items-center justify-center'>
      <div className='m-auto bg-white rounded-lg p-5 w-full lg:w-1/2 md:w-2/3'>
        <h1 className='text-3xl font-bold text-gray-800 mb-5'>Create New Account</h1>
        <RegisterForm />
      </div>

    </section>
  )
}

export default RegisterPage