'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Project {
  id: number;
  title: string;
  image: string | null;
}

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (fetch('https://hanzo.dxpshift.com/api/projects', { cache: 'no-store' })
      .then(response => response.json())
      .then(data => {
        if (data.success) setProjects(data.data);
      })
      .finally(() => setLoading(false)));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const displayedProjects = selectedIndex !== null
    ? projects.slice(selectedIndex + 1, selectedIndex + 4)
    : projects.slice(0, 3);

  const selectedProject = selectedIndex !== null ? projects[selectedIndex] : null;

  return (
    <div className="bg-black text-white text-center">
      <div className="container mx-auto px-4 md:px-20 py-20">
        <h1 className="text-2xl md:text-4xl font-bold mb-6 flex items-center justify-center">Featured Work</h1>
        <div className="text-right"><Link href="/work" className="text-gray-300 hover:underline hover:text-white">All Work </Link><i className="fa-solid fa-arrow-up-right-from-square"></i></div>
        <section className="grid grid-cols-8 gap-4 mt-5">
          <div className="flex flex-col items-center col-span-2">
            {displayedProjects.map((project, idx) => (
              <button key={project.id} className="cursor-pointer w-full h-40 md:h-50 overflow-hidden mb-4" onClick={() => setSelectedIndex(selectedIndex !== null ? selectedIndex + idx + 1 : idx)}> {/*+ previous selectedIndex to return to the global index in the array + idx to get the index of the current product % the original array +1 to get the next product*/}
                <div className="w-full h-full bg-cover bg-center flex items-center justify-center transition-transform duration-1000 ease-out hover:scale-110" style={{ backgroundImage: `url(${project.image || '/grayimg.jpg'})` }}>
                  <h2 className="text-sm font-semibold">{project.title}</h2>
                </div>
              </button>
            ))}
          </div>

          <div className="col-span-6 flex items-center justify-center">
            {selectedProject ? (
              <div className="w-full h-[40%] md:h-[70%] overflow-hidden">
                <div className="w-full h-full bg-cover bg-center flex items-center justify-center transition-transform duration-1000 ease-out hover:scale-110" style={{ backgroundImage: `url(${selectedProject.image || '/grayimg.jpg'})` }}>
                  <h2 className="text-2xl font-semibold">{selectedProject.title}</h2>
                </div>
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
