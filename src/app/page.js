'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  
  useEffect(() => {
    router.push('/login');
  }, [router]);
  
  return (
    // <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 via-blue-50/30 to-emerald-50/40">
    //   <div className="text-gray-500">Redirecting...</div>
    // </div>
    <></>
  );
}