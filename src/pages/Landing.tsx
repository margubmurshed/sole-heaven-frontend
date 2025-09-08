
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { useGetProductsQuery } from "@/redux/features/products/product.api";
import { Link } from "react-router";
import { useGetCategoriesQuery } from "@/redux/features/category/category.api";
import { Skeleton } from "@/components/ui/skeleton";

export default function Landing() {
    const { data: products, isLoading: productsLoading } = useGetProductsQuery({});
    const { data: categories, isLoading: categoriesLoading } = useGetCategoriesQuery({});

    const testimonials = [
        { name: "Rahim", text: "Sole Heaven is my go-to for sneakers. Authentic, fast delivery, and exclusive designs!" },
        { name: "Sadia", text: "Amazing collection and great customer service. Highly recommended!" },
        { name: "Karim", text: "Amazing collection and great customer service. Highly recommended!" },
        { name: "Karim", text: "Amazing collection and great customer service. Highly recommended!" },
    ];

    const faqs = [
        { q: "Do you ship across Bangladesh?", a: "Yes, we deliver nationwide with fast and secure shipping." },
        { q: "Are your sneakers authentic?", a: "Absolutely, all products are 100% genuine and sourced from authorized distributors." },
        { q: "Can I return or exchange?", a: "Yes, returns and exchanges are available within 7 days of delivery." },
    ];

    return (
        <main className="">
            {/* 1. Hero Section */}
            <section className="bg-gray-900 text-white py-32 px-4 text-center">
                <h1 className="text-5xl font-bold mb-4">Sole Heaven</h1>
                <p className="text-lg mb-8">Bangladesh's top destination for authentic sneakers</p>
                <Link to="/shop"><Button size="lg">Shop Now</Button></Link>
            </section>

            {/* 2. Featured Sneakers */}
            <section className="max-w-6xl mx-auto px-4 py-10">
                <h2 className="text-3xl font-bold text-center mb-12">Featured Sneakers</h2>
                <div className="grid gap-6 md:grid-cols-3">
                    {!productsLoading
                        ? products?.data.map((product) => (
                            <Card key={product._id} className="hover:shadow-lg transition">
                                <CardContent className="text-center">
                                    <img
                                        src={product.featuredImage}
                                        alt={product.name}
                                        className="mx-auto mb-4 h-48 object-contain rounded-md"
                                    />
                                    <CardTitle className="mb-3">{product.name}</CardTitle>
                                    <CardDescription>{product.price} Taka</CardDescription>
                                    <Link to={`/product/${product.slug}`}>
                                        <Button className="mt-4">Buy Now</Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        ))
                        :
                        Array.from({ length: 3 }).map((_, idx) => (
                            <Card key={idx} className="p-4 animate-pulse">
                                <CardContent className="text-center">
                                    <Skeleton className="mx-auto mb-4 h-48 w-full rounded-md" />
                                    <Skeleton className="h-5 w-3/4 mx-auto mb-2 rounded" />
                                    <Skeleton className="h-4 w-1/2 mx-auto mb-4 rounded" />
                                    <Skeleton className="h-10 w-3/4 mx-auto rounded" />
                                </CardContent>
                            </Card>
                        ))}
                </div>
            </section>

            {/* Categories Section */}
            <section className="bg-gray-50 py-20 px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
                <div className="grid gap-6 md:grid-cols-3 text-center">
                    {!categoriesLoading
                        ? categories?.data.map((cat) => (
                            <Card key={cat._id} className="hover:shadow-lg transition p-6">
                                <CardTitle>{cat.name}</CardTitle>
                                <CardDescription>
                                    Explore our exclusive {cat.name.toLowerCase()} collection
                                </CardDescription>
                                <Link to={`/shop?category=${cat._id}`}>
                                    <Button className="mt-4">Shop {cat.name}</Button>
                                </Link>
                            </Card>
                        ))
                        : // Skeleton Loader
                        Array.from({ length: 3 }).map((_, idx) => (
                            <Card key={idx} className="p-6 animate-pulse">
                                <Skeleton className="h-8 w-1/2 mx-auto mb-2 rounded" />
                                <Skeleton className="h-4 w-3/4 mx-auto rounded" />
                                <Skeleton className="h-10 w-2/3 mx-auto mt-4 rounded" />
                            </Card>
                        ))}
                </div>
            </section>

            {/* 4. About Section */}
            <section className="max-w-4xl mx-auto px-4 text-center space-y-6 py-10">
                <h2 className="text-3xl font-bold">About Sole Heaven</h2>
                <p className="text-lg text-gray-700">
                    Sole Heaven brings you authentic, premium sneakers from top global brands. Our mission is to provide sneaker enthusiasts across Bangladesh with exclusive designs and excellent service.
                </p>
                <Link to="/about"><Button>Learn More</Button></Link>
            </section>

            {/* 5. Testimonials */}
            <section className="bg-gray-50 py-20 px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Testimonials</h2>
                <div className="grid gap-6 md:grid-cols-4">
                    {testimonials.map((t, idx) => (
                        <Card key={idx} className="p-6 hover:shadow-lg transition">
                            <CardContent>
                                <p className="text-gray-700 mb-4">&quot;{t.text}&quot;</p>
                                <CardTitle className="text-right">{t.name}</CardTitle>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* 6. FAQ Section */}
            <section className="py-20 max-w-6xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
                <Accordion type="single" collapsible className="max-w-3xl mx-auto space-y-4">
                    {faqs.map((item, idx) => (
                        <AccordionItem key={idx} value={`faq-${idx}`} className="border rounded-lg px-4">
                            <AccordionTrigger className="text-left font-semibold">{item.q}</AccordionTrigger>
                            <AccordionContent className="text-gray-700">{item.a}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </section>

            {/* 7. Newsletter */}
            <section className="bg-gray-900 text-white py-20 px-4 text-center">
                <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
                <p className="mb-6">Get the latest updates and exclusive offers directly to your inbox</p>
                <div className="flex items-center max-w-md mx-auto gap-2">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="flex-1 rounded-full px-4 py-3 text-white focus:outline-none border border-white"
                    />
                    <Button className="rounded-r-md block h-full text-white" variant="link">Subscribe</Button>
                </div>
            </section>

            {/* 8. Footer */}
            <footer className="bg-gray-800 text-white py-12 px-4 text-center space-y-4">
                <p>© {new Date().getFullYear()} Sole Heaven. All rights reserved.</p>
                <div className="flex justify-center gap-4">
                    <a href="#">Facebook</a>
                    <a href="#">Instagram</a>
                    <a href="#">Twitter</a>
                </div>
            </footer>
        </main>
    );
}
