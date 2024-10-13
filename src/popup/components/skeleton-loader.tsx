export const SkeletonLoader = () => {
  return (
    <div className="bg-gray-100 p-4 w-[790px]">
      <div className="flex justify-between items-center mb-4">
        <div className="h-8 w-48 bg-gray-300 rounded animate-pulse"></div>
        <div className="h-6 w-11 bg-gray-300 rounded-full animate-pulse"></div>
      </div>
      <div className="space-y-4">
        <div className="h-10 bg-gray-300 rounded animate-pulse"></div>
        <div className="h-10 bg-gray-300 rounded animate-pulse"></div>
        <div className="h-10 bg-gray-300 rounded animate-pulse"></div>
      </div>
    </div>
  )
}
