import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ErrorBoundary } from "@/components/error-boundary";
import { ErrorMonitor } from "@/components/error-monitor";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/lib/auth-context";
import { FirestoreSync } from "@/lib/firestore-sync";
import { LayoutClient } from "@/components/layout/layout-client";
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
  metadataBase: new URL("https://gateee-electrical.web.app"),
  title: {
    default: "GATE EE 2027 Preparation Tracker & Syllabus Planner",
    template: "%s | GATE 2027 Tracker"
  },
  description: "Track your GATE 2027 Electrical Engineering preparation. Free syllabus tracker, daily study logger, mock test analytics, and GATE rank predictor.",
  keywords: [
    "GATE 2027",
    "GATE EE 2027",
    "GATE preparation tracker",
    "GATE Electrical Engineering syllabus",
    "GATE EE syllabus tracker",
    "GATE mock test analyzer",
    "GATE rank predictor",
    "IIT Madras GATE 2027",
    "GATE study logs",
    "GATE EE preparation website",
    "GATE EE 2027 study planner"
  ],
  authors: [{ name: "GATE EE Aspirant" }],
  creator: "GATE Tracker Team",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gateee-electrical.web.app",
    title: "GATE EE 2027 Prep Tracker & Syllabus Planner",
    description: "Track your GATE 2027 EE preparation with our interactive syllabus planner, study logs, and mock test analytics.",
    siteName: "GATE EE 2027 Tracker",
  },
  twitter: {
    card: "summary_large_image",
    title: "GATE EE 2027 Prep Tracker & Syllabus Planner",
    description: "An interactive tracker, planner, and analyzer for GATE EE 2027 aspirants.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        {/* SoftwareApplication schema — tells Google this is a free educational web app */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "GATE EE 2027 Preparation Tracker",
              "url": "https://gateee-electrical.web.app",
              "operatingSystem": "All",
              "applicationCategory": "EducationalApplication",
              "description": "An interactive syllabus tracker, study logger, mock test analyzer, and rank predictor for GATE 2027 Electrical Engineering exam preparation.",
              "offers": {
                "@type": "Offer",
                "price": "0.00",
                "priceCurrency": "INR"
              },
              "featureList": [
                "GATE syllabus topic-by-topic tracker",
                "Daily study logger with streak tracking",
                "Mock test score analyzer and error analysis",
                "GATE rank predictor and marks converter",
                "Subject weightage analysis (2022–2026)",
                "job recruitment tracker for electrical engineers",
                "COAP and CCMT counselling guide"
              ]
            })
          }}
        />
        {/* Organization schema — E-E-A-T signal for Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "GATE EE 2027 Tracker",
              "url": "https://gateee-electrical.web.app",
              "description": "Free all-in-one preparation tracker for GATE EE 2027 aspirants."
            })
          }}
        />
        {/* WebSite schema — helps Google understand site structure */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "GATE EE 2027 Tracker",
              "url": "https://gateee-electrical.web.app",
              "description": "Track your GATE 2027 Electrical Engineering preparation with a free interactive tracker."
            })
          }}
        />
        <ErrorMonitor />
        <ErrorBoundary>
          <ThemeProvider>
            <TooltipProvider>
              <AuthProvider>
                <FirestoreSync />
                <LayoutClient>{children}</LayoutClient>
              </AuthProvider>
            </TooltipProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
