import { Skeleton } from "@/components/ui/skeleton";
import { useGetProductsQuery } from "@/redux/features/products/product.api";
import ProductCard from "@/components/custom/ProductCard";
import { useSearchParams } from "react-router";
import ProductsFilter from "@/components/modules/Shop/ProductFilters";

export default function Shop() {
    const [searchParams] = useSearchParams();

    const category = searchParams.get("category") || undefined;
    const { data: products, isLoading: productsLoading } = useGetProductsQuery({ category });

    return (
        <main className="container mx-auto px-4 py-10">
            <h1 className="text-4xl font-bold text-center mb-12">Shop</h1>

            <div className="grid grid-cols-1 lg:grid-cols-4">
                <ProductsFilter productsLoading={productsLoading} />
                <div className="col-span-3">
                    {productsLoading
                        ? (
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {Array.from({ length: 6 }).map((_, i) => (
                                    <div key={i} className="space-y-3">
                                        <Skeleton className="h-40 w-full rounded-lg" />
                                        <Skeleton className="h-6 w-3/4" />
                                        <Skeleton className="h-4 w-1/2" />
                                        <Skeleton className="h-4 w-1/3" />
                                    </div>
                                ))}
                            </div>
                        )
                        : products?.data.length === 0 ? (
                            <p className="text-muted-foreground">No products match your filters.</p>
                        ) : (
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {products?.data?.map((product) => <ProductCard product={product} />)}
                            </div>
                        )}
                </div>
            </div>
        </main>
    );
}
