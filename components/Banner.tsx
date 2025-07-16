type BannerProps = {
  bannerText: React.ReactNode;
  bgColor?: string;
  textColor?: string;
};

export default function Banner({ bannerText, bgColor, textColor }: BannerProps) {
  return (
    <section className="banner" style={{ backgroundColor: bgColor, color: textColor }}>
      <div className="container mx-auto px-4 md:px-20 text-5xl">
        <p>{bannerText}</p>
      </div>
    </section>
  );
}
