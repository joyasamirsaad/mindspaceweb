import Banner from '../../../components/Banner';
//import Card from '../../../components/Card';
//import { workData } from '../../../data/work';
import ProjectsList from '../../../components/Work';

export default function Work () {
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

            <div className="container mx-auto px-4 md:px-20 pb-20">
                <ProjectsList />
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
            </div>
            
        </div>
    );
}