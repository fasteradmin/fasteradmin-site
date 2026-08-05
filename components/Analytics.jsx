"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export const GTM_ID = "GTM-5P7H6PR5";
export const GA4_ID = "G-4ZHCZ4427C";
export const META_PIXEL_ID = "2899552250215243";

/**
 * Tracking stack, ported 1:1 from the Framer site.
 *
 * The reason this file exists as a component rather than a raw snippet:
 * Framer rendered the site as an SPA and only fired a pageview on the
 * initial hard load, so in-site navigation went untracked. Here we
 * explicitly re-fire GA4 and Meta pageviews on every route change.
 */
export default function Analytics() {
  const pathname = usePathname();
  const isFirstLoad = useRef(true);

  useEffect(() => {
    // The base snippets already fire a pageview on first load; only send
    // on subsequent client-side navigations to avoid double-counting.
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }

    const url = pathname + window.location.search;

    window.gtag?.("event", "page_view", {
      page_path: url,
      page_location: window.location.href,
      page_title: document.title,
    });

    window.fbq?.("track", "PageView");

    window.dataLayer?.push({ event: "pageview", page: url });
  }, [pathname]);

  return (
    <>
      <Script id="gtm" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
      </Script>

      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${GA4_ID}');`}
      </Script>

      {/*
        The browser warns "Duplicate Pixel ID" because the GTM container very
        likely fires this same pixel too. The guard below stops THIS snippet
        double-initialising, but it cannot stop GTM. Check whether the pixel
        is also configured as a GTM tag and remove it from one of the two,
        otherwise every PageView and Lead is counted twice.
      */}
      <Script id="meta-pixel" strategy="afterInteractive">
        {`if(!window.__faMetaPixelInit){window.__faMetaPixelInit=1;
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');}`}
      </Script>
    </>
  );
}

export function GtmNoScript() {
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
  );
}
