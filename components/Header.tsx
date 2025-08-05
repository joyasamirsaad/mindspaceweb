"use client";
import Link from 'next/link';
import { useEffect, useState, useTransition } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { useParams } from 'next/navigation';

export default function Header() {
    const params = useParams();
    const lang = params.lang as string;
    //const isRTL = lang === 'ar';

    const pathname = usePathname();
    const router = useRouter();
    //const [isPending, startTransition] = useTransition();
    //const normalizePath = (path: string) => path.replace(/\/$/, "");
    const isActive = (href: string) => {
        const pathWithoutLocale = pathname.split('/').slice(2).join('/') || '';
        const hrefWithoutSlash = href.replace(/^\/+/, ''); // remove leading slash
        return pathWithoutLocale === hrefWithoutSlash;
    };

    const supportedLocales = ['en', 'ar'];
    const localeFromPath = pathname.split('/')[1];
    const [currentLocale, setCurrentLocale] = useState('en');

    // Update currentLocale whenever pathname changes
    useEffect(() => {
        const localeFromPath = pathname.split('/')[1];
        setCurrentLocale(supportedLocales.includes(localeFromPath) ? localeFromPath : 'en');
    }, [pathname]);

    const newLocale = currentLocale === 'en' ? 'ar' : 'en';

    const handleToggle = () => {
        const segments = pathname.split('/');
        segments[1] = newLocale; // replace locale
        const newPath = segments.join('/');
        router.push(newPath);
    };
    useEffect(() => {
        if (currentLocale === 'ar') {
            document.documentElement.setAttribute('dir', 'rtl');
            document.documentElement.setAttribute('lang', 'ar');
        } else {
            document.documentElement.setAttribute('dir', 'ltr');
            document.documentElement.setAttribute('lang', 'en');
        }
    }, [currentLocale]);

    const translations = {
        en: {
            home: "home",
            news: "news",
            work: "our work",
            services: "our services",
            contact: "contact us",
            more: "more",
            events: "events",
            playlists: "playlists",
            favorites: "favorites",
        },
        ar: {
            home: "الرئيسية",
            news: "الأخبار",
            work: "أعمالنا",
            services: "خدماتنا",
            contact: "اتصل بنا",
            more: "المزيد",
            events: "الفعاليات",
            playlists: "قوائم التشغيل",
            favorites: "المفضلة",
        },
    };

    const t = translations[currentLocale as "en" | "ar"]; 
    const isRTL = currentLocale === "ar";


    useEffect(() => {
        const hamburger = document.querySelector('.hamburger') as HTMLElement | null;
        const navMenu = document.querySelector('.navbar ul') as HTMLElement | null;
        const overlay = document.getElementById('menu-overlay');
        const dropdown = document.querySelector('.dropdown') as HTMLElement | null;
        const dropdownMenu = document.querySelector('.dropdown ul') as HTMLElement | null;

        if (!hamburger || !navMenu) return;
        if (!dropdown || !dropdownMenu) return;

        const toggleDropdown = () => {
            dropdown.classList.toggle('active');
            dropdownMenu.classList.toggle('active');
            gsap.fromTo(dropdownMenu, {
                opacity: 0,
                y: -20,
            }, {
                opacity: 1,
                y: 0,
                duration: 0.3,
                ease: "power3.out",
            });
        }
        const closeDropdown = () => {
            dropdown.classList.remove('active');
            dropdownMenu.classList.remove('active');
        }
        const dropLinks = document.querySelectorAll('.dropdown a');
        dropLinks.forEach(link => {
        link.addEventListener('click', closeDropdown);
        });

        dropdown.addEventListener('click', toggleDropdown);
        const toggleMenu = () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        overlay?.classList.toggle('active');
        const links = document.querySelectorAll(".navbar ul li");
            gsap.from(links, {
            duration: 0.5,
            x: 100,       
            opacity: 0,
            stagger: 0.1,
            ease: "power3.out"
        });
        if (navMenu.classList.contains('active')) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
        };

        const closeMenu = () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        overlay?.classList.remove('active');
        document.body.classList.remove('overflow-hidden');
        };

        // Toggle mobile menu on hamburger click
        hamburger.addEventListener('click', toggleMenu);
        overlay?.addEventListener('click', closeMenu);

        // Close menu when clicking on any navbar link
        const navLinks = document.querySelectorAll('.navbar a');
        navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
        });

        // Close menu when clicking outside hamburger and nav menu
        const handleClickOutside = (e: MouseEvent) => {
        if (!hamburger.contains(e.target as Node) && !navMenu.contains(e.target as Node)) {
            closeMenu();
        }

        if (!dropdown.contains(e.target as Node) && !dropdownMenu.contains(e.target as Node)) {
            closeDropdown();
        }
        };
        document.addEventListener('click', handleClickOutside);

        document.addEventListener('click', handleClickOutside);

        // Cleanup event listeners on unmount
        return () => {
        hamburger.removeEventListener('click', toggleMenu);
        overlay?.removeEventListener('click', closeMenu);
        navLinks.forEach(link => {
            link.removeEventListener('click', closeMenu);
        });
        document.removeEventListener('click', handleClickOutside);
        };
    }, []);


