import Review from "../models/ReviewSchema.js";
import Doctor from "../models/DoctorSchema.js";

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find({});
    if (reviews.length != 0) {
      res
        .status(200)
        .json({ succeess: true, message: "Successful", data: reviews });
    } else {
      res.status(200).json({
        success: true,
        message: "No reviews till now. Be the first one 😊👇",
      });
    }
  } catch (err) {
    res.status(404).json({ success: false, message: "Not found" });
  }
};

// Create review
export const createReview = async (req, res) => {
  if (!req.body.doctor) req.body.doctor = req.params.doctorId;
  if (!req.body.user) req.body.user = req.userId;

  const newReview = new Review(req.body);
  try {
    const savedReview = await newReview.save();

    await Doctor.findByIdAndUpdate(req.body.doctor, {
      $push: { reviews: savedReview._id },
    });
    res.status(200).json({ success: true, message: "Review Submitted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
