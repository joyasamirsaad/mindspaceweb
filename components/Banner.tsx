import { gsap, random } from "gsap";
import { SplitText } from "gsap/SplitText";
import { useEffect } from "react";

type BannerProps = {
  bannerText: React.ReactNode;
  bgColor?: string;
  textColor?: string;
};

export default function Banner({ bannerText, bgColor, textColor }: BannerProps) {
  useEffect(() => {
    gsap.registerPlugin(SplitText);

    // Wait for DOM to mount
    const element = document.querySelector(".text");
    if (!element) return;

    const split = SplitText.create(element, { type: "words" });

    gsap.from(split.words, {
      y: 100,
      autoAlpha: 0,
      stagger: {
        amount: 0.5,
        from: "random", 
      },
      ease: "power2.out"
    });

    return () => {
      split.revert(); // Clean up
    };
  }, []);
  
  return (
    <section className="banner" style={{ backgroundColor: bgColor, color: textColor }}>
      <div className="container mx-auto px-4 md:px-20 text-5xl text">
        <p>{bannerText}</p>
      </div>
    </section>
  );
}
