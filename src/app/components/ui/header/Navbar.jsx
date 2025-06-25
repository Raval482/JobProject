'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import Button from '../Button'
import { useRouter } from 'next/navigation'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [userRole, setUserRole] = useState("user")
  const router = useRouter()

  useEffect(() => {
    const role = sessionStorage.getItem("role") || "user"
    setUserRole(role)
  }, [])

  const logout = () => {
    localStorage.clear()
    sessionStorage.clear()
    router.push("/")
  }

  const links = {
    user: [
      { name: "Home", href: "/user-page" },
      { name: "Profile", href: "/profile" },
      { name: "Your Application", href: "/user-page/myapply-job" },
    ],
    provider: [
      { name: "Home", href: "/provider-page" },
      { name: "Add Post", href: "/provider-page/create-job" },
      { name: "Profile", href: "/profile" },
    ],
    admin: [
      { name: "Home", href: "/admin-page" },
      { name: "Add Post", href: "/admin-page/create-job" },
      { name: "Profile", href: "/profile" },
      { name: "Pending Request", href: "/admin-page/panding-request" },
      { name: "My Job ", href: "/admin-page/my-job" },
    ]
  }

  const currentLinks = links[userRole] || []

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 bg-opacity-60 backdrop-blur-md border-b border-white/40 shadow-md text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <div className="text-2xl font-bold drop-shadow text-gray-900">🔥 JobPortal</div>

        <div className="hidden md:flex space-x-6 items-center">
          {currentLinks.map((link) => (
          
              <Link
                key={link.name}
                href={link.href}
                className="hover:text-blue-700 transition duration-300 font-medium"
              >
                {link.name}
              </Link>
          ))}
           <Button onClick={logout}  className='border rounded-lg cursor-pointer'>Logout</Button>
        </div>

        <div className="md:hidden flex items-center">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3 bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 bg-opacity-60 backdrop-blur-md border-t border-white/40">
          {currentLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="block font-medium text-gray-800 hover:text-blue-700"
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}

export default Navbar
