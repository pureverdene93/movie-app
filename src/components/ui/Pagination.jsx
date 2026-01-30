"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 5
}) => {
  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const halfVisible = Math.floor(maxVisiblePages / 2);
      let startPage = Math.max(1, currentPage - halfVisible);
      let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }

      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) {
          pages.push("...");
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        if (i !== 1 && i !== totalPages) {
          pages.push(i);
        }
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pages.push("...");
        }
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2 sm:gap-3">
      <button
        className={`h-9 sm:h-10 px-2 sm:px-3 text-xs sm:text-sm flex items-center justify-center cursor-pointer gap-1 rounded-md transition-colors
          ${currentPage === 1
            ? "text-muted-foreground cursor-not-allowed"
            : "text-foreground hover:bg-accent"
          }`}
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Previous</span>
      </button>

      <div className="flex flex-row gap-1 sm:gap-1.5">
        {getPageNumbers().map((pageNum, index) => {
          if (pageNum === "...") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-1.5 sm:px-2 py-1 text-muted-foreground text-sm"
              >
                ...
              </span>
            );
          }

          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`min-w-8 sm:min-w-10 h-8 sm:h-10 px-2 sm:px-3 py-1 cursor-pointer rounded-md text-xs sm:text-sm font-medium transition-colors
                ${currentPage === pageNum
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground border border-border hover:bg-accent"
                }`}
            >
              {pageNum}
            </button>
          );
        })}
      </div>

      <button
        className={`h-9 sm:h-10 px-2 sm:px-3 text-xs sm:text-sm flex items-center justify-center cursor-pointer gap-1 rounded-md transition-colors
          ${currentPage === totalPages
            ? "text-muted-foreground cursor-not-allowed"
            : "text-foreground hover:bg-accent"
          }`}
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};
