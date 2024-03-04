"use client"


import { useRouter } from 'next/navigation';
import { useEffect } from "react";



export default function Home() {
  const router = useRouter();


  useEffect(() => {
  
    router.push('/authentication');
  }, []);


  return (
    <div className=" flex items-center justify-center">
      <p>Redirecting...</p>
    </div>
    
  );
}
