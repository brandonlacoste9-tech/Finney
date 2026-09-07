import type { Metadata } from "next";
import "./globals.css";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL("https://construction-finney-preview.netlify.app"),
  title: "Construction Finney · Montreal plastering (preview)",
  description:
    "Preview rebuild of Construction Finney, a Montreal family business for artistic, ornamental and architectural plastering. Not live on constructionfinney.ca.",
  robots: { index: false, follow: false },
  icons: { icon: SITE.favicon },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,560;9..144,600&family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
