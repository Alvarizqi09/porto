import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import PageTransition from "@/components/PageTransition";
import StairTransition from "@/components/StairTransition";
import Footer from "@/components/Footer";

const JetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  Weight: [
    "100",
    "200",
    "300",
    "400",
    "400",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
  ],
  variable: "--font-jetbrainsMono",
});

export const metadata = {
  title: "Alvarizqi | Front-End Web Developer",
  description:
    "Welcome to Alvarizqi's portfolio! I'm a skilled Front-End Developer with expertise in React, Next.js, and Laravel, dedicated to crafting seamless and stunning web experiences.",
  keywords:
    "Front-End Developer, React Developer, Next.js, Laravel, UI/UX Design, Web Developer Portfolio",
  author: "Alvarizqi",
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1.0",
  themeColor: "#ffffff",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={JetBrainsMono.variable}>
      <head>
        {/* Metadata */}
        <meta name="viewport" content={metadata.viewport} />
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="author" content={metadata.author} />
        <meta name="robots" content={metadata.robots} />
        <meta name="theme-color" content={metadata.themeColor} />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://alvarizqi.com" />
        <meta
          property="og:image"
          content="https://alvarizqi.com/assets/images/og-image.jpg"
        />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta
          name="twitter:image"
          content="https://alvarizqi.com/assets/images/twitter-image.jpg"
        />

        {/* Favicon */}
        <link
          rel="icon"
          href="https://alvarizqi.com/assets/icons/favicon.ico"
          type="image/x-icon"
        />
        <title>{metadata.title}</title>
      </head>
      <body className={JetBrainsMono.variable}>
        <Header />
        <StairTransition />
        <PageTransition>{children}</PageTransition>
        <Footer />
      </body>
    </html>
  );
}
