import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Loader from "@/components/ui/Loader";
import Providers from "@/components/ui/Providers";

export const metadata: Metadata = {
  title: "Craft Verse – Build. Create. Explore.",
  description: "Creative platform for DIY kits, custom projects, 3D printing, and custom clothes.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <Providers>
          <Loader />
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                fontFamily: "'DM Sans', sans-serif",
                borderRadius: "14px",
                background: "rgba(255,255,255,0.95)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(139,92,246,0.15)",
                color: "#1a1a2e",
                boxShadow: "0 8px 32px rgba(139,92,246,0.15)",
              },
              success: { iconTheme: { primary: "#8b5cf6", secondary: "#fff" } },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
