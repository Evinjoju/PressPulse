import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.citizencorrespondent.com"),
  title: {
    default: "CitizenCorrespondent – Latest News & Breaking Stories 2025",
    template: "%s | CitizenCorrespondent",
  },
  description: "Stay instantly connected with breaking stories and live updates. From politics and technology to entertainment and beyond, we provide real-time coverage you can rely on. Your trusted source for reliable journalism.",
  keywords: [
    "breaking news",
    "latest news",
    "world news",
    "politics",
    "business news",
    "technology news",
    "health news",
    "finance news",
    "global affairs",
    "citizen correspondent",
    "news 2025",
    "current events",
    "news analysis",
    "journalism",
    "reliable news",
    "trusted journalism",
  ].join(", "),
  authors: [{ name: "CitizenCorrespondent" }],
  creator: "CitizenCorrespondent",
  publisher: "CitizenCorrespondent",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.citizencorrespondent.com",
    siteName: "CitizenCorrespondent",
    title: "CitizenCorrespondent – Latest News & Breaking Stories 2025",
    description: "Stay instantly connected with breaking stories and live updates. From politics and technology to entertainment and beyond, we provide real-time coverage you can rely on.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "CitizenCorrespondent – Latest News & Breaking Stories 2025",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CitizenCorrespondent – Latest News & Breaking Stories 2025",
    description: "Stay instantly connected with breaking stories and live updates. Your trusted source for reliable journalism.",
    images: ["/og-image.jpg"],
    creator: "@CitizenCorrespondent",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "https://www.citizencorrespondent.com",
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
