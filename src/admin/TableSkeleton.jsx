const TableSkeleton = () => {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th className="bg-gray-300 dark:bg-gray-600 animate-pulse" />
            <th className="bg-gray-300 dark:bg-gray-600 animate-pulse" />
            <th className="bg-gray-300 dark:bg-gray-600 animate-pulse" />
          </tr>
        </thead>
        <tbody>
          {[...Array(6)].map((_, index) => (
            <tr key={index}>
              <td className="bg-gray-300 dark:bg-gray-600 animate-pulse" />
              <td className="bg-gray-300 dark:bg-gray-600 animate-pulse" />
              <td className="bg-gray-300 dark:bg-gray-600 animate-pulse" />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableSkeleton;
