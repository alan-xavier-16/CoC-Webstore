/* 
CREATE PAGINATION ARRAY
  ARGUMENTS:
    - page: Current page
    - limit: Documents to display
    - totalDocs: Total Documents available from database
    - pageNeighbours: Number of additional page numbers to show on each side of the current page

  RETURNS AN ARRAY:
    - (1) < {4 5} [6] {7 8} > (10)
    - (1) < {5 6} [7] {8 9} (10)
    - (1) {2 3} [4] {5 6} > (10)
    - NOTE: MUST RETURN 9 BLOCKS
*/
const getPagination = (page, limit, totalDocs, pageNeighbours = 2) => {
  const totalPages = Math.ceil(totalDocs / limit);

  // ADD 3 FOR CURRENT PAGE, MAX & MIN PAGES
  const pageNumbers = pageNeighbours * 2 + 3;
  const paginationBlocks = pageNumbers + 2; // LEFT & RIGHT BTNS

  // ARROW INDICATOR PLACEHOLDERS
  const LEFT_PAGE = "LEFT";
  const RIGHT_PAGE = "RIGHT";

  // DETERMINE PAGINATION ARRAY
  if (totalPages > paginationBlocks) {
    const startPage = Math.max(2, page - pageNeighbours);
    const endPage = Math.min(totalPages - 1, page + pageNeighbours);
    let pages = range(startPage, endPage);

    // DETERMINE NEXT & PREV BTNS DISPLAY
    const leftSpill = startPage > 2;
    const rightSpill = totalPages - endPage > 1;
    const totalNumsHidden = pageNumbers - (pages.length + 1);

    switch (true) {
      case leftSpill && !rightSpill: {
        const extraPages = range(startPage - totalNumsHidden, startPage - 1);
        pages = [LEFT_PAGE, ...extraPages, ...pages];
        break;
      }
      case !leftSpill && rightSpill: {
        const extraPages = range(endPage + 1, endPage + totalNumsHidden);
        pages = [...pages, ...extraPages, RIGHT_PAGE];
        break;
      }
      case leftSpill && rightSpill:
      default: {
        pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
        break;
      }
    }
    return [1, ...pages, totalPages];
  } else {
    return range(1, totalPages);
  }
};

/* HELPER FUNCTION TO CREATE PAGE NUMBER BOX ARRAY */
const range = (from, to, step = 1) => {
  let range = [];
  let i = from;
  while (i <= to) {
    range = [...range, i];
    i += step;
  }
  return range;
};

module.exports = getPagination;
