import { Badge } from "@/components/custom/Badge";
import { DeleteConfirmModal } from "@/components/custom/DeleteConfirmModal";
import TableLoader from "@/components/custom/TableLoader";
import { CreateProductModal } from "@/components/modules/Admin/Products/CreateProductModal";
import { UpdateProductModal } from "@/components/modules/Admin/Products/UpdateProductModal";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useDeleteProductMutation, useGetProductsQuery } from "@/redux/features/products/product.api";
import { TrashIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useGetProductsQuery({ page: currentPage, fields: "-updatedAt" });
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
  const [open, setOpen] = useState(false);

  const handleDelete = async (id: string) => {
    try {
      const response = await deleteProduct({ _id: id }).unwrap();
      if (response.success) {
        toast.success("Product deleted successfully!");
        if (data?.meta) {
          if (data.meta.page > 1 && data?.data.length === 1) {
            setCurrentPage((prev) => prev - 1);
          }
        }
        setOpen(false);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Failed to delete product:", error);
      toast.error(error?.data?.message || "Failed to delete product");
    }
  };

  return (
    <div>
      <div className="w-full p-6 bg-background text-foreground">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Products</h1>
          <CreateProductModal isLoading={isLoading} />
        </div>
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead></TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableLoader columns={7} />
              ) : (
                data?.data.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell><img src={product.featuredImage} alt={product.name} className="w-20 h-20 object-cover rounded-md border" /></TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.category?.name || "—"}</TableCell>
                    <TableCell><Badge variant={product.stock ? "success": "destructive"}>{product.stock ? "Stock In" : "Stock Out"}</Badge></TableCell>
                    <TableCell>{new Date(product.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <UpdateProductModal product={product} />
                      <DeleteConfirmModal
                        open={open}
                        setOpen={setOpen}
                        isLoading={isDeleting}
                        onConfirm={() => handleDelete(product._id)}
                      >
                        <Button variant="destructive" size="sm" className="ml-2" disabled={isDeleting}>
                          <TrashIcon /> Delete
                        </Button>
                      </DeleteConfirmModal>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          {!isLoading && (data?.meta.totalPages || 1) > 1 && (
            <div className="mt-4 flex justify-end">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      className={cn("select-none", {
                        "pointer-events-none opacity-50": currentPage === 1,
                        "cursor-pointer": currentPage > 1,
                      })}
                      onClick={() => setCurrentPage((prev) => (prev === 1 ? prev : prev - 1))}
                    />
                  </PaginationItem>
                  {Array.from({ length: data?.meta.totalPages || 1 }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page} className="cursor-pointer">
                      <PaginationLink isActive={currentPage === page} onClick={() => setCurrentPage(page)}>
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      className={cn("select-none cursor-pointer", {
                        "pointer-events-none opacity-50": currentPage === data?.meta.totalPages,
                      })}
                      onClick={() => setCurrentPage((prev) => (prev === data?.meta.totalPages ? prev : prev + 1))}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
