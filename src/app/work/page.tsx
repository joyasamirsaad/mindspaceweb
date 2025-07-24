"use client";

import { useEffect, useState } from 'react';
import Banner from '../../../components/Banner';
//import Card from '../../../components/Card';
//import { workData } from '../../../data/work';
import ProjectsList from '../../../components/Work';
import { useRouter } from 'next/navigation';
import { Project } from "../../../types/project";

export default function Work () {
    //await new Promise((resolve) => setTimeout(resolve, 3000));
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        async function fetchProjects() {
        const response = await fetch('https://hanzo.dxpshift.com/api/projects', { cache: 'no-store' });
        const data = await response.json();
        if (data.success) setProjects(data.data);
        }
        fetchProjects();
    }, []);
  
    {/*const response = await fetch('https://hanzo.dxpshift.com/api/projects', {
        cache: 'no-store',
    });
    const data = await response.json();
    const projects = data.success ? data.data : [];*/}

    /*search*/
    const [searchKeyword, setSearchKeyword] = useState('');
    const [searchError, setSearchError] = useState("");
    const router = useRouter();

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchKeyword(e.target.value);
        if (searchError) setSearchError("");
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const value = searchKeyword.trim();
            if (!value) return;  

            const match = projects.find(
            (p: Project) =>
                p.title?.toLowerCase().includes(value.toLowerCase()) ||
                p.description?.toLowerCase().includes(value.toLowerCase())
            );

            if (match) {
                router.push(`/project/${match.id}`);
            } 
            else {
                setSearchError("No matching project found.");
            }
        }
    };


    return (
        <div className='bg-black'>
            <Banner bannerText={[
                <>
                    here&apos;s a teeny-weeny<br />
                    glimpse of our work.<br />
                    what&apos;s coming later is,<br />
                    even greater
                </>
                ]} bgColor='black' textColor='white'>
            </Banner>

            <div className="container mx-auto px-4 md:px-20 pb-20" id="top">
                <div className="flex">
                    <div className="bg-gray-300 text-black rounded-lg min-w-40 flex items-center justify-start px-2 py-1 my-2 ml-auto">
                        <i className="fa-solid fa-magnifying-glass mr-2"></i>
                        <input type="text" placeholder="Search" className="cursor-pointer outline-none placeholder-black text-black" value={searchKeyword} onChange={handleSearch} onKeyDown={handleKeyDown}/>
                    </div>
                </div>

                {searchError && (
                    <div className="text-[#E74C3C] text-sm text-right mt-1">{searchError}</div>
                )}

                <ProjectsList projects={projects} />
                {/*<section className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-5">
                    {workData.map((work, index) => (
                        <Card
                            key={index}
                            imageUrl={work.imageUrl}
                            imageAlt={work.imageAlt}
                            title={work.title}
                            desc={work.desc}
                        />
                    ))}
                </section>*/}
                <div className="text-right">
                {/*<div className="border-l-2 mx-3 border-white h-5"></div>*/}
                <a href="#top" className="text-gray-300 hover:underline hover:text-white">Back to Top</a>
            </div>
            </div>
            
        </div>
    );
}