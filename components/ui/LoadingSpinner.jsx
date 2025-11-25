export default function LoadingSpinner({ message = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <span className="loading loading-spinner loading-lg text-primary"></span>
      <p className="opacity-70">{message}</p>
    </div>
  );
}
