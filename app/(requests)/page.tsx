import db from "@/lib/db";

import { getTranslations } from "next-intl/server";
import RequestCard from "../../components/request-card";
import { z } from "zod";
import Filter from "../../components/requests-filter";
import { Prisma } from "@prisma/client";
import RequestsPagination from "@/components/requests-pagination";

export const metadata = {
  title: "Requests",
  description: "See all the requests for help",
};

const categories = {
  ALL: "ALL",
  FOOD: "FOOD",
  CLOTHING: "CLOTHING",
  SHELTER: "SHELTER",
  TRANSPORTATION: "TRANSPORTATION",
  MEDICINE: "MEDICINE",
  OTHER: "OTHER",
} as const;

// Number of items per page
const ITEMS_PER_PAGE = 6;

const schema = z.object({
  page: z
    .string()
    .default("1")
    .transform((v) => parseInt(v))
    .refine((v) => v > 0),
  category: z.nativeEnum(categories).default("ALL"),
  q: z.string().optional(),
});

const DonatePage = async ({
  searchParams,
}: {
  searchParams?: Record<string, string | string[]> | undefined;
}) => {
  const t = await getTranslations("requestsPage");

  const parsedParams = schema.parse(searchParams);
  let page = parsedParams.page;
  const selectedCategory = parsedParams.category;
  const search = parsedParams.q;

  const whereClause: Prisma.NeedWhereInput = {
    ...(selectedCategory !== "ALL" ? { category: selectedCategory } : {}),
    ...(search
      ? {
          OR: [
            {
              area: {
                startsWith: search,
                mode: "insensitive",
              },
            },
            {
              description: {
                startsWith: search,
                mode: "insensitive",
              },
            },
            {
              contact: {
                startsWith: search,
                mode: "insensitive",
              },
            },
          ],
        }
      : {}),
  };

  const totalRequests = await db.need.count({
    where: whereClause,
  });

  const totalPages = Math.ceil(totalRequests / ITEMS_PER_PAGE);

  // Validate the page number: it should be at least 1 and at most totalPages
  if (isNaN(page) || page < 1) {
    page = 1; // Default to the first page if the page number is invalid or too low
  } else if (page > totalPages) {
    page = totalPages; // Default to the last page if the page number exceeds total pages
  }

  // Calculate the number of items to skip based on the current page
  const skip = page > 1 ? (page - 1) * ITEMS_PER_PAGE : 0;

  // Optimize the database query based on the selected category and add pagination
  const requests = await db.need.findMany({
    where: whereClause,
    skip,
    take: ITEMS_PER_PAGE,
    orderBy: { createdAt: "desc" },
  });

  // Get the total count of requests to calculate the total number of pages

  return (
    <div className="">
      <h1 className="text-3xl font-bold text-center mb-8">{t("heading")}</h1>

      <Filter />

      {requests.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {requests.map((request) => (
            <RequestCard key={request.id} request={request} />
          ))}
        </div>
      ) : (
        <p className="text-center md:text-left text-muted-foreground">
          {t("none")}
        </p>
      )}

      {/* Pagination Controls */}
      <RequestsPagination currentPage={page} totalPages={totalPages} />
    </div>
  );
};

export default DonatePage;
