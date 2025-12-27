"use client";

import { I18nextProvider } from "react-i18next";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

import i18n from "./i18n";

const InnerClientLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <I18nextProvider i18n={i18n}>
      <div className="page">
        <header>
          <Link href="/">
            <Image
              src="/img/t5mm-logo-dark-mode.svg"
              alt="T5MM Logo"
              width={81}
              height={24}
            />
          </Link>
        </header>
        <main className="main">
          {children}
        </main>
        <footer>
          <a href="/privacy-policy">Privacy policy</a>
        </footer>
      </div>
    </I18nextProvider>
  );
};

const ClientLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return <InnerClientLayout>{children}</InnerClientLayout>;
};

export default ClientLayout;
