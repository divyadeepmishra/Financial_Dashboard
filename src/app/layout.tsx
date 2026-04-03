import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zoorvyn — Finance Dashboard",
  description:
    "A premium finance dashboard with real-time insights, transaction management, and smart analytics. Built with dark editorial luxury aesthetics.",
  keywords: ["finance", "dashboard", "analytics", "transactions", "insights"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${playfair.variable}`}>
      <body className="flex min-h-screen">
        <TooltipProvider>
          <Sidebar />
          <div className="flex flex-col flex-1 min-w-0">
            <Topbar />
            {children}
          </div>
        </TooltipProvider>
      </body>
    </html>
  );
}
