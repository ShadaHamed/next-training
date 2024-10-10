"use client"
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();
  return (
    <button onClick={() => router.back()}>
        {"<<"} Back to profile page
  </button> 
  )
}

export default BackButton