return (
    <div className="bg-black">
        <div id="menu-overlay" className="menu-overlay"></div>
        <header className="container mx-auto px-4 md:px-20">
            <div className="flex flex-row items-center justify-between"> {/*navbar*/}
                <div className="flex justify-start z-60">
                    <img className="logo" src="/logo.png" alt="job search logo"></img>
                </div>
                <nav className="navbar text-xl">
                    <div className="w-fit ml-auto">
                        <div className="hamburger ml-auto">
                            <span></span>
                            <span className="!w-5"></span>
                            <span></span>
                        </div>
    
                        <ul>
                            <li><Link href={`/${currentLocale}/`} className={isActive("/") ? "active-link" : ""}>{t.home}</Link></li>
                            <li><Link href={`/${currentLocale}/news`} className={isActive("/news") ? "active-link" : ""}>{t.news}</Link></li>
                            <li><Link href={`/${currentLocale}/work`} className={isActive("/work") ? "active-link" : ""}>{t.work}</Link></li>
                            <li><Link href={`/${currentLocale}/services`} className={isActive("/services") ? "active-link" : ""}>{t.services}</Link></li>
                            {/*<li><Link href={`/${currentLocale}/team`} className={isActive("/team") ? "active-link" : ""}>our team</Link></li>*/}
                            <li><Link href={`/${currentLocale}/contact`} className={isActive("/contact") ? "active-link" : ""}>{t.contact}</Link></li>
                            <li className="relative text-gray-300 hover:text-white dropdown z-70">
                                <span onClick={(e) => e.stopPropagation()} className="cursor-pointer flex items-center">
                                    {t.more}<i className={`fa-solid fa-chevron-down ${isRTL ? 'mr-1' : 'ml-1'} md:ml-1`}></i>
                                </span>
                                <ul className="absolute bg-black text-white rounded-md border-2 border-gray-300 md:mt-2">
                                    <li className="px-4 py-2"><Link href={`/${currentLocale}/events`}>{t.events}</Link></li>
                                    <li className="px-4 py-2"><Link href={`/${currentLocale}/playlist`}>{t.playlists}</Link></li>
                                    <li className="px-4 py-2"><Link href={`/${currentLocale}/favorites`}>{t.favorites}</Link></li>
                                </ul>
                            </li>
                            <li>
                                <div className="ml-6 flex items-center space-x-2">
                                    <span className="text-sm text-gray-300">EN</span>
                                    <button type='button'
                                        onClick={handleToggle}
                                        aria-label={`Switch language to ${currentLocale === 'ar'? 'English' : 'Arabic'}`}
                                        className={`w-14 h-7 flex items-center bg-[#3498DB] rounded-full p-1 transition-colors duration-300 ${
                                        currentLocale === 'ar' ? 'bg-[#E74C3C]' : 'bg-[#3498DB]'}`}>
                                        <div
                                            className={`w-5 h-5 bg-white rounded-full shadow-md transform duration-300 ${currentLocale === 'ar' ? 'right-1' : 'left-1'}`}>    
                                        </div>
                                    </button>
                                    <span className="text-sm text-gray-300">AR</span>
                                </div>
                            </li>

                        </ul>
                    </div>

                </nav>
            </div>
                
        </header>
    </div>
    
        
        
);
}