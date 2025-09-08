import { Skeleton } from "@/components/ui/skeleton"

interface TableSkeletonLoaderProps {
  columns?: number
  rows?: number
}

export default function TableLoader({ columns = 3, rows = 5 }: TableSkeletonLoaderProps) {
  return (
    <>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <tr key={rowIndex} className="border-b">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <td key={colIndex} className="px-4 py-2">
              <Skeleton className="h-6 w-full" />
            </td>
          ))}
        </tr>
      ))}
    </>
  )
}
