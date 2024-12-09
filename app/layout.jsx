import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import PageTransition from "@/components/PageTransition";
import StairTransition from "@/components/StairTransition";
import Footer from "@/components/Footer";

const JetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
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
};

export const viewport = "width=device-width, initial-scale=1.0";

export const themeColor = "#ffffff";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={JetBrainsMono.variable}>
      <head>
        <meta name="viewport" content={viewport} />
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="author" content={metadata.author} />
        <meta name="robots" content={metadata.robots} />
        <meta name="theme-color" content={themeColor} />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://alvarizqi.com" />
        <meta
          property="og:image"
          content="https://alvarizqi.com/assets/og-image.jpg"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta
          name="twitter:image"
          content="https://alvarizqi.com/assets/twitter-image.jpg"
        />
        <link rel="icon" href="/favicon.ico?v=2" type="image/png" />

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
