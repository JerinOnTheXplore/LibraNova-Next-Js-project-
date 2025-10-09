"use client";
import { usePathname } from "next/navigation";
import Footer from "./Footer";


export default function ConditionalFooter({ children }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <>
      {children}
      {!isDashboard && <Footer />}
    </>
  );
}
