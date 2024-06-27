"use client";

import { MinusCircle, PlusCircle } from "lucide-react";
import { useState } from "react";
import HeartFav from "./HeartFav";
import useCart from "@/lib/hooks/useCart";

const ProductInfo = ({ productInfo }: { productInfo: ProductType }) => {
  const [select, setSelect] = useState<{ [key: string]: string }>({
    color: productInfo.colors[0],
    size: productInfo.sizes[0],
  });
  const [quantity, setQuantity] = useState<number>(1);

  const optionChangeHandler = (type: string, value: string) => {
    setSelect((prev) => ({ ...prev, [type]: value }));
  };

  const cart = useCart();

  return (
    <div className="flex max-w-[400px] flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-heading3-bold">{productInfo.title}</p>
        <HeartFav product={productInfo} />
      </div>

      <div className="flex gap-2">
        <p className="text-base-medium text-grey-2">Category:</p>
        <p className="text-base-bold">{productInfo.category}</p>
      </div>

      <p className="text-heading3-bold">$ {productInfo.price}</p>

      <div className="flex flex-col gap-2">
        <p className="text-base-medium text-grey-2">Description:</p>
        <p className="text-base-bold">{productInfo.description}</p>
      </div>

      {productInfo.colors.length > 0 && (
        <div className="flex items-center gap-4">
          <p className="text-base-medium text-grey-2">Colors:</p>
          {productInfo.colors.map((color) => {
            const clickHandler = () => optionChangeHandler("color", color);

            return (
              <div
                className={`relative size-6 rounded-full border border-black`}
                style={{ backgroundColor: color, cursor: "pointer" }}
                onClick={clickHandler}
              >
                {select.color === color && (
                  <div className="absolute left-1/2 top-1/2 size-6 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-[#1f8b8e]" />
                )}
              </div>
            );
          })}
        </div>
      )}

      {productInfo.sizes.length > 0 && (
        <div className="flex items-center gap-4">
          <p className="text-base-medium text-grey-2">Sizes:</p>
          {productInfo.sizes.map((size, i) => {
            const clickHandler = () => optionChangeHandler("size", size);

            return (
              <p
                key={i}
                className={`cursor-pointer rounded-lg border border-black px-2 py-1 ${select.size === size && "bg-black text-white"}`}
                onClick={clickHandler}
              >
                {size}
              </p>
            );
          })}
        </div>
      )}

      <div className="flex flex-col gap-2">
        <p className="text-base-medium text-grey-2">Quantity:</p>
        <div className="flex items-center gap-4">
          <MinusCircle
            className="cursor-pointer hover:text-red-1"
            onClick={() => quantity > 1 && setQuantity((prev) => prev - 1)}
          />
          <p className="text-body-bold">{quantity}</p>
          <PlusCircle
            className="cursor-pointer hover:text-red-1"
            onClick={() => setQuantity((prev) => prev + 1)}
          />
        </div>
      </div>

      <button
        type="button"
        className="rounded-lg py-3 text-base-bold outline hover:bg-black hover:text-white"
        onClick={() => {
          cart.addItem({
            item: productInfo,
            quantity,
            color: select.color,
            size: select.size,
          });
        }}
      >
        Add To Cart
      </button>
    </div>
  );
};

export default ProductInfo;
