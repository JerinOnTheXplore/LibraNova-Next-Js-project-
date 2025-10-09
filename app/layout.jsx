import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import Footer from "@/components/Footer";
import ConditionalFooter from "@/components/ConditionalFooter";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generate by create next app",
};

export default function RootLayout({ children }) {
  return (
    
      <html lang="en">
       <AuthProvider>
        <body>
          <ThemeProvider>
          <Navbar />
          {children}
          <ConditionalFooter></ConditionalFooter>
        </ThemeProvider>
        </body>
        </AuthProvider> 
      </html>
    
  );
}
