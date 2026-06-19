import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PRD Generator",
  description: "Create and export Product Requirements Documents as polished, print-ready PDFs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
