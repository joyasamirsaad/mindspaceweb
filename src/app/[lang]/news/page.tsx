import NewsList from '../../../../components/News'

export default async function News() {
    const response = await fetch('https://hanzo.dxpshift.com/api/page/news', {
        cache: 'no-store',
    });
    const data = await response.json();
    const news = data.success
        ? (data.data.sections).map((section : { title: string; details?: { id?:number; image?: string; cta_text?: string; text?: string } })=> ({
            title: section.title,
            id: section.details?.id,
            image: section.details?.image,
            ctaText: section.details?.cta_text,
            text: section.details?.text,
            }))
        : [];

    
    return (
        <section className="bg-black">
            <div className="container mx-auto px-4 md:px-20 py-20">
                <NewsList news={news} />
            </div>

        </section>
    );
}