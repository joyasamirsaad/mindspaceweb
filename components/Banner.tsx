type BannerProps = {
  bannerText: string[];
  bgColor?: string;
  textColor?: string;
};

export default function Banner({ bannerText, bgColor, textColor }: BannerProps) {
  return (
    <section className="banner" style={{ backgroundColor: bgColor, color: textColor }}>
      <div className="container mx-auto px-4">
        {bannerText.map((line, index) => (
          <p className="text-5xl" key={index}>{line}</p>
        ))}
      </div>
    </section>
  );
}
