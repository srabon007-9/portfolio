// Loading spinner component - Shows while data is being fetched
function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-12">
      {/* Animated spinner */}
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  );
}

export default LoadingSpinner;
