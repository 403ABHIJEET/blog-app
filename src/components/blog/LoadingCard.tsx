export default function LoadingCard() {
  return (
    <div className="relative w-2/5 h-64 p-4 border-gray-200 rounded-2xl overflow-hidden bg-white">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-100 to-transparent animate-shimmer z-10" />

      <div className="relative z-20">
        <div className="flex items-center justify-center h-36 bg-gray-200 rounded mb-4">
          <div className="flex justify-center items-center h-screen transform ">
            <img src="/loading.gif" alt="Loading..." className="w-20 h-20" />
          </div>
        </div>

        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
  );
}
