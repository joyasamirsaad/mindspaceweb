'use client';

import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import Banner from '../../components/Banner';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  image: string | null;
}

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  // Refs for GSAP animations
  const cardsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const selectedProjectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (fetch('https://hanzo.dxpshift.com/api/projects', { cache: 'no-store' })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setProjects(data.data);
          setSelectedIndex(0);
        }
      })
      .finally(() => setLoading(false)));
  }, []);

  // Animate cards when displayedProjects changes
  useEffect(() => {
    if (cardsRef.current && cardsRef.current.length > 0) {
      gsap.fromTo(
        '.box',
        { y: 100, opacity: 0 }, // start lower and slightly faded
        {
          scrollTrigger: '.box', // start animation when ".box" enters the viewport
          duration: 0.7,
          y: 0, // moves up to its original position
          //y: -40, // moves up by 100px total (from 60 to -40)
          opacity: 1,
          ease: 'power3.out',
        }
      );
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out' }
      );
    }
  }, [projects, selectedIndex]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const totalProjects = projects.length;
  const startIndex = selectedIndex !== null ? selectedIndex + 1 : 0;

  let displayedProjects = projects.slice(startIndex, startIndex + 3);

  if (displayedProjects.length < 3) {
    displayedProjects = [
      ...displayedProjects,
      ...projects.slice(0, 3 - displayedProjects.length),
    ];
  }


  const selectedProject = selectedIndex !== null ? projects[selectedIndex] : null;

  return (
    <div className="bg-black text-white text-center">
      <div className="container mx-auto px-4 md:px-20 py-20">
        <Banner bannerText={[
            <>
              This is just the beginning.<br />
              We’re just getting started—<br />
              what’s ahead is smarter, bolder,<br />
              and built to make a difference.
            </>
            ]} bgColor='black' textColor='white'>
        </Banner>

        <h1 className="text-2xl md:text-4xl font-bold mb-6 flex items-center justify-center">Featured Work</h1>
        <div className="text-right"><Link href="/work" className="text-gray-300 hover:underline hover:text-white">All Work </Link><i className="fa-solid fa-arrow-up-right-from-square"></i></div>
        <section className="grid grid-cols-8 gap-4 mt-5 box">
          <div className="flex flex-col items-center col-span-2">
            {displayedProjects.map((project, idx) => (
              <button
                key={project.id}
                ref={el => { cardsRef.current[idx] = el; }}
                className="cursor-pointer w-full h-40 md:h-50 overflow-hidden mb-4"
                onClick={() => {
                  const nextIndex =
                    selectedIndex !== null
                      ? (selectedIndex + idx + 1) % projects.length
                      : idx;
                  setSelectedIndex(nextIndex);
                }}
              >
                <div className="w-full h-full bg-cover bg-center flex items-center justify-center transition-transform duration-1000 ease-out hover:scale-110" style={{ backgroundImage: `url(${project.image || '/grayimg.jpg'})` }}>
                  <h2 className="text-sm font-semibold">{project.title}</h2>
                </div>
              </button>
            ))}
          </div>

          <div className="col-span-6 flex items-center justify-center">
            {selectedProject ? (
              <div
                ref={selectedProjectRef}
                className="w-full h-[40%] md:h-[70%] overflow-hidden"
              >
                <SelectedProjectDisplay
                  key={selectedProject.id}
                  image={selectedProject.image}
                  title={selectedProject.title}
                />
              </div>
            ) : (
              <p className="text-gray-400 italic">Click on a project</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

// Component for animating selected project display
function SelectedProjectDisplay({ image, title }: { image: string | null; title: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }
      );
    }
  }, [image, title]);
  return (
    <div ref={containerRef} className="w-full h-full bg-cover bg-center flex items-center justify-center transition-transform duration-1000 ease-out hover:scale-110" style={{ backgroundImage: `url(${image || '/grayimg.jpg'})` }}>
      <h2 className="text-2xl font-semibold">{title}</h2>
    </div>
  );
}