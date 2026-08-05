import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Analytics, { GtmNoScript } from "@/components/Analytics";

export const metadata = {
  metadataBase: new URL("https://fasteradmin.com"),
  title: "FasterAdmin.com | Automating Repetitive Manual Tasks For Businesses",
  description:
    "Stop Letting Admin Tasks Steal Your Time. Automate it. Get Your Time Back. We connect your current tools into one smooth workflow that runs itself. No switching software needed.",
  openGraph: {
    title: "FasterAdmin.com | Automating Repetitive Manual Tasks For Businesses",
    description:
      "We connect your current tools into one smooth workflow that runs itself. No switching software needed.",
    url: "https://fasteradmin.com",
    siteName: "Faster Admin",
    type: "website",
  },
  icons: { icon: "/favicon.png" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <GtmNoScript />
        <Nav />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
