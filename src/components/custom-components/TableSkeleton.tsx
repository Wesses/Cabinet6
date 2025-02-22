import { Skeleton } from "@/components/ui/skeleton";

const TableSkeleton = () => {
  const screenHeight = window.innerHeight;
  const height = Math.ceil((screenHeight - 88) / (94));
  const arr = new Array(height).fill(0);

  return (
    <div className="w-full h-full overflow-hidden flex flex-col gap-y-6">
      {arr.map((_, index) => (
        <Skeleton key={index} className="h-[50px] w-full rounded-lg bg-slate-300" />
      ))}
    </div>
  );
};

export default TableSkeleton;
