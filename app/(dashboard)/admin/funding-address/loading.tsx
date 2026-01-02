// app/admin/funding-address/loading.tsx
export default function Loading() {
  return (
    <div className="flex h-full items-center justify-center p-6">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-primary" />
      <span className="sr-only">Loading funding addresses…</span>
    </div>
  );
}
