import { Navigate, useNavigate, useParams } from "react-router";
import { useGetSingleProductQuery } from "@/redux/features/products/product.api";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { addItem } from "@/redux/features/cart/cart.slice";
import { toast } from "sonner";

export default function ProductDetails() {
  const { slug } = useParams<{ slug?: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  const { data: product, isLoading } = useGetSingleProductQuery({ slug });
  const [selectedSize, setSelectedSize] = useState<number | null>(null);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10 animate-pulse">
        <Skeleton className="h-96 w-full rounded-md mb-6" />
        <Skeleton className="h-8 w-3/4 mb-2 rounded" />
        <Skeleton className="h-6 w-1/2 mb-4 rounded" />
        <Skeleton className="h-4 w-full mb-2 rounded" />
        <Skeleton className="h-4 w-full mb-2 rounded" />
        <Skeleton className="h-10 w-1/3 rounded" />
      </div>
    );
  }

  if (!slug) return <Navigate to="/" />; // early return if slug missing
  if (!product) {
    return <p className="text-center mt-10">Product not found.</p>;
  }

  const { data } = product;

  return (
    <main className="container mx-auto px-4 py-10">
      <div className="grid md:grid-cols-2 gap-10">
        {/* Images */}
        <div>
          <img
            src={data.featuredImage}
            alt={data.name}
            className="w-full h-96 object-contain rounded-md mb-4"
          />
          <div className="grid grid-cols-3 gap-2">
            {data.images?.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`${data.name} ${idx + 1}`}
                className="h-24 w-full object-cover rounded-md"
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{data.name}</h1>
          <p className="text-xl font-semibold">{data.price} Taka</p>
          <div
            className="prose max-w-full"
            dangerouslySetInnerHTML={{ __html: data.description }}
          />
          <p className="text-sm text-muted-foreground">{data.shortDescription}</p>

          {/* Sizes */}
          {data.sizes?.length > 0 && (
            <div className="flex flex-wrap gap-2 items-center">
              <span className="font-medium">Size:</span>
              {data.sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-1 border rounded ${selectedSize === size ? "bg-black text-white" : "bg-white"
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>
          )}

          <Button
            className="mt-4"
            disabled={!selectedSize}
            onClick={() => {
              if (!selectedSize) return;
              dispatch(
                addItem({
                  productId: product.data._id,
                  name: product.data.name,
                  price: product.data.price,
                  size: selectedSize,
                  quantity: 1,
                  featuredImage: product.data.featuredImage,
                })
              );
              navigate("/checkout")
            }
            }
          >
            Buy Now
          </Button>
          <Button
            className="mt-4"
            disabled={!selectedSize}
            onClick={() => {
              if (!selectedSize) return;
              dispatch(
                addItem({
                  productId: product.data._id,
                  name: product.data.name,
                  price: product.data.price,
                  size: selectedSize,
                  quantity: 1,
                  featuredImage: product.data.featuredImage,
                })
              );
              toast.success(`Added ${product.data.name} size ${selectedSize} to cart`);
            }}
          >Add To Cart</Button>
        </div>
      </div>
    </main>
  );
}
