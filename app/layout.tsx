import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HLD Operations",
  description: "Hagerstown Light Department Operations Portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}