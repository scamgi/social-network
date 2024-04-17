const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    image: {
      type: String,
      required: [true, "Please add an image url"],
    },
    description: {
      type: String,
      required: [true, "Please add a description value"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    // TODO: think how to implement the likes in the database.
    // likes: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    //     unique: true,
    //   },
    // ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);
