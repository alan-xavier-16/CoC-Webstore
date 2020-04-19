import React, { useState, useEffect } from "react";

import "./Pagination.styles.scss";

const Pagination = ({ pagination, getAction }) => {
  const [paginate, setPaginate] = useState({
    currentPage: pagination.currentPage ? pagination.currentPage : 1,
    limit: pagination.limit ? pagination.limit : 10,
    pagesArray: pagination.pagesArray ? pagination.pagesArray : null,
  });
  const { currentPage, pagesArray } = paginate;

  useEffect(() => {
    setPaginate(pagination);
  }, [setPaginate, pagination]);

  /* SET CURRENT PAGE */
  const goToPage = (page) => {
    setPaginate({
      ...paginate,
      currentPage: page,
    });

    const queryParams = { page };
    getAction(queryParams);
  };

  /* EVENT HANDLERS */
  const handleClick = (page, e) => {
    e.preventDefault();
    goToPage(page);
  };

  const handleMoveLeft = (e) => {
    e.preventDefault();
    goToPage(currentPage - 4);
  };

  const handleMoveRight = (e) => {
    e.preventDefault();
    goToPage(currentPage + 4);
  };

  if (pagesArray.length === 1) return null;
  return (
    <>
      <nav aria-label="Page Pagination">
        <ul className="pagination">
          {pagesArray.map((page, idx) => {
            if (page === "LEFT")
              return (
                <li key={idx} className="page-item">
                  <button
                    className="btn page-link"
                    aria-label="Previous"
                    onClick={handleMoveLeft}
                  >
                    <span aria-hidden="true">&laquo;</span>
                    <span className="sr-only">Previous</span>
                  </button>
                </li>
              );

            if (page === "RIGHT")
              return (
                <li key={idx} className="page-item">
                  <button
                    className="btn page-link"
                    aria-label="Next"
                    onClick={handleMoveRight}
                  >
                    <span aria-hidden="true">&raquo;</span>
                    <span className="sr-only">Next</span>
                  </button>
                </li>
              );

            return (
              <li
                key={idx}
                className={`page-item${currentPage === page ? " active" : ""}`}
              >
                <button
                  className="btn page-link"
                  onClick={(e) => handleClick(page, e)}
                >
                  {page}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default Pagination;
