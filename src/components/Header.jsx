import React from 'react'

function Header() {
  return (
   <header className="bg-white shadow-md py-4 px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img src="/images/logo.png" alt="لوگو" className="h-10 w-10 object-contain" />
        <span className="text-2xl font-bold text-gray-800">تناژ</span>
      </div>
     
      <div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">ورود</button>
      </div>
    </header>
  )
}

export default Header
