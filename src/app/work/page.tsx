import Banner from '../../../components/Banner';
import Card from '../../../components/Card';
import { workData } from '../../../data/work';

export default function Work () {
    return (
        <div className='bg-black'>
            <Banner bannerText={[
                "here's a teeny-weeny", 
                "glimpse of our work.",
                "what's coming later is", "even greater"
                ]} bgColor='black' textColor='white'>
            </Banner>
            
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-5 container mx-auto px-4">
                {workData.map((work, index) => (
                    <Card
                        key={index}
                        imageUrl={work.imageUrl}
                        imageAlt={work.imageAlt}
                        title={work.title}
                        desc={work.desc}
                    />
                ))}
            </section>

        </div>
    );
}