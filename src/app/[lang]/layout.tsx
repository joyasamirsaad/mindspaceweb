import type { Metadata } from "next";
import Script from 'next/script';
import { Geist, Geist_Mono } from "next/font/google";
import "../../app//globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

{/*export const metadata: Metadata = {
  title: "MindSpace",
  description: "Marketing",
  icons: {
    icon: '/icon.ico',
  },
};*/}

export async function generateMetadata(): Promise<Metadata> {
  const res = await fetch('https://hanzo.dxpshift.com/api/page/home', { cache: 'no-store' });
  const json = await res.json();

  const seoTitle = json?.data?.seo_title;
  const seoDescription = json?.data?.seo_description;
  const seoImage = json?.data?.seo_image;

  return {
    title: seoTitle,
    description: seoDescription,
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      images: seoImage ? [{ url: seoImage }] : [],
    },
    twitter: {
      title: seoTitle,
      description: seoDescription,
      images: seoImage ? [seoImage] : [],
    },
  };
}


import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import CustomCursor from "../../../components/CustomCursor";

export default async function RootLayout({ children, params }: { children: React.ReactNode, params: { lang: string } }) {
  const { lang } = params;

  const response = await fetch('https://hanzo.dxpshift.com/api/settings', { cache: 'no-store' });
  const data = await response.json();

  const socialLinks = {
    instagram: data?.data?.social_media?.en?.Instagram || '#',
    linkedin: data?.data?.social_media?.en?.Linkedin || '#',
  };

  return (
    <html lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <head>
        <Script src="https://kit.fontawesome.com/9794455bd0.js" crossOrigin="anonymous" strategy="beforeInteractive"/>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <CustomCursor />
        <Header />
        <main>{children}</main>
        <Footer socialLinks={socialLinks} />
      </body>
    </html>
  );
}
