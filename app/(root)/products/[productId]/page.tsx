import Gallery from "@/components/Gallery";
import ProductCard from "@/components/ProductCard";
import ProductInfo from "@/components/ProductInfo";
import { getProductDetails, getRelatedProducts } from "@/lib/actions";
import React from "react";

const ProductDetailsPage = async ({
  params,
}: {
  params: { productId: string };
}) => {
  const productDetails = await getProductDetails(params.productId);

  const relatedProducts = await getRelatedProducts(params.productId);

  return (
    <>
      <div className="flex items-start justify-center gap-16 px-5 py-10 max-md:flex-col max-md:items-center">
        <Gallery items={productDetails.media} />

        <ProductInfo productInfo={productDetails} />
      </div>

      <div className="flex flex-col items-center px-10 py-5 max-md:px-3">
        <p className="text-heading3-bold">Related Products</p>
        <div className="mx-auto mt-8 flex flex-wrap gap-16">
          {relatedProducts?.map((product: ProductType) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export const dynamic = "force-dynamic";

export default ProductDetailsPage;
