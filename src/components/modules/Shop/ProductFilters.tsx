import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useGetCategoriesQuery } from "@/redux/features/category/category.api";
import { Filter } from "lucide-react";
import { useSearchParams } from "react-router";

interface ProductsFilterProps {
    productsLoading: boolean;
}

const ProductsFilter = ({ productsLoading }: ProductsFilterProps) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { data: categories, isLoading: categoriesLoading } = useGetCategoriesQuery({limit: 1000, fields: "_id,name"});

    const selectedCategory = searchParams.get("category") || undefined;
    
    const isDisabled = productsLoading || categoriesLoading;

    const resetFilters = () => {
        const params = new URLSearchParams(searchParams);
        params.delete("category");
        setSearchParams(params);
    }

    const handleCategoryChange = (value: string) => {
        const params = new URLSearchParams(searchParams);
        if (value) {
            params.set("category", value);
        } else {
            params.delete("category");
        }
        setSearchParams(params);
    }

    const Filters = (
        <div className="w-full md:w-64 flex-shrink-0 space-y-4 bg-card border rounded-xl p-4">
            <h2 className="text-lg font-semibold">Filters</h2>

            {/* Category filter */}
            <div className="space-y-2">
                <Label htmlFor="location">Category</Label>
                <Select onValueChange={handleCategoryChange} value={selectedCategory || ""} disabled={isDisabled}>

                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a category" />
                    </SelectTrigger>

                    <SelectContent>
                        {categories?.data.map((type) => (
                            <SelectItem key={type._id} value={type._id}>
                                {type.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <Button
                variant="secondary"
                size="sm"
                className="w-full"
                onClick={resetFilters}
                disabled={isDisabled}
            >
                Reset Filters
            </Button>
        </div>
    );
    return (
        <>
            {/* Mobile Filter Trigger */}
            <div className="md:hidden mb-4">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" className="w-full flex items-center gap-2">
                            <Filter className="h-4 w-4" /> Filters
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-72 sm:w-80">
                        <SheetHeader>
                            <SheetTitle>Filters</SheetTitle>
                        </SheetHeader>
                        <div className="mt-4 p-3">{Filters}</div>
                    </SheetContent>
                </Sheet>
            </div>

            {/* Desktop Sidebar */}
            <aside className="hidden md:block md:w-64 sticky top-28 h-fit">{Filters}</aside>
        </>
    );
};

export default ProductsFilter;