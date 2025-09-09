import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetProductsQuery } from "@/redux/features/products/product.api";
import ProductCard from "@/components/custom/ProductCard";

export default function Shop() {
    const { data: products, isLoading } = useGetProductsQuery({ limit: 100 });

    return (
        <main className="max-w-6xl mx-auto px-4 py-10">
            <h1 className="text-4xl font-bold text-center mb-12">Shop</h1>

            <div className="grid gap-6 md:grid-cols-3">
                {isLoading
                    ? Array.from({ length: 6 }).map((_, idx) => (
                        <Card key={idx} className="p-4 animate-pulse">
                            <CardContent className="text-center">
                                <Skeleton className="mx-auto mb-4 h-48 w-full rounded-md" />
                                <Skeleton className="h-5 w-3/4 mx-auto mb-2 rounded" />
                                <Skeleton className="h-4 w-1/2 mx-auto mb-4 rounded" />
                                <Skeleton className="h-10 w-3/4 mx-auto rounded" />
                            </CardContent>
                        </Card>
                    ))
                    : products?.data?.map((product) => <ProductCard product={product} />)}
            </div>
        </main>
    );
}
