"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/header";

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isSignInPage = pathname.startsWith("/sign-in");

  return (
    <div>
      {!isSignInPage && <Header />}
      {children}
    </div>
  );
};

export default LayoutWrapper;
