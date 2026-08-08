import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Analytics, { GtmNoScript } from "@/components/Analytics";

export const metadata = {
  metadataBase: new URL("https://fasteradmin.com"),
  title: "FasterAdmin.com | Get the work done, without the hire you can't make",
  description:
    "We put AI where someone has to read something and decide, and reliable code everywhere else, so it keeps running after go-live.",
  openGraph: {
    title: "FasterAdmin.com | Get the work done, without the hire you can't make",
    description:
      "We put AI where someone has to read something and decide, and reliable code everywhere else, so it keeps running after go-live.",
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
