import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import AuthContextProvider from "@/context/auth-context";
import { QueryClientProvider } from "@/components/query-client-provider";

export const metadata: Metadata = {
  title: "Live Chat",
  description: "Live Chat",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <QueryClientProvider>
          <AuthContextProvider>{children}</AuthContextProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
