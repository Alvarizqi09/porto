import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { QueryProvider } from "./providers";
import BackgroundBlobs from "@/components/BackgroundBlobs";
import { ThemeProvider } from "@/components/ThemeProvider";

const PageTransition = dynamic(
  () => import("@/components/transition/PageTransition"),
  { ssr: false }
);
const StairTransition = dynamic(
  () => import("@/components/transition/StairTransition"),
  { ssr: false }
);
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });

const JetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jetbrainsMono",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "Alvarizqi | Front-End Web Developer",
  description:
    "Welcome to Alvarizqi's portfolio! I'm a skilled Front-End Developer with expertise in React, Vue, Next.js, and Laravel, dedicated to crafting seamless and stunning web experiences.",
  keywords:
    "Front-End Developer, React, Vue, Next.js, Laravel, UI/UX Design, Web Developer Portfolio",
  authors: [{ name: "Alvarizqi" }],
  robots: "index, follow",
  openGraph: {
    title: "Alvarizqi | Front-End Web Developer",
    description:
      "Welcome to Alvarizqi's portfolio! I'm a skilled Front-End Developer with expertise in React, Vue, Next.js, and Laravel, dedicated to crafting seamless and stunning web experiences.",
    type: "website",
    url: "https://alvarizqi.com",
    images: [
      {
        url: "https://alvarizqi.com/assets/og-image.jpg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alvarizqi | Front-End Web Developer",
    description:
      "Welcome to Alvarizqi's portfolio! I'm a skilled Front-End Developer with expertise in React, Vue, Next.js, and Laravel, dedicated to crafting seamless and stunning web experiences.",
    images: ["https://alvarizqi.com/assets/twitter-image.jpg"],
  },
  icons: {
    icon: "/icon.ico?v=2",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
  themeColor: "#ffffff",
};

export default async function RootLayout({ children }) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${JetBrainsMono.variable} ${inter.variable}`}>
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://alvarizqi.com" />
      </head>
      <body className={`${inter.variable} ${JetBrainsMono.variable} font-primary relative`}>
        <ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light" enableSystem={false}>
          <QueryProvider>
            <NextIntlClientProvider messages={messages}>
              <BackgroundBlobs />
              <Header />
              <StairTransition />
              <main>
                <PageTransition>{children}</PageTransition>
              </main>
              <Footer />
              <Analytics />
              <SpeedInsights />
            </NextIntlClientProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
