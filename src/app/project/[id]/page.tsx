"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Card from "../../../../components/Card";

interface Project {
  id: number;
  title: string;
  image: string | null;
  description: string | null;
  text?: string;
  client?: string;
  director?: string;
  agency?: string;
  cinematographer?: string;
}

export default function Project() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [project, setProject] = useState<Project | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);

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

  if (project === null) return <div className="flex justify-center items-center h-screen bg-black">
      <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
    </div>;

  if (!project) {
    return <div className="flex justify-center items-center h-screen bg-black text-white p-10">Project not found.</div>;
  }

  const prev = currentIndex && currentIndex > 0 ? projects[currentIndex - 1] : null;
  const next = currentIndex !== null && currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <div className="bg-black text-white">
      <div className="container mx-auto px-4 md:px-20 py-20">
        <div className="mb-6 flex flex-col items-center justify-center">
          <h1 className="text-2xl md:text-4xl font-bold mb-6">{project.title}</h1>
          <img src={project.image || "/grayimg.jpg"} alt={project.title} className="w-full md:max-w-3xl"/>
        </div>

        <div className="flex flex-col gap-2 mb-6">
          <p className="mb-4 text-center text-md md:text-lg"> {project.description || ""}</p>
          {project.text && <p>{project.text}</p>}
          {project.client && (<p><strong>Client:</strong> {project.client}</p>)}
          {project.director && (<p><strong>Director:</strong> {project.director}</p>)}
          {project.agency && (<p><strong>Agency:</strong> {project.agency}</p>)}
          {project.cinematographer && (<p><strong>Cinematographer:</strong> {project.cinematographer}</p>)}
        </div>

        <div className="flex justify-between items-center">
          {prev ? (
            <Link href={`/project/${prev.id}`} className="text-gray-300 hover:underline hover:text-white"><i className="fas fa-arrow-left text-sm"></i> {prev.title}</Link>
          ) : (
            <span></span>
          )}

          <Link href="/work" className="text-gray-300 hover:underline hover:text-white">Back to Work</Link>

          {next ? (
            <Link href={`/project/${next.id}`} className="text-gray-300 hover:underline hover:text-white">{next.title} <i className="fas fa-arrow-right text-sm"></i></Link>
          ) : (
            <span></span>
          )}
        </div>

        <div className="mt-10">
          <h2 className="text-xl md:text-2xl font-bold mb-4">Related Projects</h2>
          <section >
            <Swiper
              simulateTouch={true}
              onSwiper={setSwiper}
              spaceBetween={20}
              slidesPerView={3}
            >
              {projects
                .filter((relatedProject) => relatedProject.id !== project.id && relatedProject.id !== prev?.id && relatedProject.id !== next?.id)
                .slice(0, 3)
                .map((relatedProject) => (
                  <SwiperSlide key={relatedProject.id}>
                    <Link href={`/project/${relatedProject.id}`} key={relatedProject.id} className="cursor-pointer">
                      <Card
                        imageUrl={relatedProject.image || "grayimg.jpg"}
                        imageAlt={relatedProject.title}
                        title={relatedProject.title}
                        desc={relatedProject.description || "No description available"}
                      />
                    </Link>
                  </SwiperSlide>
                ))}
            </Swiper>
          </section>
        </div>
      </div>
    </div>
  );
}
