function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 animate-pulse">

      {/* Image */}
      <div className="w-full h-52 bg-gray-300 rounded-lg"></div>

      {/* Title */}
      <div className="h-6 bg-gray-300 rounded mt-5 w-3/4"></div>

      {/* Price */}
      <div className="h-5 bg-gray-300 rounded mt-3 w-1/3"></div>

      {/* Category */}
      <div className="h-4 bg-gray-300 rounded mt-3 w-1/2"></div>

      {/* Description */}
      <div className="h-4 bg-gray-300 rounded mt-4 w-full"></div>
      <div className="h-4 bg-gray-300 rounded mt-2 w-5/6"></div>

      {/* Button */}
      <div className="h-10 bg-gray-300 rounded-lg mt-5"></div>

    </div>
  );
}

export default SkeletonCard;