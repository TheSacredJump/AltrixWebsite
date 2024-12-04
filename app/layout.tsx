import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Altrix - Ambience AI for Underserved EHRs",
  description: "Altrix is high-quality medical software for underserved EHRs that takes advantege of robust AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-gradient-to-br bg-white dark:bg-black text-gray-900 dark:text-white transition duration-300 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
