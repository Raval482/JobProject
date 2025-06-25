import { NextResponse } from 'next/server'
import { verifyToken } from '../lib/utils/jwt'

export async function middleware(request) {


  const token =   request.cookies.get('token')?.value || request.headers.get("authorization")

  if (!token) {
    return NextResponse.next()
  }

  try {
    const user = await verifyToken(token) 

    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-user-id', user.id)
    requestHeaders.set('x-user-role', user.role)
    requestHeaders.set('x-user-email', user.email)

  

    const response = NextResponse.next({
      request: {
        headers: requestHeaders
      }
    })

    return response
  } catch (err) {
    console.log('Invalid token in middleware:', err)
    return NextResponse.next()
  }
}

export const config = {
  matcher: ['/api/v1/:path*'] // Apply only on API routes
}


