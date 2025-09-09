import ButtonLoader from "@/components/custom/ButtonLoader";
import MultipleFileUploader from "@/components/custom/MultipleFileUploader";
import SingleFileUploader from "@/components/custom/SingleFileUploader";
import TagInput from "@/components/custom/TagInput";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { FileMetadata } from "@/hooks/use-file-upload";
import { useGetCategoriesQuery } from "@/redux/features/category/category.api";
import { useCreateProductMutation } from "@/redux/features/products/product.api";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Tag } from "emblor";
import { PlusSquare } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const createProductZodSchema = z.object({
    name: z.string().nonempty("Product name is required").trim(),
    shortDescription: z
        .string(),
    brand: z.string().nonempty("Brand is required").trim(),
    description: z
        .string(),
    price: z.number().nonnegative("Price must be a positive number"),
    sku: z.string().nonempty("SKU is required").transform((val) => val.toUpperCase()),
    stock: z.number().nonnegative(),
    category: z.string().nonempty("Category is required").trim(),
});

type ProductFormValues = z.infer<typeof createProductZodSchema>;

export function CreateProductModal({ isLoading }: { isLoading: boolean }) {
    const [createProduct, { isLoading: createLoading }] = useCreateProductMutation();
    const { data: categories, isLoading: catLoading } = useGetCategoriesQuery({ limit: 1000, fields: "_id,name" });

    const [open, setOpen] = useState(false);
    const [sizes, setSizes] = useState<Tag[]>([]);
    const [featuredImage, setFeaturedImage] = useState<File | FileMetadata | null>(null);
    const [sizeChartImage, setSizeChartImage] = useState<File | FileMetadata | null>(null);
    const [images, setImages] = useState<(File | FileMetadata)[] | []>([]);

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(createProductZodSchema),
        defaultValues: {
            name: "",
            description: "",
            shortDescription: "",
            brand: "",
            sku: "",
            price: 0,
            stock: 0,
            category: "",
        },
    });

    const onSubmit = async (data: ProductFormValues) => {
        const productData = {
            ...data,
            sizes: sizes.map((tag) => Number(tag.text)),
        };

        const formData = new FormData();
        formData.append("data", JSON.stringify(productData));

        if (featuredImage) {
            formData.append("featuredImage", featuredImage as File);
        } else return toast.error("Please upload a featured image.");

        if (sizeChartImage) {
            formData.append("sizeChartImage", sizeChartImage as File);
        }

        if (images.length > 0) {
            images.forEach((image) => {
                formData.append("images", image as File);
            });
        }

        try {
            const response = await createProduct(formData).unwrap();
            if (response.success) {
                toast.success("Product added successfully!");
                setOpen(false);
                form.reset();
                setFeaturedImage(null);
                setSizeChartImage(null);
                setImages([]);
                setSizes([]);
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error("Failed to add product:", error);
            toast.error(error?.data?.message || "Failed to add product");
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button disabled={isLoading}>
                    <PlusSquare /> Add Product
                </Button>
            </DialogTrigger>
            <DialogContent className="lg:min-w-[1000px] max-h-[calc(100vh-40px)] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Add Product</DialogTitle>
                    <DialogDescription>Click Add when you&apos;re done.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                    <div className="grid gap-3">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter product name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="shortDescription"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Short Description</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Enter a short description" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Enter a description" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">

                                    <FormField
                                        control={form.control}
                                        name="brand"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Brand</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter product brand" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="price"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Price</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter product price"
                                                        {...field}
                                                        type="number"
                                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="stock"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Stock</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter available stock"
                                                        {...field}
                                                        type="number"
                                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

                                    <FormField
                                        control={form.control}
                                        name="sku"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>SKU</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter product SKU" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="category"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Category</FormLabel>
                                                <Select onValueChange={field.onChange} value={field.value as string | undefined} disabled={catLoading}>
                                                    <FormControl>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Select a category" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {categories?.data.map((cat) => (
                                                            <SelectItem key={cat._id} value={cat._id}>
                                                                {cat.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <TagInput tags={sizes} setTags={setSizes} label="Sizes" />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div>
                                        <FormLabel className="mb-3">Featured Image</FormLabel>
                                        <SingleFileUploader onChange={(file) => setFeaturedImage(file)} />
                                    </div>

                                    <div>
                                        <FormLabel className="mb-3">Size Chart Image</FormLabel>
                                        <SingleFileUploader onChange={(file) => setSizeChartImage(file)}/>
                                    </div>
                                </div>


                                <div>
                                    <FormLabel className="mb-3">Product Images</FormLabel>
                                    <MultipleFileUploader onChange={setImages} />
                                </div>

                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button variant="outline">Cancel</Button>
                                    </DialogClose>
                                    <Button type="submit">
                                        {createLoading ? <ButtonLoader /> : "Add Product"}
                                    </Button>
                                </DialogFooter>
                            </form>
                        </Form>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
