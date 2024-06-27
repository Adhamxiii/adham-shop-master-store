import { getProducts } from "@/lib/actions";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import ProductCard from "./ProductCard";

const Products = async () => {
  const products = await getProducts();

  return (
    <div className="flex flex-col items-center gap-10 px-5 py-8">
      <p className="text-heading1-bold">Products</p>
      {!products || products.length === 0 ? (
        <p className="text-body-bold">No Products Found</p>
      ) : (
        <div className="mx-auto flex flex-wrap max-lg:justify-center gap-16">
          {products.map((product: ProductType) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
