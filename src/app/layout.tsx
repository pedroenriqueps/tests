import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Testes",
  description: "testes em geral em nexts js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased bg-gray-900 text-white`}
      >
        {children}
      </body>
    </html>
  );
}
