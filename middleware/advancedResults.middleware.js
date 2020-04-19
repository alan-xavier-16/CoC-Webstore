const getPagination = require("../utils/pagination.utils");
/*
Handles Requests with Various Queries
  - Accepts a model and populate (opt) as arguments
  - Performs MongoDB Comparison Queries on Docs
  - Performs Select on Doc fields
  - Performs Sorting on Docs
  - Performs Pagination on Docs using 'skip' and 'limit'
  - Appends a 'pagination' object to the response object for FrontEnd
*/
const advancedResults = (model, populate) => async (req, res, next) => {
  let query;
  const reqQuery = { ...req.query };

  // Remove mongoose methods from reqQuery
  const rmFields = ["select", "sort", "page", "limit"];
  rmFields.forEach((param) => delete reqQuery[param]);

  // Filtering documents based on MongoDB Comparison Operators
  let queryStr = JSON.stringify(reqQuery);
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );
  query = model.find(JSON.parse(queryStr));

  // Filter document fields based on Select
  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }

  // Sort documents based on a Field
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }

  /* 
  Pagination
   - page: Page number
   - limit: Number of documents to display
   - startIdx: Index of document at start of current page
   - endIdx: Index + 1 of document at end of current page
   - totalDocs: Total documents in database
  */
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 2;

  const startIdx = (page - 1) * limit;
  const endIdx = page * limit;

  const totalDocs = await model.countDocuments();

  query = query.skip(startIdx).limit(limit);

  // For THIS document fields which should be populated with other document fields
  if (populate) {
    query.populate(populate);
  }

  // Execute Query
  const queryResult = await query;

  // Pagination Numbers Array
  const pagesArray = getPagination(page, limit, totalDocs);
  const pagination = { currentPage: page, limit, pagesArray };

  console.log(pagination);

  // Modify Response Object
  res.advancedResults = {
    success: true,
    count: queryResult.length,
    pagination,
    data: queryResult,
  };

  next();
};

module.exports = advancedResults;
