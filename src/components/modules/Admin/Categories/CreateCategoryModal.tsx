import SingleFileUploader from "@/components/custom/SingleFileUploader"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { FileMetadata } from "@/hooks/use-file-upload"
import { useCreateCategoryMutation, useGetCategoriesQuery } from "@/redux/features/category/category.api"
import { zodResolver } from "@hookform/resolvers/zod"
import { PlusSquare } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"

const createCategorySchema = z.object({
    name: z.string().nonempty("Category name is required").trim(),
    description: z.string().max(500, "Description must be at most 500 characters"),
    parent: z.string().nullable()
});

export function CreateCategoryModal({ isLoading }: { isLoading: boolean }) {
    const [createCategory, { isLoading: createCategoryLoading }] = useCreateCategoryMutation();
    const { data: categories, isLoading: categoriesLoading } = useGetCategoriesQuery({ limit: 100000 })
    const [open, setOpen] = useState(false);
    const [featuredImage, setFeaturedImage] = useState<File | FileMetadata | null>(null);

    const form = useForm({
        resolver: zodResolver(createCategorySchema),
        defaultValues: {
            name: "",
            description: "",
            parent: null,
        },
    });

    const onSubmit = async (data: z.infer<typeof createCategorySchema>) => {

        const formData = new FormData();
        formData.append("data", JSON.stringify(data));

        if (featuredImage) {
            formData.append("featuredImage", featuredImage as File);
        }

        try {
            await createCategory(formData).unwrap();
            toast.success("Tour type added successfully!");
            setOpen(false);
            form.reset();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error("Failed to add tour type:", error);
            // Optionally, you can show a toast or notification here
            toast.error(error?.data?.message || "Failed to add tour type");
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button disabled={isLoading}><PlusSquare />Add Tour Type</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Category</DialogTitle>
                    <DialogDescription>
                        Click Add when you&apos;re done.
                    </DialogDescription>
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
                                                <Input placeholder="Example (Hiking, Adventure)"
                                                    {...field}
                                                />
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
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Write details about the category"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="parent"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Parent Category</FormLabel>
                                            <Select onValueChange={value => {
                                                if (value === "none") field.onChange(null);
                                                else field.onChange(value)
                                            }} defaultValue={field.value ?? undefined} disabled={categoriesLoading}>
                                                <FormControl>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select a category" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="none">
                                                        None
                                                    </SelectItem>
                                                    {categories?.data.map((type) => (
                                                        <SelectItem key={type._id} value={type._id}>
                                                            {type.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div>
                                    <FormLabel className="mb-3">Featured Image</FormLabel>
                                    <SingleFileUploader onChange={(file) => setFeaturedImage(file)} />
                                </div>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button variant="outline">Cancel</Button>
                                    </DialogClose>
                                    <Button type="submit" disabled={createCategoryLoading}>Create New Category</Button>
                                </DialogFooter>
                            </form>
                        </Form>
                    </div>
                </div>

            </DialogContent>
        </Dialog>
    )
}
