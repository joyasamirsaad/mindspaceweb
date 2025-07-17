import { Metadata } from "next";

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
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
      images: seoImage ? [seoImage] : [],
    },
  };
}
