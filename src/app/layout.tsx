"use client"

import "./globals.css";
import  QueryProvider from "./providers/ReactQueryProvider"
import { ToastContainer } from 'react-toastify';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={``}
      >
        <QueryProvider>
        {children}
        </QueryProvider>
         <ToastContainer />
      </body>
    </html>
  );
}
