import mongoose from "mongoose";
import Doctor from './DoctorSchema.js';

const reviewSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Types.ObjectId,
      ref: "Doctor",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    reviewText: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      default: 0,
    },
  },
  { timestamps: true }
);

// This middleware is used to upload the name and photo of the user that posted the review.
reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name photo",
  });
  next();
});

reviewSchema.statics.calcAverageRatings = async function (doctorId) {
  // this points the current review
  // MongoDB Aggregation pipeline :
  // Aggregation Pipeline is a series of data processing stages that can be used to
  // perform various operations on your data, such as filtering, sorting, grouping,
  // and transforming. The pipeline is composed of multiple stages, each of which performs a specific operation on the data.

  const stats = await this.aggregate([
    {
      $match: { doctor: doctorId },
    },
    {
      $group: {
        _id: "doctor",
        numOfRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);
  await Doctor.findByIdAndUpdate(doctorId,{
    totalRating:stats[0].numOfRating,
    averageRating:stats[0].avgRating,
  })
};

reviewSchema.post("save", function () {
  this.constructor.calcAverageRatings(this.doctor);
});

export default mongoose.model("Review", reviewSchema);
