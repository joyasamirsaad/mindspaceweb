'use client';

import React from "react";
import {
  Accordion,
  AccordionHeader,
} from "@material-tailwind/react";

type IconProps = {
  id: number;
  open: number;
};

function Icon({ id, open }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="#FFFFFF"
      className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}

export default function Services() {
  const [open, setOpen] = React.useState(1);

  const services = [
    {
      id: 1,
      title: "Anim inventore lorem elit sunt",
      content: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.",
    },
    {
      id: 2,
      title: "Laudantium tempor voluptate omnis",
      content: "Ut aperiam qui voluptatem accusantium perspiciatis nostrud in reprehenderit pariatur dolor in ea veniam? Rem voluptate unde dolor esse nisi labore est aliqua veniam magna ab inventore aute. Do id doloremque et iste duis deserunt ut architecto unde ipsum. Et proident architecto sint dolore quis dicta sit aperiam sunt ad; Cillum iste officia nulla perspiciatis fugiat ullamco ab consequat.",
    },
    {
      id: 3,
      title: "Sunt sed sunt laboris et mollit",
      content: "Nostrud elit et tempor eu explicabo sint amet id ut sed nulla ut fugiat beatae; Laudantium et laudantium irure et adipiscing consectetur... Sunt mollit totam ipsum error rem nisi duis consectetur sed. Omnis est laudantium mollit voluptate sit ipsa excepteur est adipiscing voluptatem et explicabo. Dolor doloremque dolore sunt consequat consectetur id explicabo lorem exercitation duis elit esse ea explicabo. Sunt rem irure in id elit adipiscing inventore... Anim in ab sed ipsum ipsum enim ullamco omnis ea;",
    },
    {
      id: 4,
      title: "Deserunt do ut",
      content: "Do doloremque tempor inventore esse ab beatae? Qui minim occaecat veritatis ut exercitation aute in deserunt est dicta labore. Aliqua consectetur id sit dolor ut eu incididunt elit deserunt dolor ut. Rem ad ipsa sunt deserunt do..."
    },
  ];

    const atStart = open === 1;
    const atEnd = open === services.length;
    const handleOpen = (value: number) => {
        setOpen(open === value ? 0 : value);
    };

    const slidePrev = () => {
        if (!atStart) {
            setOpen(open - 1);
        }
        };

        const slideNext = () => {
        if (!atEnd) {
            setOpen(open + 1);
        }
    };
    
  return (
    <div className="bg-black text-white">
      <div className="container mx-auto px-4 md:px-20 py-20">
        <h1 className="text-2xl md:text-4xl font-bold mb-6">Our Services</h1>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
          {/*Accordion Header*/}
          <div className="col-span-2">
            {services.map((service) => (
              <Accordion key={service.id} open={open === service.id} className={`mb-5 border-b-2 ${open === service.id ? "border-[#E74C3C]" : "border-[#3498DB]"}`}
                    icon={<Icon id={service.id} open={open} />} placeholder={undefined} onResize={undefined} onResizeCapture={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}              >
                <AccordionHeader onClick={() => handleOpen(service.id)} className={`text-2xl cursor-pointer ${open === service.id ? "text-gray-300 font-semibold" : "text-white"}`} placeholder={undefined} onResize={undefined} onResizeCapture={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                >
                  {service.title}
                </AccordionHeader>
              </Accordion>
            ))}
          </div>

          {/*Accordion Body*/}
          <div className="bg-[#1c1c1c] p-6 rounded-md border border-[#3498DB] min-h-[150px] col-span-3">
            {open !== 0 ? (
                (() => {
                    const selected = services.find((s) => s.id === open);
                    return selected ? (
                        <div className="space-y-4">
                            <h2 className="text-lg md:text-xl font-semibold text-white">{selected.title}</h2>
                            <p className="text-gray-300 text-md md:text-lg">{selected.content}</p>
                        </div>
                    ) : null;
                })()
            ) : (
                <div className="flex items-center justify-center h-full text-gray-500 text-2xl italic">
                    <p>Always at your service</p>
                </div>
            )}
            <div className="flex gap-4 justify-center mt-4">
            <button
                onClick={slidePrev}
                aria-label="Previous slide"
                disabled={atStart}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ease-in-out
                    ${atStart 
                    ? 'bg-gray-300 opacity-50 pointer-events-none cursor-not-allowed' 
                    : 'bg-[#d3d3d3] hover:bg-[#E74C3C]'
                    }`}
                >
                <i className="fas fa-arrow-left text-white text-sm"></i>
            </button>

            <button
                onClick={slideNext}
                aria-label="Next slide"
                disabled={atEnd}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ease-in-out
                    ${atEnd 
                    ? 'bg-gray-300 opacity-50 pointer-events-none cursor-not-allowed' 
                    : 'bg-[#d3d3d3] hover:bg-[#3498DB]'
                    }`}
                >
                <i className="fas fa-arrow-right text-white text-sm"></i>
            </button>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
