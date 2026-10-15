import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n/context";
import { AuthProvider } from "@/lib/auth/context";
import { BRAND } from "@/lib/brand";

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: `${BRAND.name} — ${BRAND.primaryTagline}`,
  description: `${BRAND.secondaryTagline} A calm, intelligent, multilingual women's health education and care-navigation platform.`,
  icons: {
    icon: "/images/ritvya-logo.jpg",
    apple: "/images/ritvya-logo.jpg",
  },
  openGraph: {
    title: `${BRAND.name} — ${BRAND.primaryTagline}`,
    description: BRAND.description,
    images: [{ url: "/images/ritvya-logo.jpg", width: 1024, height: 1024, alt: BRAND.name }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#34213D",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jakartaSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#FFFDF9] text-[#29252F]">
        <AuthProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
