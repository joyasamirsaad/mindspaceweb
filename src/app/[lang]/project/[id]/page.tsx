"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Card from "../../../../../components/Card";
import { Project } from "../../../../../types/project";
import { useParams } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WhatsappShareButton, WhatsappIcon, FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon } from "react-share";
gsap.registerPlugin(ScrollTrigger);

{/*interface Project {
  id: number;
  title: string;
  image: string | null;
  description: string | null;
  text?: string;
  client?: string;
  director?: string;
  agency?: string;
  cinematographer?: string;
}*/}

export default function ProjectPage() {
  const params = useParams();
  const lang = params.lang as string;
  const isRTL = lang === 'ar';
  const url = typeof window !== 'undefined' ? window.location.href : '';

  const [showSocials, setShowSocials] = useState(false);
  
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [project, setProject] = useState<Project | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);
  const [atEnd, setAtEnd] = useState(false);
  const [atStart, setAtStart] = useState(true);

  const [windowReady, setWindowReady] = useState(false);
  useEffect(() => {
    setWindowReady(true);
  }, []);

  const [windowWidth, setWindowWidth] = useState(0);
  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const slideNext = () => {
      swiper?.slideNext();
  };
  const slidePrev = () => {
      swiper?.slidePrev();
  };

  const pathname = usePathname(); 
  const id = pathname.split("/").pop(); 

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`https://hanzo.dxpshift.com/api/projects`, {
        cache: "no-store",
      });
      const data = await response.json();
      const list = data.success ? data.data : [];
      setProjects(list);

      const index = list.findIndex((p: Project) => String(p.id) === id);
      setCurrentIndex(index);
      setProject(index !== -1 ? list[index] : null);
    }

    fetchData();
  }, [id]);

  useEffect(() => {
  if (swiper) {
    swiper.update();
  }
}, [swiper]);

