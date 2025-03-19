const SkeletonCard = () => {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="aspect-auto p-8 border border-gray-100 rounded-3xl bg-white dark:bg-gray-800 dark:border-gray-700 shadow-xl animate-pulse">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                <div className="flex flex-col gap-2">
                  <div className="h-4 w-24 bg-gray-300 dark:bg-gray-600 rounded"></div>
                  <div className="h-3 w-16 bg-gray-300 dark:bg-gray-600 rounded"></div>
                </div>
              </div>
              <div className="mt-8 space-y-2">
                <div className="h-4 w-full bg-gray-300 dark:bg-gray-600 rounded"></div>
                <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-600 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default SkeletonCard;
  