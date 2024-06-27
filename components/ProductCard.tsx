"use client";

import axios from "axios";
import { Heart } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { MouseEvent, useEffect, useState } from "react";
import HeartFav from "./HeartFav";

const ProductCard = ({
  product,
  updateUser,
}: {
  product: ProductType;
  updateUser?: (updatedUser: UserType) => void;
}) => {
  return (
    <Link
      href={`/products/${product._id}`}
      className="flex w-[220px] flex-col gap-2"
    >
      <Image
        src={product.media[0]}
        alt={product.title}
        width={250}
        height={200}
        className="h-[250px] rounded-lg object-cover"
      />
      <div>
        <p className="text-base-bold">{product.title}</p>
        <p className="text-small-medium text-grey-2">{product.category}</p>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-body-bold">${product.price}</p>
        <HeartFav product={product} updateUser={updateUser} />
      </div>
    </Link>
  );
};

export default ProductCard;
