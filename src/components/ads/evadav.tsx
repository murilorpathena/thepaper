"use client";

import { useEffect } from "react";

export function EvadavPush() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//your-evadav-push-script.com/push.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
}

export function EvadavPopunder({ children }: { children: React.ReactNode }) {
  return (
    <div
      onClick={() => {
        // TODO: EVADAV popunder trigger
      }}
    >
      {children}
    </div>
  );
}

export function AdSenseBanner({
  slot,
  format = "auto",
  className,
}: {
  slot: string;
  format?: string;
  className?: string;
}) {
  useEffect(() => {
    try {
      // @ts-expect-error — AdSense global
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {}
  }, []);

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}