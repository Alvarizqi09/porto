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
  title: "Alvarizqi",
  description: "Hallo everyone!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/Logo.png" type="image/png" />
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
