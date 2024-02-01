import Link from "next/link";
import { GridTileImage } from "./gridimg";
import { Product } from "@/backend/src/models/prodModel";

export function Carousel({ products }: { products: Product[] }) {
  if (!products?.length) return null;
  const carouselProducts = [...products, ...products, ...products];

  return (
    <div className=" w-full overflow-x-auto pb-6 pt-1">
      <ul className="flex animate-carousel gap-4">
        {carouselProducts.map((product, i) => (
          <li
            key={`${product.id}${i}`}
            className="relative aspect-square h-[30vh] max-h-[275px] w-2/3 max-w-[475px] flex-none md:w-1/3"
          >
            <Link
              href={`/product/${product.id}`}
              className="relative h-full w-full"
            >
              <GridTileImage
                alt={product.description}
                label={{
                  title: product.description,
                  amount: product.price.toString(),
                  currencyCode: " Inr",
                }}
                src={product.images[0].url}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
