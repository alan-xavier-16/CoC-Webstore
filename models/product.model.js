const mongoose = require("mongoose");
const slugify = require("slugify");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
    unique: true,
    trim: true,
    maxlength: [30, "Name cannot be more than 30 characters"]
  },
  slug: String,
  description: {
    type: String,
    required: [true, "Please add a description"],
    maxlength: [500, "Description cannot be more than 500 characters"]
  },
  details: [
    {
      title: {
        type: String,
        required: true
      },
      text: {
        type: String,
        required: true
      }
    }
  ],
  price: {
    type: Number,
    required: [true, "Please add a price"]
  },
  photo: {
    type: String,
    default: "no-photo.jpg"
  },
  inventory: {
    type: Number,
    default: 1,
    min: 0,
    max: 500
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: "Category",
    required: true
  }
});

// Hook to create a slug on Product name for front-end
ProductSchema.pre("save", function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

module.exports = mongoose.model("Product", ProductSchema);
