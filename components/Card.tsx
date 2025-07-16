type CardProps = {
  imageUrl: string;
  imageAlt: string;
  title: string;
  desc: string;
};

export default function Card({ imageUrl, imageAlt, title, desc }: CardProps) {
  return (
    <div className="flex flex-col text-white overflow-hidden">
      <div className="relative w-full h-48 md:h-64 overflow-hidden">
        <img src={imageUrl} alt={imageAlt} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out hover:scale-115"></img>
      </div>
      <div className="p-4">
        <h1 className="text-md md:text-lg font-bold my-1">{title}</h1>
        <h3 className="text-sm md:text-md font-semibold">{desc}</h3>
      </div>
    </div>
  );
}
