import mongoose from "mongoose";

const pdfSchema = new mongoose.Schema({
  pdfId: String, // optional if using _id
  content: String,
  pageCount: Number,
  questions: [String],
}, { timestamps: true });

export default mongoose.model("PDF", pdfSchema);