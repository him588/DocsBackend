import mongoose from "mongoose";

const contentBlockSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["paragraph", "heading", "image", "list"],
    required: true,
  },
  data: { type: mongoose.Schema.Types.Mixed, required: true },
  position: { type: Number, required: true },
  style: { type: Object, default: {} },
});

const Content = mongoose.model("Content", contentBlockSchema);

export default Content;
