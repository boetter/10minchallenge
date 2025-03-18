import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '10 Min Challenge - Daglig AI træning',
  description: 'Sæt 10 minutter af i kalenderen hver dag til at træne dine AI færdigheder med daglige prompts',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="da" className={inter.className}>
      <head>
        {/* Inter font */}
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        
        {/* Base Meta Tags */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Favicon - Udfyld med din egen favicon-sti */}
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph / Facebook Meta Tags - Udfyld med dine egne oplysninger */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dinwebside.dk/" />
        <meta property="og:title" content="Her skal du skrive titel til sociale medier" />
        <meta property="og:description" content="Her skal du skrive en kort, fængende beskrivelse til sociale medier" />
        <meta property="og:image" content="https://dinwebside.dk/social-share-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="da_DK" />
        <meta property="og:site_name" content="10 Min Challenge" />
        
        {/* Twitter Meta Tags - Udfyld med dine egne oplysninger */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://dinwebside.dk/" />
        <meta name="twitter:title" content="Her skal du skrive titel til Twitter/X" />
        <meta name="twitter:description" content="Her skal du skrive en kort, fængende beskrivelse til Twitter/X" />
        <meta name="twitter:image" content="https://dinwebside.dk/social-share-image.jpg" />
        <meta name="twitter:creator" content="@ditTwitterHandle" />
        
        {/* Canonical Link - Udfyld med din website URL */}
        <link rel="canonical" href="https://dinwebside.dk/" />
        
        {/* Andre SEO meta tags */}
        <meta name="author" content="Jacob Bøtter" />
        <meta name="robots" content="index, follow" />
      </head>
      <body>{children}</body>
    </html>
  );
}
