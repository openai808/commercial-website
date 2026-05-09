import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "RE/MAX Commercial Philippines",
    template: "%s | RE/MAX Commercial Philippines",
  },
  description:
    "Connect with RE/MAX Commercial for commercial real estate services, investment, leasing, and property solutions across the Philippines.",
  icons: {
    icon: "/remax-black.png",
    apple: "/remax-black.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full min-w-0 flex-col">
        <Header />
        <div className="flex min-h-0 min-w-0 flex-1 flex-col">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
