import { getCollections } from "@/lib/actions";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Collections = async () => {
  const collections = await getCollections();

  return (
    <div className="flex flex-col items-center gap-10 px-5 py-8">
      <p className="text-heading1-bold">Collections</p>
      <div className="flex items-center justify-center gap-8">
        {!collections ||
          (collections.length === 0 && (
            <p className="text-body-bold">No Collections Found</p>
          ))}
        {collections.map((collection: CollectionType) => (
          <Link
            href={`/collections/${collection._id}`}
            key={collection._id}
            className="relative"
          >
            <Image
              src={collection.image}
              alt={collection.title}
              width={350}
              height={200}
              className="cursor-pointer rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 flex h-full w-full items-center justify-center rounded-lg bg-black/70 text-center text-heading2-bold text-white opacity-0 transition-opacity duration-500 ease-in-out hover:opacity-100">
              {collection.title}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Collections;
