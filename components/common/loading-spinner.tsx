export default function PageLoadingSpinner() {
  return (
    <div className="flex h-full items-center justify-center p-6">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-primary" />
      <span className="sr-only">Loading...</span>
    </div>
  );
}
