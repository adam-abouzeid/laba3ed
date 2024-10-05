"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";

const RequestsPagination = ({
  totalPages,
  currentPage,
}: {
  totalPages: number;
  currentPage: number;
}) => {
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    const halfMaxPagesToShow = Math.floor(maxPagesToShow / 2);

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= halfMaxPagesToShow + 1) {
        for (let i = 1; i <= maxPagesToShow - 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      } else if (currentPage > totalPages - halfMaxPagesToShow) {
        pageNumbers.push(1);
        pageNumbers.push("...");
        for (let i = totalPages - maxPagesToShow + 2; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push("...");
        for (
          let i = currentPage - halfMaxPagesToShow + 1;
          i <= currentPage + halfMaxPagesToShow - 1;
          i++
        ) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const handlePageChange = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", String(pageNumber));

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mt-8 flex justify-center space-x-4">
      {pageNumbers.map((pageNumber, index) => (
        <Button
          key={index}
          variant={currentPage === pageNumber ? "default" : "outline"}
          type="button"
          onClick={() => handlePageChange(pageNumber as number)}
          disabled={pageNumber === "..."}
        >
          {pageNumber}
        </Button>
      ))}
    </div>
  );
};

export default RequestsPagination;
