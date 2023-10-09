import React from 'react';

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="pagination">
      {pages.map(page => (
        <button key={page} onClick={() => onPageChange(page)} className={currentPage === page ? 'active' : ''}>
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;