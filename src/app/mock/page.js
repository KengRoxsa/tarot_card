import React from 'react'
import Link from 'next/link'

function Mock() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-indigo-800 text-white flex flex-col items-center justify-center p-4">
      {/* Main Content */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 max-w-md w-full text-center border border-white/20 shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-yellow-300">กำลังพัฒนา</h1>
        
        <div className="text-xl mb-8 animate-pulse">
          โปรดติดตามพัฒนาต่อไป
        </div>
        
        {/* Loading Animation */}
        <div className="flex justify-center mb-8">
          <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
        
        {/* Back Link */}
        <Link 
          href="/" 
          className="inline-block px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-purple-900 font-medium rounded-lg transition-colors duration-300"
        >
          กลับสู่หน้าดูดวง
        </Link>
      </div>
      
      {/* Footer Note */}
      <p className="mt-8 text-sm text-white/70">
        เว็บไซต์นี้อยู่ระหว่างการพัฒนา
      </p>
    </div>
  )
}

export default Mock