"use client";

import { I18nextProvider } from "react-i18next";
import Image from "next/image";
import Link from "next/link";

import i18n from "./i18n";
import { TrackingPlatformEnum, TrackingProvider } from "@t5mm-com/tracking";

const InnerClientLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <I18nextProvider i18n={i18n}>
      <div className="page">
        <header>
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a href="/">
            <Image
              src="/img/t5mm-logo-dark-mode.svg"
              alt="T5MM Logo"
              width={108}
              height={32}
            />
          </a>
        </header>
        <main className="main">{children}</main>
        <footer style={{ fontSize: ".9rem" }}>
          <div style={{ display: "flex", gap: ".75rem" }}>
            <Link href="/privacy-policy">Privacy policy</Link>
            <Link href="/advertise">Advertiser</Link>
          </div>
        </footer>
      </div>
    </I18nextProvider>
  );
};

const ClientLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <TrackingProvider
      value={{
        integrations: [
          {
            platform: TrackingPlatformEnum.Meta,
            pixel: {
              id: process.env.NEXT_PUBLIC_META_PIXEL_ID || "",
            },
          },
        ],
        capiEndpoint: process.env.NEXT_PUBLIC_API_HOST + `/track`,
        subdomainIndex: BigInt(0),
        ipEndpoint: process.env.NEXT_PUBLIC_API_HOST + "/ip",
        isEnabled: true, //isProdLike(),
        hasConsented: true,
      }}
    >
      <InnerClientLayout>{children}</InnerClientLayout>
    </TrackingProvider>
  );
};

export default ClientLayout;
