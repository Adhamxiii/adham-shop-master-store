"use client";

import Image from "next/image";
import React, { useState } from "react";

const Gallery = ({ items }: { items: string[] }) => {
  const [index, setIndex] = useState(0);

  return (
    <div className="flex max-w-[500px] flex-col gap-3">
      <Image
        src={items[index]}
        alt={items[index]}
        width={500}
        height={500}
        className="size-96 rounded-lg object-cover shadow-xl"
        sizes="50vw"
      />

      <div className="tailwind-scrollbar-hide flex justify-center gap-2 overflow-auto">
        {items.map((item: string, i: number) => (
          <div
            key={item}
            className={`relative h-20 w-1/4 cursor-pointer gap-4 ${index === i && "rounded-md border-2 border-black"} `}
            onClick={() => setIndex(i)}
          >
            <Image
              src={item}
              alt={item}
              fill
              className="rounded-md object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
