import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Workspace — Flexible, Inspiring Space To Grow Your Business",
  description: "60+ beautiful, characterful buildings across London. Flexible contracts, customisable spaces, and a thriving community of London's brightest businesses.",
  keywords: "office space London, flexible offices, coworking London, meeting rooms London, private offices London",
  openGraph: {
    title: "Workspace — Space to Grow",
    description: "Flexible, inspiring office space across 60+ London buildings.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,700;1,9..144,300;1,9..144,400&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
