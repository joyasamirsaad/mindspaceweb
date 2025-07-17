type CardProps = {
  imageUrl: string;
  imageAlt: string;
  title: string;
  desc: string;
  text?: string;
  isNews?: boolean;
};

export default function Card({ imageUrl, imageAlt, title, desc, text, isNews  }: CardProps) {
  return (
    <div className="flex flex-col text-white">
      <div className={`overflow-hidden ${isNews ? 'w-[50%] h-80 md:h-90' : 'w-full h-70 md:h-80'}`}>
        <img src={imageUrl} alt={imageAlt} className={`inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out ${isNews ? '' : 'hover:scale-115'}`}></img>
      </div>
      <div className="p-4">
        <h1 className="text-xl md:text-2xl font-bold my-1">{title}</h1>
        <h3 className={`text-md md:text-lg font-semibold ${isNews ? 'text-gray-400' : ''}`}>{desc}</h3>
        {text && (
          <p className="mt-8 text-gray-400 text-lg" dangerouslySetInnerHTML={{ __html: text }} />
        )}

      </div>
    </div>
  );
}
