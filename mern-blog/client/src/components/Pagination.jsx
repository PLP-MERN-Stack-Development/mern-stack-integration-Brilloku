import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Pagination = ({ pagination }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const createPageUrl = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page);
    return `${location.pathname}?${params.toString()}`;
  };

  if (!pagination) return null;

  const { page, limit, total } = pagination;
  const totalPages = Math.ceil(total / limit);

  if (totalPages <= 1) return null;

  const pages = [];
  const maxVisiblePages = 5;
  let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-center space-x-2 mt-8">
      {/* Previous Button */}
      {pagination.prev ? (
        <Link
          to={createPageUrl(pagination.prev.page)}
          className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Previous
        </Link>
      ) : (
        <span className="px-3 py-2 text-sm font-medium text-gray-300 bg-gray-100 border border-gray-300 rounded-md cursor-not-allowed">
          Previous
        </span>
      )}

      {/* Page Numbers */}
      {startPage > 1 && (
        <>
          <Link
            to={createPageUrl(1)}
            className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            1
          </Link>
          {startPage > 2 && <span className="px-2 text-gray-500">...</span>}
        </>
      )}

      {pages.map(pageNum => (
        <Link
          key={pageNum}
          to={createPageUrl(pageNum)}
          className={`px-3 py-2 text-sm font-medium rounded-md ${
            pageNum === page
              ? 'text-blue-600 bg-blue-50 border border-blue-500'
              : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
          }`}
        >
          {pageNum}
        </Link>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="px-2 text-gray-500">...</span>}
          <Link
            to={createPageUrl(totalPages)}
            className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            {totalPages}
          </Link>
        </>
      )}

      {/* Next Button */}
      {pagination.next ? (
        <Link
          to={createPageUrl(pagination.next.page)}
          className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Next
        </Link>
      ) : (
        <span className="px-3 py-2 text-sm font-medium text-gray-300 bg-gray-100 border border-gray-300 rounded-md cursor-not-allowed">
          Next
        </span>
      )}
    </div>
  );
};

export default Pagination;
