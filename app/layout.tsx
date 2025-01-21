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
  title: "Altrix - Your Nurse Units, with Superpowers",
  description: "Altrix integrates with your existing EHR to save nurses 3 hours a day on administrative work. The platform allows nurses to automaticlly chart interactions with patients and pull patient information in real-time through natural language.",
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
