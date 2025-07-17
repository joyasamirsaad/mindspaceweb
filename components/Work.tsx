"use client"
import React, { useEffect, useState } from 'react';
import Card from '../components/Card';

interface Project {
  id: number;
  title: string;
  image: string | null;
  description: string  | null;
}

function ProjectsList() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    //fetch data from API 
    fetch('https://hanzo.dxpshift.com/api/projects')
      .then(response => response.json())  //convert to JSON
      .then(data => {
        if (data.success) {
          setProjects(data.data); // Use the `data` array from response
        }
      })
      .catch(error => console.error('API error:', error));
  }, []);

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-5">
        {projects.map((project) => (
            <Card
                key={project.id}
                imageUrl={project.image || "grayimg.jpg"}
                imageAlt={project.title}
                title={project.title}
                desc={project.description || "No description available"}
            />
        ))}
    </section>
  );
}

export default ProjectsList;
