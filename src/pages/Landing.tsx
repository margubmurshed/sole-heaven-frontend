
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { useGetProductsQuery } from "@/redux/features/products/product.api";
import { Link } from "react-router";
import { useGetCategoriesQuery } from "@/redux/features/category/category.api";
import { Skeleton } from "@/components/ui/skeleton";
import ProductCard from "@/components/custom/ProductCard";
import ShopImage from "@/assets/images/shop-image.jpg";
import Logo from "@/assets/icons/Logo";
import { Book } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { faqs } from "@/data/faqs";

export default function Landing() {
    const { data: products, isLoading: productsLoading } = useGetProductsQuery({ limit: 8, sortBy: "-createdAt" });
    const { data: categories, isLoading: categoriesLoading } = useGetCategoriesQuery({ limit: 8, sortBy: "createdAt" });

    const anonymousFallbackImage = "https://placehold.co/48x48/6B7280/FFFFFF?text=AA";

    return (
        <main>
            <section className="bg-gray-900 text-white py-32 px-4 text-center">
                <h1 className="text-5xl font-bold mb-4">Sole Heaven</h1>
                <p className="text-lg mb-8">Bangladesh's top destination for authentic sneakers</p>
                <Link to="/shop"><Button size="lg">Shop Now</Button></Link>
            </section>

            <section className="container mx-auto px-4 py-20">
                <div className="text-center mb-12 space-y-5">
                    <h2 className="text-3xl font-bold">Featured Sneakers</h2>
                    <p>A curated collection of sneakers designed to keep you comfortable and stylish every step of the way.</p>
                </div>
                <div className="grid gap-6 md:grid-cols-4">
                    {!productsLoading
                        ? products?.data.map((product) => <ProductCard product={product} />)
                        :
                        Array.from({ length: 4 }).map((_, idx) => (
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

            <section className="bg-primary/10 py-20 px-4">
                <div className="mb-12 space-y-5 text-center container mx-auto">
                    <h2 className="text-3xl font-bold">Shop by Top Category</h2>
                    <p>Discover our most popular categories and find exactly what you need. Browse through curated selections to quickly explore the best products in each category.</p>
                </div>
                <div className="grid gap-6 md:grid-cols-4 text-center container mx-auto">
                    {!categoriesLoading
                        ? categories?.data.map((cat) => (
                            <div className="relative min-h-96 group hover:scale-105 transition" key={cat._id}>
                                <img src={cat.featuredImage} alt={cat.name} className="absolute top-0 bottom-0 left-0 right-0 w-full h-full object-cover brightness-30 group-hover:brightness-20 z-0 transition" />
                                <Link to={`/shop?category=${cat._id}`}>
                                    <div className="z-10 relative text-white flex flex-col justify-center w-full h-full p-5 space-y-3">
                                        <p className="text-xl font-semibold">{cat.name}</p>
                                        <p>Explore our exclusive {cat.name.toLowerCase()} collection</p>
                                    </div>
                                </Link>
                            </div>
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

            <section>
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div>
                        <img src={ShopImage} alt="shop-image" />
                    </div>
                    <div className="p-10 space-y-10">
                        <div className="flex flex-col items-center gap-3">
                            <Logo />
                            <h2 className="text-3xl font-bold">About Sole Heaven</h2>
                        </div>
                        <div className="space-y-5">
                            <p className="text-lg text-gray-700">
                                Sole Heaven is your ultimate destination for authentic, premium sneakers from the world’s leading brands. We are passionate about footwear and committed to bringing sneaker enthusiasts in Bangladesh the latest and most exclusive designs. Every pair in our collection is carefully selected to ensure authenticity, quality, and style.
                            </p>
                            <p className="text-lg text-gray-700">
                                Our mission goes beyond just selling sneakers—we aim to create a community where sneaker lovers can explore, celebrate, and express themselves through their favorite footwear. Whether you’re hunting for the latest drops, limited editions, or timeless classics, Sole Heaven offers a seamless shopping experience with exceptional customer service and fast delivery.
                            </p>
                            <p className="text-lg text-gray-700">
                                At Sole Heaven, we believe that sneakers are more than just shoes—they are a statement of personality, culture, and lifestyle. That’s why we are dedicated to providing products that meet the highest standards of quality, comfort, and design. Join us in redefining sneaker culture in Bangladesh, and step into a world where every step matters.
                            </p>
                        </div>
                        <div className="flex justify-center">
                            <Link to="/about"><Button className="py-6"><Book />Learn More</Button></Link>
                        </div>
                    </div>
                </div>

            </section>

            <section>
                <div className="font-sans flex flex-col items-center py-16 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center max-w-4xl leading-tight mb-4 text-gray-900 dark:text-white">
                        Loved by community
                    </h1>

                    <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 text-center max-w-3xl mb-16">
                        Hear directly from those who have experienced our services. Our clients’ stories highlight the quality, reliability, and impact of what we do. From exceptional support to transformative results, these testimonials reflect the trust and satisfaction that drive us every day.
                    </p>

                    <div className="w-full max-w-7xl columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">

                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="bg-white dark:bg-black p-6 rounded-xl shadow-md break-inside-avoid border border-gray-200 dark:border-gray-800">
                                <div className="flex items-center mb-4">
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className="w-12 h-12 rounded-full object-cover mr-4"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.onerror = null;
                                            target.src = anonymousFallbackImage;
                                        }}
                                    />
                                    <div>
                                        <p className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.title}</p>
                                    </div>
                                </div>
                                <p className="text-base text-gray-700 dark:text-gray-200 leading-relaxed">
                                    {testimonial.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

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
        </main>
    );
}
