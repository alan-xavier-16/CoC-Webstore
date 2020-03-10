const mongoose = require("mongoose");
const slugify = require("slugify");

const CategorySchema = new mongoose.Schema(
  {
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
    photo: {
      type: String,
      default: "no-photo.jpg"
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Hook to create a slug on Category name for front-end
CategorySchema.pre("save", function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// Hook to delete Products related to Category
CategorySchema.pre("remove", async function(next) {
  await this.model("Product").deleteMany({ category: this._id });
  next();
});

// Reverse Populate a 'Products' field
CategorySchema.virtual("products", {
  ref: "Product",
  localField: "_id",
  foreignField: "category",
  justOne: false
});

module.exports = mongoose.model("Category", CategorySchema);
