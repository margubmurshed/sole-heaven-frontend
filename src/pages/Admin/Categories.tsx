import { DeleteConfirmModal } from "@/components/custom/DeleteConfirmModal";
import TableLoader from "@/components/custom/TableLoader";
import { CreateCategoryModal } from "@/components/modules/Admin/Categories/CreateCategoryModal";
import { UpdateCategoryModal } from "@/components/modules/Admin/Categories/UpdateCategoryModal";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useDeleteCategoryMutation, useGetCategoriesQuery } from "@/redux/features/category/category.api";
import { TrashIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Categories = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { data, isLoading } = useGetCategoriesQuery({ page: currentPage, fields: "-updatedAt" });
    const [deleteTourType, { isLoading: isDeleting }] = useDeleteCategoryMutation();
    const [open, isOpen] = useState(false);

    const handleDelete = async (id: string) => {
        try {
            const response = await deleteTourType({ _id: id }).unwrap();
            if (response.success) {
                toast.success("Category deleted successfully!");
                if (data?.meta) {
                    if (data.meta.page > 1 && data?.data.length === 1) {
                        setCurrentPage(prev => prev - 1);
                    }
                }
                isOpen(false);
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error("Failed to delete category:", error);
            toast.error(error?.data?.message || "Failed to delete category");
        }
    }

    return (
        <div>
            <div className="w-full p-6 bg-background text-foreground max-w-3xl mx-auto">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold">Categories</h1>
                    <CreateCategoryModal isLoading={isLoading} />
                </div>
                <div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Name</TableHead>
                                <TableHead>Created At</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableLoader />
                            ) : (
                                data?.data.map((category) => (
                                    <TableRow key={category._id}>
                                        <TableCell className="w-1/2">{category.name}</TableCell>
                                        <TableCell className="w-full">{new Date(category.createdAt).toLocaleDateString()}</TableCell>
                                        <TableCell>
                                            <UpdateCategoryModal categoryID={category._id}/>
                                            <DeleteConfirmModal
                                                open={open}
                                                setOpen={isOpen}
                                                isLoading={isDeleting}
                                                onConfirm={() => handleDelete(category._id)}
                                            >
                                                <Button variant="destructive" size="sm" className="ml-2"> <TrashIcon /> Delete</Button>
                                            </DeleteConfirmModal>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                    {(!isLoading && ((data?.meta.totalPages || 1) > 1)) && (
                        <div className="mt-4 flex justify-end">
                            <div>
                                <Pagination>
                                    <PaginationContent>
                                        <PaginationItem>
                                            <PaginationPrevious className={cn("select-none", {
                                                "pointer-events-none opacity-50": currentPage === 1,
                                                "cursor-pointer": currentPage > 1,
                                            })} onClick={() => setCurrentPage(prev => {
                                                if (prev === 1) return prev;
                                                return prev - 1;
                                            })} />
                                        </PaginationItem>
                                        {Array.from({ length: data?.meta.totalPages || 1 }, (_, i) => i + 1).map((page) => (
                                            <PaginationItem key={page} className="cursor-pointer">
                                                <PaginationLink
                                                    isActive={currentPage === page}
                                                    onClick={() => setCurrentPage(page)}
                                                >
                                                    {page}
                                                </PaginationLink>
                                            </PaginationItem>
                                        ))}
                                        <PaginationItem>
                                            <PaginationNext className={cn("select-none cursor-pointer", {
                                                "pointer-events-none opacity-50": currentPage === data?.meta.totalPages
                                            })} onClick={() => setCurrentPage(prev => {
                                                if (prev === data?.meta.totalPages) return prev;
                                                return prev + 1;
                                            })} />
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
export default Categories;