import type { ICategoryResponseData } from "@/types/category.type";

export function buildCategoryTree(categories: ICategoryResponseData[]) {
  const map = new Map();
  categories.forEach(cat => map.set(cat._id, { ...cat, children: [] }));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tree: any[] = [];
  categories.forEach(cat => {
    if (cat.parent) {
      map.get(cat.parent)?.children.push(map.get(cat._id));
    } else {
      tree.push(map.get(cat._id));
    }
  });
  return tree;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function flattenCategories(categories:any, depth = 0): any[] {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return categories.flatMap((cat: any) => [
    { ...cat, depth },
    ...flattenCategories(cat.children || [], depth + 1),
  ]);
}
