import React from 'react';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
const TablePagination = ({
  currentPage,
  totalItems,
  recordPerPage,
  onPageChange,
  onRowsPerPageChange
}) => {
  const totalPages = Math.ceil(totalItems / recordPerPage);
  
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
    }
  };

  // Calculate which page numbers to show
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages are less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      let startPage = Math.max(currentPage - 1, 2);
      let endPage = Math.min(currentPage + 1, totalPages - 1);
      
      // Adjust if we're near the start
      if (currentPage <= 3) {
        endPage = 4;
      }
      
      // Adjust if we're near the end
      if (currentPage >= totalPages - 2) {
        startPage = totalPages - 3;
      }
      
      // Add ellipsis if needed
      if (startPage > 2) {
        pages.push('...');
      }
      
      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      // Add ellipsis if needed
      if (endPage < totalPages - 1) {
        pages.push('...');
      }
      
      // Always show last page
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <div className="flex items-center justify-between px-3 py-2 border-t border-gray-200 bg-white">
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-700">Rows per page</span>
        <select
          value={recordPerPage}
          onChange={(e) => onRowsPerPageChange(e)}
          className="w-13 px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {[ 10, 20, 50,100,200,300,400,500].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
        <span className="text-sm text-gray-700">
          of {totalItems} items
        </span>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-1 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <KeyboardArrowLeftIcon className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-1">
          {getPageNumbers().map((pageNumber, index) => (
            <button
              key={index}
              onClick={() => typeof pageNumber === 'number' ? handlePageChange(pageNumber) : null}
              disabled={pageNumber === '...'}
              className={`px-3 py-1 rounded-md ${
                pageNumber === currentPage
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : pageNumber === '...'
                  ? "text-gray-500"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              {pageNumber}
            </button>
          ))}
        </div>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-1 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <KeyboardArrowRightIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default TablePagination;