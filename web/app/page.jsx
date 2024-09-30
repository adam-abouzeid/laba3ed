import db from "@/lib/db";

export const metadata = {
  title: "Requests",
  description: "See all the requests for help",
};
const categories = [
  "ALL",
  "FOOD",
  "CLOTHING",
  "SHELTER",
  "TRANSPORTATION",
  "MEDICINE",
  "OTHER",
];
import { getTranslations } from "next-intl/server";
import RequestCard from "./components/RequestCard";
// Number of items per page
const ITEMS_PER_PAGE = 6;

const DonatePage = async ({ searchParams }) => {
  const t = await getTranslations("RequestsPage");
  let page = parseInt(searchParams?.page || "1", 10);

  const selectedCategory = categories.includes(searchParams?.category)
    ? searchParams.category
    : "ALL";
  const totalRequests = await db.need.count({
    where: selectedCategory !== "ALL" ? { category: selectedCategory } : {},
  });
  const totalPages = Math.ceil(totalRequests / ITEMS_PER_PAGE);

  // Validate the page number: it should be at least 1 and at most totalPages
  if (isNaN(page) || page < 1) {
    page = 1; // Default to the first page if the page number is invalid or too low
  } else if (page > totalPages) {
    page = totalPages; // Default to the last page if the page number exceeds total pages
  }

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

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-8">{t("heading")}</h1>

      <div className="mb-6">
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700"
        >
          {t("filter")}
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
                {t(category.charAt(0) + category.slice(1).toLowerCase())}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="mt-4 w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            {t("filter-button")}
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {requests.length > 0 ? (
          requests.map((request) => (
            <RequestCard key={request.id} request={request} />
          ))
        ) : (
          <p className="text-center text-gray-500">{t("None")}</p>
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
