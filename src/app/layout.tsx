import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Radio Cristo Unidos - Tu Estación de Fe y Esperanza",
  description:
    "Radio Cristo Unidos - Música cristiana, mensajes de fe y esperanza. Escúchanos en vivo y sé parte de nuestra comunidad.",
  keywords: [
    "Radio Cristo Unidos",
    "radio cristiana",
    "música cristiana",
    "fe",
    "esperanza",
    "@cristounidos",
  ],
  icons: {
    icon: "/radio-logo.png",
  },
  openGraph: {
    title: "Radio Cristo Unidos",
    description:
      "Tu estación de fe y esperanza. Música cristiana y mensajes inspiradores.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}