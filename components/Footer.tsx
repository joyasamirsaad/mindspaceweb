"use client";
import Link from 'next/link';
import { usePathname } from "next/navigation";

type FooterProps = {
  socialLinks: {
    instagram: string;
    linkedin: string;
  };
};

export default function Footer({ socialLinks }: FooterProps) {
    const pathname = usePathname();
    const normalizePath = (path: string) => path.replace(/\/$/, "");
    const isActive = (href: string) => normalizePath(pathname) === normalizePath(href);

    return(
        <div className=" bg-[#E74C3C] text-white">
            <footer className="grid grid-cols-1 md:grid-cols-10 gap-8 container mx-auto px-4 md:px-20 py-10">
                    <div className="col-span-2">
                        <h3 className="text-2xl mb-5">sitemap</h3>
                        <ul className="text-md font-semibold">
                            <li><Link href="/about" className={`${isActive("/about") ? "active-link" : ""} hov`}>about us</Link></li>
                            <li><Link href="/work" className={`${isActive("/work") ? "active-link" : ""} hov`}>our work</Link></li>
                            <li><Link href="/clients" className={`${isActive("/clients") ? "active-link" : ""} hov`}>our clients</Link></li>
                            <li><Link href="/team" className={`${isActive("/team") ? "active-link" : ""} hov`}>our team</Link></li>
                            <li><Link href="/contact" className={`${isActive("/contact") ? "active-link" : ""} hov`}>contact us</Link></li>
                        </ul>
                    </div>
                    <div className="col-start-3 col-span-2">
                        <h3 className="text-2xl mb-5">offices</h3>
                        <ul className="text-md font-semibold">
                            <li><Link href="#" className={`${isActive("/#") ? "active-link" : ""} hov`}>dubai, UAE</Link></li>
                            <li><Link href="#" className={`${isActive("/#") ? "active-link" : ""} hov`}>beirut, LEBANON</Link></li>
                            <li><Link href="#" className={`${isActive("/#") ? "active-link" : ""} hov`}>paris, FRANCE</Link></li>
                            <li><Link href="#" className={`${isActive("/#") ? "active-link" : ""} hov`}>cairo, EGYPT</Link></li>
                            <li><Link href="#" className={`${isActive("/#") ? "active-link" : ""} hov`}>riyadh, KSA</Link></li>
                        </ul>
                    </div>
                <div className="col-span-full md:col-start-8 md:col-span-2">
                    <h3 className="text-2xl mb-5">inquiries</h3>
                    <Link href="#" className={`${isActive("/#") ? "active-link" : ""} text-md font-semibold hov`}>briefme@mindspace-me.com</Link>
                </div>

                <div className="flex flex-row items-center col-span-full md:col-span-3">
                    <h1 className="text-4xl">mindspace</h1>
                    <div className="border-l-2 mx-5 border-white h-full"></div>
                    <div className="flex flex-row gap-3 text-4xl">
                        <Link href={socialLinks.instagram} aria-label="instagram" target="_blank">
                            <i className="fab fa-instagram hov" />
                        </Link>
                        <Link href={socialLinks.linkedin} aria-label="linkedin" target="_blank">
                            <i className="fab fa-linkedin-in hov" />
                        </Link>
                    </div>
                </div>
                <div className="flex flex-row items-center col-span-full md:col-start-9 md:col-span-2 whitespace-nowrap">
                    <Link href="/privacy" className={`${isActive("/#") ? "active-link" : ""} text-md hov`}>privacy policy</Link>
                    <div className="border-l-2 mx-3 border-white h-5"></div>
                    <Link href="/terms" className={`${isActive("/#") ? "active-link" : ""} text-md hov`}>terms of condition</Link>
                </div>
            </footer>
        </div>
        
    );
}