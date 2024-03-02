import { Skeleton } from "@/components/ui/skeleton";

function AllBlogsSkeleton() {
  return (
    <>
      <div className="w-10/12 sm:w-1/2 h-fit bg-white px-4 py-3 rounded-lg border-2 border-slate-300">
        <div className="font-bold text-2xl pb-3 underline">
          <Skeleton className="h-8 w-full bg-gray-300 " />
        </div>
        <div className="text-pretty">
          <Skeleton className="h-[125px] w-full rounded-xl bg-gray-300" />
        </div>
        <div className="pt-3 text-slate-500">
          <Skeleton className="h-4 w-[100px] bg-gray-300" />
        </div>
      </div>
      <div className="w-10/12 sm:w-1/2 h-fit bg-white px-4 py-3 rounded-lg border-2 border-slate-300">
        <div className="font-bold text-2xl pb-3 underline">
          <Skeleton className="h-8 w-full bg-gray-300" />
        </div>
        <div className="text-pretty">
          <Skeleton className="h-[125px] w-full rounded-xl bg-gray-300" />
        </div>
        <div className="pt-3 text-slate-500">
          <Skeleton className="h-4 w-[100px] bg-gray-300" />
        </div>
      </div>
      <div className="w-10/12 sm:w-1/2 h-fit bg-white px-4 py-3 rounded-lg border-2 border-slate-300">
        <div className="font-bold text-2xl pb-3 underline">
          <Skeleton className="h-8 w-full bg-gray-300" />
        </div>
        <div className="text-pretty">
          <Skeleton className="h-[125px] w-full rounded-xl bg-gray-300" />
        </div>
        <div className="pt-3 text-slate-500">
          <Skeleton className="h-4 w-[100px] bg-gray-300" />
        </div>
      </div>
    </>
  );
}

export default AllBlogsSkeleton;
