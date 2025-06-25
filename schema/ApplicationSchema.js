import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "job",
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  message: {
    type: String,
    required: true, // user must write something
    trim: true
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  },
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user" // provider or admin who reviews
  },
  rejectionMessage: {
    type: String, // optional: only for rejected
    trim: true
  }
}, {
  timestamps: true
});

export default mongoose.models.application || mongoose.model("application", applicationSchema);
