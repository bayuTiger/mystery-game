import React from "react";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/react";

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  title = "Mystery Game",
}) => (
  <div className="min-h-screen bg-gray-100">
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <main className="container mx-auto p-4">{children}</main>
    <Analytics />
  </div>
);

export default Layout;
