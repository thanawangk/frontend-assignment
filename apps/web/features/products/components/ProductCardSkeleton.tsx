export function ProductCardSkeleton() {
  return (
    <div className="flex animate-pulse flex-col gap-2">
      <div className="aspect-square rounded-2xl bg-surface" />
      <div className="h-4 w-3/4 rounded bg-surface" />
      <div className="h-4 w-1/2 rounded bg-surface" />
      <div className="h-6 w-1/3 rounded bg-surface" />
    </div>
  );
}
