import ProductCard from "@/components/ProductCard";
import { getCollectionDetails } from "@/lib/actions";
import Image from "next/image";
import React from "react";

const CollectionDetailsPage = async ({
  params,
}: {
  params: { collectionsId: string };
}) => {
  const collectionDetails = await getCollectionDetails(params.collectionsId);

  return (
    <div className="flex flex-col items-center gap-8 px-10 py-5 text-grey-2">
      <Image
        src={collectionDetails.image}
        alt=""
        width={1500}
        height={1000}
        className="h-[400px] w-full rounded-xl object-cover"
      />
      <p className="text-heading3-bold">{collectionDetails.title}</p>
      <p className="max-w-[900px] text-center text-body-medium">
        {collectionDetails.description}
      </p>
      <div className="gap-18 mx-auto flex flex-wrap">
        {collectionDetails.products.map((product: ProductType) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
    </div>
  );
};

export default CollectionDetailsPage;

export const dynamic = "force-dynamic";
