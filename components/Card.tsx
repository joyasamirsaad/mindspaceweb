type CardProps = {
  imageUrl: string;
  imageAlt: string;
  title: string;
  desc: string;
};

export default function Card({ imageUrl, imageAlt, title, desc }: CardProps) {
  return (
    <div className="flex flex-col text-white">
      <div className="w-full h-70 md:h-80 overflow-hidden">
        <img src={imageUrl} alt={imageAlt} className="inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out hover:scale-115"></img>
      </div>
      <div className="p-4">
        <h1 className="text-xl md:text-2xl font-bold my-1">{title}</h1>
        <h3 className="text-md md:text-lg font-semibold">{desc}</h3>
      </div>
    </div>
  );
}
