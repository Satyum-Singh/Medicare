import User from "../models/UserSchema.js";
import BookingSchema from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js";

export const updateUser = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    ); // new true options promises us to return the updated info of user that we have updated.
    res.status(200).json({
      success: true,
      message: "Successfully Updated",
      data: updateUser,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to update the information" });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete" });
  }
};

export const getSingleUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id).select("-password");
    res.status(200).json({
      success: true,
      message: "User found",
      data: user,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: "User not found" });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const users = await User.find({}).select("-password"); // .select("-password") is used so as not to send sensitive data like password in response
    res.status(200).json({
      success: true,
      message: "Users found",
      data: users,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: "Not found" });
  }
};

export const getUserProfile = async (req, res) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId);
    if (!user)
      return res.status(404).json({ success: true, message: "User not found" });

    const { password, ...rest } = user._doc; // _doc is user for directly extracting the core information that is present in a object or a document
    res.status(200).json({
      success: true,
      message: "Profile info is getting",
      data: { ...rest },
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Something went wrong, cannot get" });
  }
};

export const getMyAppointments = async (req, res) => {
  try {
    // Step 1 : retrieve appointments from bookin for specific user
    const bookings = await Booking.find({user:req.userId})

    // Step 2 : extract doctor ids form appointment booking
    const doctorIds = bookings.map(el=>el.doctor.id)

    // Step 3 : retrieve doctors using doctor ids
    const doctors = await Doctor.find({_id:{$in:doctorIds}}).select('-password')

    res.status(200).json({success:true,message:"Appointments are getting", data:doctors})
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Something went wrong, cannot get" });
  }
};
