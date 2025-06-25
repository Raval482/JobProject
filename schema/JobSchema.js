import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  salary: { type: String },
  type: { type: String, enum: ["full-time", "part-time", "internship"], default: "full-time" },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  status: {
    type: String,
    enum: ["open", "closed"],
    default: "open"
  }
}, {
  timestamps: true
});

export default mongoose.models.job || mongoose.model("job", jobSchema);
