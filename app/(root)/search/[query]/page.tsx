import ProductCard from "@/components/ProductCard";
import { getSearchedProducts } from "@/lib/actions";
import axios from "axios";
import React from "react";

const SearchPage = async ({ params }: { params: { query: string } }) => {
  const searchedProducts = await getSearchedProducts(params.query);

  const decodedQuery = decodeURIComponent(params.query);

  return (
    <div className="px-10 py-5">
      <p className="my-10 text-heading3-bold">
        Search results for {decodedQuery}
      </p>
      {!searchedProducts || searchedProducts.length === 0 ? (
        <p className="my-5 text-body-bold">No products found</p>
      ) : (
        <div className="flex flex-wrap justify-between gap-16">
          {searchedProducts.map((product: any) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;

export const dynamic = "force-dynamic";