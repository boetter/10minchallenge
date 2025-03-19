import './globals.css'
import Script from 'next/script'

export const metadata = {
  title: 'Daglig gratis AI-træning',
  description: 'Sæt 10 minutter af i kalenderen hver dag til at træne dine AI færdigheder med daglige prompts',
}

export default function RootLayout({ children }) {
  return (
    <html lang="da">
      <head>
        {/* Inter font */}
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        
        {/* Base Meta Tags */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph / Facebook Meta Tags - Udfyld med dine egne oplysninger */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dagligprompt.boetter.dk/" />
        <meta property="og:title" content="Gratis AI-træning af Jacob Bøtter" />
        <meta property="og:description" content="Sæt 10 minutter i kalenderen til daglig AI-træning" />
        <meta property="og:image" content="https://dagligprompt.boetter.dk/dark-project-app-screenshot.png" />
        <meta property="og:locale" content="da_DK" />
        <meta property="og:site_name" content="Daglig AI-træning" />
        
        
        {/* Canonical Link - Udfyld med din website URL */}
        <link rel="canonical" href="https://dagligprompt.boetter.dk/" />
        
        {/* Andre SEO meta tags */}
        <meta name="author" content="Jacob Bøtter" />
        <meta name="robots" content="index, follow" />
      </head>
      <body>
        {children}
        
        {/* Schema.org markup for Google - Bruger Next.js Script component for at undgå hydration fejl */}
        <Script id="schema-org" type="application/ld+json" strategy="afterInteractive">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Website",
              "name": "Daglig AI-træning",
              "url": "https://dagligprompt.boetter.dk/",
              "description": "Sæt 10 minutter i kalenderen til daglig AI-træning",
              "author": {
                "@type": "Person",
                "name": "Jacob Bøtter"
              }
            }
          `}
        </Script>
      </body>
    </html>
  )
}
