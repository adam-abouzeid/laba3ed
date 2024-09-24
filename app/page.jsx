import db from "@/lib/db";
// Available categories
const categories = [
  "ALL",
  "FOOD",
  "CLOTHING",
  "SHELTER",
  "TRANSPORTATION",
  "MEDICINE",
  "OTHER",
];

// Number of items per page
const ITEMS_PER_PAGE = 6;

const DonatePage = async ({ searchParams }) => {
  // Get the selected category and pagination details from the query parameters
  const selectedCategory = searchParams?.category || "ALL";
  const page = parseInt(searchParams?.page || "1", 10);

  // Calculate the number of items to skip based on the current page
  const skip = (page - 1) * ITEMS_PER_PAGE;

  // Optimize the database query based on the selected category and add pagination
  const requests = await db.need.findMany({
    where: selectedCategory !== "ALL" ? { category: selectedCategory } : {},
    skip,
    take: ITEMS_PER_PAGE,
    orderBy: { createdAt: "desc" },
  });

  // Get the total count of requests to calculate the total number of pages
  const totalRequests = await db.need.count({
    where: selectedCategory !== "ALL" ? { category: selectedCategory } : {},
  });

  const totalPages = Math.ceil(totalRequests / ITEMS_PER_PAGE);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        See What People Need & Filter by Category
      </h1>

      <div className="mb-6">
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700"
        >
          Filter by Category:
        </label>
        {/* Form to select category and submit */}
        <form action="/" method="GET">
          <select
            id="category"
            name="category"
            defaultValue={selectedCategory}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0) + category.slice(1).toLowerCase()}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="mt-4 w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Filter
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {requests.length > 0 ? (
          requests.map((request) => (
            <div
              key={request.id}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition-shadow duration-200"
            >
              <h2 className="text-xl font-semibold mb-2">{request.title}</h2>
              <p className="text-gray-600">{request.description}</p>
              <p className="text-gray-600">+961 {request.contact}</p>

              <div className="mt-4">
                <span className="inline-block bg-blue-100 text-blue-600 text-sm font-medium px-3 py-1 rounded-full">
                  {request.category}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            No requests found for this category.
          </p>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="mt-8 flex justify-center space-x-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <form key={i + 1} action="/" method="GET">
            <input type="hidden" name="category" value={selectedCategory} />
            <input type="hidden" name="page" value={i + 1} />
            <button
              type="submit"
              className={`py-2 px-4 ${
                page === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              } rounded-md`}
            >
              {i + 1}
            </button>
          </form>
        ))}
      </div>
    </div>
  );
};

export default DonatePage;
