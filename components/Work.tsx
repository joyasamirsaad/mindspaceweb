//"use client"
//import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Card from '../components/Card';

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
        {projects.map((project) => (
          <Link href={`/project/${project.id}`} className="cursor-pointer" key={project.id}>
            <Card
                key={project.id}
                imageUrl={project.image || "grayimg.jpg"}
                imageAlt={project.title}
                title={project.title}
                desc={project.description || "No description available"}
            />
          </Link>
            
        ))}
    </section>
  );
}

export default ProjectsList;
