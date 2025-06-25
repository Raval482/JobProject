"use client"

import React, { useEffect } from 'react'
import Navbar from '../../components/ui/header/Navbar'
import { useRouter } from 'next/navigation'

const layout = ({children}) => {
    const role = sessionStorage.getItem("role")
    const router = useRouter()
  
    useEffect(()=>{
          if(!role){
              router.push("/auth/login")
          }
    },[role])
  
  return (
    <div>
        <Navbar/>
        <div className='mt-14'>
          {children}
        </div>
    </div>
  )
}

export default layout