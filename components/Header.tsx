"use client";
import Link from 'next/link';
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
    const pathname = usePathname();
    const normalizePath = (path: string) => path.replace(/\/$/, "");
    const isActive = (href: string) => normalizePath(pathname) === normalizePath(href);

    useEffect(() => {
        const hamburger = document.querySelector('.hamburger') as HTMLElement | null;
        const navMenu = document.querySelector('.navbar ul') as HTMLElement | null;
        const overlay = document.getElementById('menu-overlay');

        if (!hamburger || !navMenu) return;

        const toggleMenu = () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        overlay?.classList.toggle('active');
        overlay?.classList.remove('active');
        };

        const closeMenu = () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        };

        // Toggle mobile menu on hamburger click
        hamburger.addEventListener('click', toggleMenu);

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
        };
        document.addEventListener('click', handleClickOutside);

        // Cleanup event listeners on unmount
        return () => {
        hamburger.removeEventListener('click', toggleMenu);
        navLinks.forEach(link => {
            link.removeEventListener('click', closeMenu);
        });
        document.removeEventListener('click', handleClickOutside);
        };
    }, []);


return (
    <div className="bg-black">
        <header className="container mx-auto px-4 md:px-20">
            <div className="flex flex-row items-center justify-between"> {/*navbar*/}
                <div className="flex justify-start">
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
                            <li><Link href="/news" className={isActive("/news") ? "active-link" : ""}>news</Link></li>
                            <li><Link href="/work" className={isActive("/work") ? "active-link" : ""}>our work</Link></li>
                            <li><Link href="/services" className={isActive("/services") ? "active-link" : ""}>our services</Link></li>
                            <li><Link href="/team" className={isActive("/team") ? "active-link" : ""}>our team</Link></li>
                            <li><Link href="/contact" className={isActive("/contact") ? "active-link" : ""}>contact us</Link></li>
                            <li className="relative group text-gray-300 hover:text-white">
                                <span className="cursor-pointer flex items-center">
                                    more <i className="fa-solid fa-chevron-down ml-1"></i>
                                </span>
                                <ul className="absolute opacity-0 group-hover:opacity-100 group-hover:flex group-hover:flex-col right-0 bg-black rounded-md border-2 border-gray-300 mt-2 min-w-10 z-50">
                                    <li className="px-4 py-2"><Link href="/events">events</Link></li>
                                    <li className="px-4 py-2"><Link href="/playlist">playlists</Link></li>
                                    <li className="px-4 py-2"><Link href="/favorites">favorites</Link></li>
                                </ul>
                            </li>

                        </ul>
                    </div>

                </nav>
            </div>
                
        </header>
    </div>
    
        
        
);
}