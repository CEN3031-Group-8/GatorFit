import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter } from 'next/font/google'

import "./globals.css";

// If loading a variable font, you don't need to specify the font weight
const IBMPlexMono = IBM_Plex_Mono({ 
  weight: ["100", "400" , "600" , "700"],
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${IBMPlexMono.className} antialiased bg-[#0B0B09] text-[#F3F7F0]`}
      >
        <div className="flex items-center justify-center bg-">
          <div className="max-w-screen-md w-full">
            {children}
          </div>
        </div>


      </body>
    </html>
  );
}