useEffect(() => {
    cardsRef.current.forEach((el) => {
      if (el) {
        gsap.fromTo(
          el,
          { opacity: 0, scale: 0.8, zIndex: 1 },
          {
            opacity: 1,
            scale: 1,
            zIndex: 10,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    });
  }, [projects]);

  
  if (project === null) return <div className="flex justify-center items-center h-screen bg-black">
      <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
    </div>;

  if (!project) {
    return <div className="flex justify-center items-center h-screen bg-black text-white p-10">Project not found.</div>;
  }

  const prev = currentIndex && currentIndex > 0 ? projects[currentIndex - 1] : null;
  const next = currentIndex !== null && currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  const relatedProjects = projects
    .filter((relatedProject) => relatedProject.id !== project.id && relatedProject.id !== prev?.id && relatedProject.id !== next?.id)
    .slice(0, 3)


  return (
    <div className="bg-black text-white">
      <div className="container mx-auto px-4 md:px-20 py-20">
        {/*image*/}
        <div className="mb-6 flex flex-col items-center justify-center">
          <h1 className="text-2xl md:text-4xl font-bold mb-6">{project.title}</h1>
          <img src={project.image || "/grayimg.jpg"} alt={project.title} className="w-full md:max-w-3xl"/>
        </div>

        {/*info*/}
        <div className="flex flex-col gap-2 mb-6">
          <p className="mb-4 text-center text-md md:text-lg"> {project.description || ""}</p>
          {project.text && <p>{project.text}</p>}
          {project.client && (
            <p>
              <span className="relative group cursor-pointer">
              <strong>Client:</strong>
              <span className="ml-1">{project.client}</span>
              <span className="absolute left-45 top-0 min-w-60 sm:min-w-100 bg-gray-300 text-black text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity pointer-events-none z-10 flex flex-col items-center gap-2">
                <span className="absolute left-[-8px] top-2 border-t-8 border-b-8 border-r-8 border-t-transparent border-b-transparent border-r-gray-300"></span>
                <img src="/grayimg.jpg" alt="Client" className="w-10 h-10 rounded-full" />
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </span>
              </span>
            </p>
          )}
          {project.director && (<p><strong>Director:</strong> {project.director}</p>)}
          {project.agency && (<p><strong>Agency:</strong> {project.agency}</p>)}
          {project.cinematographer && (<p><strong>Cinematographer:</strong> {project.cinematographer}</p>)}
        </div>

      {/*buttons prev next*/}
        <div className="flex justify-between items-center">
          {prev ? (
            <Link href={`/${lang}/project/${prev.id}`} className="text-gray-300 hover:underline hover:text-white"><i className={`fas ${isRTL ? 'fa-arrow-right' : 'fa-arrow-left'} text-white text-sm`} /> {prev.title}</Link>
          ) : (
            <span></span>
          )}

          {next ? (
            <Link href={`/${lang}/project/${next.id}`} className="text-gray-300 hover:underline hover:text-white">{next.title} <i className={`fas ${isRTL ? 'fa-arrow-left' : 'fa-arrow-right'} text-white text-sm`} /></Link>
          ) : (
            <span></span>
          )}
        </div>
        
        {/*<div className="text-center"><button className="btn !bg-[#25D366] hover:!bg-white hover:!text-[#25D366]"
        onClick={() => {
          const currentUrl = encodeURIComponent(window.location.href);
          {/*const whatsappNumber = "96103776161";
          const message = `Check this out: ${currentUrl}`;
          {/*window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
          window.open(`https://wa.me/?text=${message}`, "_blank");
        }}
        >Share to Whatsapp<i className={`fa-brands fa-whatsapp ${isRTL ? 'mr-2' : 'ml-2'}`}></i></button></div>*/}

        <div className="flex flex-col md:flex-row items-center justify-center">
          <button className="btn" onClick={() => setShowSocials((prev) => !prev)}>
            <i className={`fa-regular fa-paper-plane text-[#fff8f0] ${isRTL ? 'ml-2' : 'mr-2'}`}></i>Share Project
          </button>
          <div className={`
          flex items-center gap-2 mb-2
          transition-all duration-500 ease-in-out
          overflow-hidden
          ${showSocials ? "max-w-[400px] ml-4" : "max-w-0 ml-0"}
        `}
        style={{ whiteSpace: "nowrap" }}>
            <WhatsappShareButton url={url} title={`Check this out!\n\n`}>
              <div className="flex items-center gap-2">
                <WhatsappIcon size={32} round />
                <span>WhatsApp</span>
              </div>
            </WhatsappShareButton>
            <FacebookShareButton url={url} title={`Check this out!\n\n`}>
              <div className="flex items-center gap-2">
                <FacebookIcon size={32} round />
                <span>Facebook</span>
              </div>
            </FacebookShareButton>
            <TwitterShareButton url={url} title={`Check this out!\n\n`}>
              <div className="flex items-center gap-2">
                <TwitterIcon size={32} round />
                <span>Twitter / X</span> 
              </div>
            </TwitterShareButton>
          </div>
        </div>

        <div className="text-center"><Link href="/work" className="text-gray-300 hover:underline hover:text-white">Back to Work</Link></div>

        <div className="mt-10">
          <h2 className="text-xl md:text-2xl font-bold mb-4">Related Projects</h2>
          <section>
            {windowReady && (
            <Swiper
              key={windowWidth}
              simulateTouch={true}
              onSwiper={setSwiper}
              spaceBetween={20}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 1, spaceBetween: 20 },
                768: { slidesPerView: 3, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 20 },
              }}
              onSlideChange={(swiper) => {
                setAtStart(swiper.isBeginning);
                setAtEnd(swiper.isEnd);
            }}
            onInit={(swiperInstance) => {
              setAtStart(swiperInstance.isBeginning);
              setAtEnd(swiperInstance.isEnd);
            }}
            >
              {relatedProjects
                .map((relatedProject, idx) => (
                  <SwiperSlide key={relatedProject.id}>
                    <Link href={`/project/${relatedProject.id}`} key={relatedProject.id} className="cursor-pointer">
                    <div ref={el => { cardsRef.current[idx] = el; }}>
                      <Card
                        imageUrl={relatedProject.image || "grayimg.jpg"}
                        imageAlt={relatedProject.title}
                        title={relatedProject.title}
                        desc={relatedProject.description || "No description available"}
                      />
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
            </Swiper>)}
            <div className="flex gap-4 justify-center md:hidden">
              <button
                  onClick={slidePrev}
                  aria-label="Previous slide"
                  disabled={atStart}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ease-in-out
                      ${atStart 
                      ? 'bg-gray-300 opacity-50 pointer-events-none cursor-not-allowed' 
                      : 'bg-[#d3d3d3] hover:bg-[#E74C3C]'
                      }`}
                  >
                  <i className="fas fa-arrow-left text-white text-sm"></i>
              </button>

              <button
                  onClick={slideNext}
                  aria-label="Next slide"
                  disabled={atEnd}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ease-in-out
                      ${atEnd 
                      ? 'bg-gray-300 opacity-50 pointer-events-none cursor-not-allowed' 
                      : 'bg-[#d3d3d3] hover:bg-[#3498DB]'
                      }`}
                  >
                  <i className="fas fa-arrow-right text-white text-sm"></i>
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
