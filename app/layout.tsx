import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const poppins = Poppins({
  variable: "--font-poppins-loaded",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "RE/MAX Commercial Philippines",
    template: "%s | RE/MAX Commercial Philippines",
  },
  description:
    "Connect with RE/MAX Commercial for commercial real estate services, investment, leasing, and property solutions across the Philippines.",
  icons: {
    icon: "/remax-ico.ico.png",
    apple: "/remax-ico.ico.png",
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
      className={`${poppins.variable} h-full font-sans antialiased`}
    >
      <body className="flex min-h-full min-w-0 flex-col font-sans">
        <Header />
        <div className="flex min-h-0 min-w-0 flex-1 flex-col">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
