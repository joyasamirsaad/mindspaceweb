"use client";
import { useRef, useEffect } from 'react';
import Link from 'next/link';
import Card from '../components/Card';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  image: string | null;
  description: string  | null;
  text?: string;
  client?: string;
  director?: string;
  agency?: string;
  cinematographer?: string;
}

interface ProjectsListProps {
  projects: Project[];
}

function ProjectsList({ projects }: ProjectsListProps) {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

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

  //const [projects, setProjects] = useState<Project[]>([]);

  /*useEffect(() => {
    fetch('https://hanzo.dxpshift.com/api/projects') //fetch data from API 
      .then(response => response.json())  //convert to json
      .then(data => {
        if (data.success) {
          setProjects(data.data); //info are all in data array
        }
      })
      .catch(error => console.error('API error:', error));
  }, []);*/

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-5">
      {projects.map((project, idx) => (
        <Link href={`/project/${project.id}`} className="cursor-pointer" key={project.id}>
          <div ref={el => { cardsRef.current[idx] = el; }}>

            <Card
              key={project.id}
              imageUrl={project.image || "grayimg.jpg"}
              imageAlt={project.title}
              title={project.title}
              desc={project.description || "No description available"}
            />
          </div>
        </Link>
      ))}
    </section>
  );
}

export default ProjectsList;
