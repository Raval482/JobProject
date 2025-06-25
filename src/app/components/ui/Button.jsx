import React from 'react'

const Button = ({ className="bg-emerald-500 hover:bg-emerald-600 text-white", type, children ,...props}) => {
    return (
        <button className={`px-4 py-2 rounded ${className}`}  type={type} {...props}  >{children}</button>
    )
}

export default Button