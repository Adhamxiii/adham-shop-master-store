import Collections from "@/components/Collections";
import Products from "@/components/Products";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Image
        src="/banner.png"
        alt="banner"
        width={2000}
        height={1000}
        className="w-screen"
      />
      <Collections />
      <Products />
    </>
  );
}
