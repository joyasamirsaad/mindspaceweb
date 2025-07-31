import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  i18n: {
    locales: ['en', 'ar'], // supported locales
    defaultLocale: 'en',   // default locale
    localeDetection: false, // optional: disables auto-detecting user locale
  },
};

export default nextConfig;
