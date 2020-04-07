const paypal = require("paypal-rest-sdk");
const asyncHandler = require("../middleware/asyncHandler.middleware");
const ErrorResponse = require("../utils/errorResponse.utils");

// @desc    Start Payment Process
// @route   POST /api/v1/paypal/pay
// @access  Private
exports.startPaypalPayment = asyncHandler(async (req, res, next) => {
  /* USER'S CART SENT IN REQUEST WITH AN OBJECT CONTAINING 'product' && 'quantity' */
  // const { checkout } = req.body;

  const checkout = {
    user: "John Doe",
    total: 80,
    products: [
      {
        name: "Burgundy T-shirt",
        quantity: 2,
        price: 25,
      },
      {
        name: "Burgundy Skirt",
        quantity: 1,
        price: 30,
      },
    ],
  };

  /* RETURN && CANCEL URL FOR PAYMENT OBJECT */
  let returnUrl;
  let cancelUrl;
  if (process.env.NODE_ENV === "production") {
    returnUrl = `${req.protocol}://${req.get("host")}/success`;
    cancelUrl = `${req.protocol}://${req.get("host")}/cancel`;
  } else {
    returnUrl = `${req.protocol}://localhost:5000/api/v1/paypal/success`;
    cancelUrl = `${req.protocol}://localhost:5000/api/v1/paypal/cancel`;
  }

  // CREATE PAYTMENT OBJECT
  const createPayment = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: returnUrl,
      cancel_url: cancelUrl,
    },
    transactions: [
      {
        item_list: {
          items: checkout.products.map((product, idx) => ({
            name: product.name,
            price: product.price,
            currency: "USD",
            quantity: product.quantity,
            sku: product.name,
          })),
        },
        amount: {
          currency: "USD",
          total: checkout.total,
        },
        description: `This is a payment initiated by ${checkout.user}`,
      },
    ],
  };

  // CREATE A PAYMENT && REDIRECT TO PAYPAL
  paypal.payment.create(createPayment, (error, payment) => {
    if (error) {
      console.error(error.response.details);
      return next(
        new ErrorResponse(`Something went wrong with your payment`, 400)
      );
    } else {
      payment.links.map((link) => {
        if (link.rel === "approval_url") {
          res.status(payment.httpStatusCode).redirect(link.href);
        }
      });
    }
  });
});

// @desc    Execute A Payment (from Redirect above)
// @route   GET /api/v1/paypal/success
// @access  Private
exports.executePaypalPayment = asyncHandler(async (req, res, next) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  // CREATE PAYMENT OBJECT
  const executePayment = {
    payer_id: payerId,
  };

  paypal.payment.execute(paymentId, executePayment, (error, payment) => {
    if (error) {
      console.log(error.response);
      return next(
        new ErrorResponse(`Something went wrong with your payment`, 400)
      );
    } else {
      console.log(JSON.stringify(payment));
      res.status(200).json({ success: true, data: payment });
    }
  });
});

// @desc    Cancel A Payment (from Redirect above)
// @route   GET /api/v1/paypal/cancel
// @access  Private
exports.cancelPaypalPayment = asyncHandler(async (req, res, next) => {
  res.status(200).json({ success: true, data: {} });
});
