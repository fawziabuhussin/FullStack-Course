// src/components/Pagination.tsx
import React from 'react';

const Pagination = ({
  currentPage,
  totalPosts,
  postsPerPage,
  onPageChange
}: {
  currentPage: number;
  totalPosts: number;
  postsPerPage: number;
  onPageChange: (page: number) => void;
}) => {
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    } else if (currentPage < 3) {
      return Array.from({ length: 5 }, (_, i) => i + 1);
    } else if (currentPage >= totalPages - 2) {
      return Array.from({ length: 5 }, (_, i) => totalPages - 4 + i);
    } else {
      return Array.from({ length: 5 }, (_, i) => currentPage - 2 + i);
    }
  };

  return (
    <div className="pagination-container">
      <button name="first" onClick={() => onPageChange(1)}>First</button>

      <button name="previous"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      {getPageNumbers().map(pageNumber => (
        <button name={"page-" + pageNumber}
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          style={{ fontWeight: currentPage === pageNumber ? 'bold' : 'normal' }}
        >
          {pageNumber}
        </button>
      ))}
      <button name="next"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
      
      <button name="last" onClick={() => onPageChange(totalPages)}>Last</button>
    </div>
  );
};

export default Pagination;
