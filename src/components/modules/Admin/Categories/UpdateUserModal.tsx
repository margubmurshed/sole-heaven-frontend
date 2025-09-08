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
import { Textarea } from "@/components/ui/textarea"
import { useGetCategoriesQuery, useGetSingleCategoryQuery, useUpdateCategoryMutation } from "@/redux/features/category/category.api"
import { zodResolver } from "@hookform/resolvers/zod"
import { PencilIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"

const updateCategorySchema = z.object({
    name: z.string().nonempty("Category name is required").trim().optional(),
    description: z.string().max(500, "Description must be at most 500 characters").optional(),
    parent: z.string().nullable().optional()
});

export function UpdateCategoryModal({ categoryID }: { categoryID: string }) {
    const { data: category, isLoading: categoryLoading } = useGetSingleCategoryQuery({ _id: categoryID });
    const [updateCategory, { isLoading: updateCategoryLoading }] = useUpdateCategoryMutation();
    const { data: categories, isLoading: categoriesLoading } = useGetCategoriesQuery({ limit: 100000 })
    const [open, setOpen] = useState(false);

    const form = useForm({
        resolver: zodResolver(updateCategorySchema),
        defaultValues: {
            name: "",
            description: "",
            parent: null,
        },
    });

    useEffect(() => {
        if (category?.data) {
            form.reset({
                name: category.data.name,
                description: category.data.description,
                parent: category.data.parent,
            })
        }
    }, [form, category])

    const onSubmit = async (data: z.infer<typeof updateCategorySchema>) => {
        try {
            await updateCategory({ _id: categoryID, ...data }).unwrap();
            toast.success("Category updated successfully!");
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
                <Button variant="outline" size="sm">
                    <PencilIcon />Edit
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Update Category</DialogTitle>
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
                                                <Input disabled={categoryLoading} placeholder="Example (Hiking, Adventure)"
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
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Textarea disabled={categoryLoading} placeholder="Write details about the category"
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
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button variant="outline">Cancel</Button>
                                    </DialogClose>
                                    <Button type="submit" disabled={categoryLoading || updateCategoryLoading}>Update Category</Button>
                                </DialogFooter>
                            </form>
                        </Form>
                    </div>
                </div>

            </DialogContent>
        </Dialog>
    )
}
