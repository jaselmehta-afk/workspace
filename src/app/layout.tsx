import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import PageTransition from "@/components/PageTransition";
import { FavouritesProvider } from "@/context/FavouritesContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { CompareProvider } from "@/context/CompareContext";
import CompareBar from "@/components/CompareBar";
import FloatingCTA from "@/components/FloatingCTA";

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

// Inline script to set data-theme before first paint — prevents flash
const themeScript = `
  try {
    var t = localStorage.getItem('ws_theme');
    if (!t) t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', t);
  } catch(e) {}
`.trim();

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Blocking theme script — must be first to avoid FOUC */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,400;12..96,500;12..96,600;12..96,700&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
        <ThemeProvider>
          <FavouritesProvider>
          <CompareProvider>
            <CustomCursor />
            <Navigation />
            <PageTransition>
              <main>{children}</main>
            </PageTransition>
            <Footer />
            <CompareBar />
            <FloatingCTA />
          </CompareProvider>
          </FavouritesProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
