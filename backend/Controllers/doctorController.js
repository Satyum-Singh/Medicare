import Doctor from "../models/DoctorSchema.js";

export const updateDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    ); // new true options promises us to return the updated info of user that we have updated.
    res.status(200).json({
      success: true,
      message: "Successfully Updated",
      data: updatedDoctor,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to update the information" });
  }
};

export const deleteDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    await Doctor.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Doctor deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete" });
  }
};

export const getSingleDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    const doctor = await Doctor.findById(id).select("-password");
    res.status(200).json({
      success: true,
      message: "User found",
      data: doctor,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: "User not found" });
  }
};

export const getAllDoctor = async (req, res) => {
  try {
    const { query } = req.query;
    let doctor;
    if (query) {
      // in below line it means either it will check for approved doctor or doctors with name. Regex and options'i' is used for case intensive search.
      doctor = await Doctor.find({
        isApproved: "approved",
        $or: [
          { name: { $regex: query, $options: "i" } },
          { specialization: { $regex: query, $options: "i" } },
        ],
      }).select('-password');
    }
    else doctor = await Doctor.find({}).select("-password"); // .select("-password") is used so as not to send sensitive data like password in response
    res.status(200).json({
      success: true,
      message: "Users found",
      data: doctor,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: "Not found" });
  }
};
