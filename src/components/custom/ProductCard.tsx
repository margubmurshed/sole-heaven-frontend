import { Link } from "react-router";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import type { IProductResponseData } from "@/types/product.type";

const ProductCard = ({ product }: { product: IProductResponseData }) => {
    return (
        <Card key={product._id} className="hover:shadow-lg transition p-0 m-0 shadow-none border-none rounded-none">
            <Link to={`/product/${product.slug}`}>

                <CardContent className="m-0 p-0">
                    <div className="border border-gray-100 flex justify-center">
                        <img
                            src={product.featuredImage}
                            alt={product.name}
                            className="object-cover md:w-[280px] md:h-[280px] md:p-5"
                        />
                    </div>
                    <div className="p-5">
                        <CardTitle className="mb-2">{product.name}</CardTitle>
                        <CardDescription className="font-semibold text-gray-500 mb-5">{product.category.name}</CardDescription>
                        <CardDescription className="font-bold text-lg">৳{product.price}</CardDescription>
                    </div>
                </CardContent>
            </Link>
        </Card>
    );
};

export default ProductCard;