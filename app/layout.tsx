import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "All For One",
  description: "An all for one web app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="grid grid-cols-12 p-4 gap-4">
          <div className="col-span-2">
            <nav className="flex flex-col gap-1">
              <Link className="hover:underline" href={"/"}>Home</Link>
              <Link className="hover:underline" href={"/say-hello"}>Say Hello</Link>
              <Link className="hover:underline" href={"/adding-numbers"}>Adding Numbers</Link>
              <Link className="hover:underline" href={"/asking-questions"}>Asking Questions</Link>
              <Link className="hover:underline" href={"/greater-or-less"}>Greater or Less</Link>
              <Link className="hover:underline" href={"/mad-lib"}>Mad Lib</Link>
              <Link className="hover:underline" href={"/odd-or-even"}>Odd or Even</Link>
              <Link className="hover:underline" href={"/reverse-it-alphanumeric"}>Reverse It - Alphanumeric</Link>
              <Link className="hover:underline" href={"/reverse-it-numeric"}>Reverse It - Numeric</Link>
              <Link className="hover:underline" href={"/magic-8-ball"}>Magic 8 Ball</Link>
              <Link className="hover:underline" href={"/restaurant-picker"}>Restaurant Picker</Link>
            </nav>
          </div>
          <div className="col-span-10">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
