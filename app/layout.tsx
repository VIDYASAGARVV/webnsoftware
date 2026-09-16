import type { Metadata } from "next";
// import "./globals.css";

export const metadata: Metadata = {
  title: "WebnSoftware | Digital Studio",
  description: "Web development, AI videos and digital marketing."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}