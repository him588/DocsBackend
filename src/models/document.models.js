import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true,unique:true },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Document owner
    content: { type: Array, default: [] }, // Document content as blocks (paragraphs, headings, etc.)
    collaborators: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        permission: {
          type: String,
          enum: ["edit", "view", "comment"],
          default: "view",
        },
      },
    ],
  },
  { timestamps: true }
);
const Document = mongoose.model("Document", documentSchema);
export default Document;
