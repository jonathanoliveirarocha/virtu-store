const ProductSkeleton = () => {
  return (
    <div className="bg-surface border border-border rounded-2xl overflow-hidden pointer-events-none">
      <div className="aspect-square bg-[#f5f5f5] overflow-hidden relative">
        <div className="w-full h-full bg-[linear-gradient(90deg,#f0f0f0_25%,#e0e0e0_50%,#f0f0f0_75%)] bg-[length:200%_100%] animate-shimmer" />
      </div>
      <div className="p-4 pb-5">
        <div className="h-2.5 w-[40%] mb-2 rounded-sm bg-[linear-gradient(90deg,#f0f0f0_25%,#e0e0e0_50%,#f0f0f0_75%)] bg-[length:200%_100%] animate-shimmer" />
        <div className="h-3.5 w-[80%] mb-1.5 rounded-sm bg-[linear-gradient(90deg,#f0f0f0_25%,#e0e0e0_50%,#f0f0f0_75%)] bg-[length:200%_100%] animate-shimmer" />
        <div className="h-3 w-[90%] mb-1 rounded-sm bg-[linear-gradient(90deg,#f0f0f0_25%,#e0e0e0_50%,#f0f0f0_75%)] bg-[length:200%_100%] animate-shimmer" />
        <div className="h-3 w-[70%] mb-5 rounded-sm bg-[linear-gradient(90deg,#f0f0f0_25%,#e0e0e0_50%,#f0f0f0_75%)] bg-[length:200%_100%] animate-shimmer" />
        <div className="flex justify-between items-center">
          <div className="h-5.5 w-[40%] rounded-sm bg-[linear-gradient(90deg,#f0f0f0_25%,#e0e0e0_50%,#f0f0f0_75%)] bg-[length:200%_100%] animate-shimmer" />
          <div className="h-[38px] w-[38px] rounded-full bg-[linear-gradient(90deg,#f0f0f0_25%,#e0e0e0_50%,#f0f0f0_75%)] bg-[length:200%_100%] animate-shimmer" />
        </div>
      </div>
    </div>
  );
}

export default ProductSkeleton;