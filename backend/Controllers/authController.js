import User from '../models/UserSchema.js'
import Doctor from '../models/DoctorSchema.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'


const generateToken = user => {
    
}

// Used for handling register and login logic
export const register = async (req, res) => {
  const { email, password, name, role, photo, gender } = req.body;
  try {
    let user = null;
    if(role === "patient"){
        user = await User.findOne({email})
    }else if(role==="doctor"){
        user = await Doctor.findOne({email})
    }

    if(user) res.status(400).json({message:"User already exist"})
    
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password,salt)

    if(role==="patient"){
        user = new User({
            name,
            email,
            password:hashPassword,
            photo,
            gender,
            role
        })
    }
    if (role === "doctor") {
      user = new Doctor({
        name,
        email,
        password: hashPassword,
        photo,
        gender,
        role,
      });
    }

    await user.save();
    res.status(200).json({success:true,message:"User successfully created"})

  } catch (err) {
    res.status(500).json({ success: false, message: "Internal Server Error, Try Again" });
  }
};

export const login = async (req, res) => {
  const {email,password} = req.body;
  try {
    let user = null;
    const patient = await User.findOne({email})
    const doctor = await Doctor.findOne({email})
    if(patient) user = patient
    if(doctor) user = doctor

    // check whether if the user exists or not
    if(!user) res.status(404).json({message:"User not found"});

    // Compare if password is correct or not
    const isPasswordMatch = await bcrypt.compare(password,user.password)
    if(!isPasswordMatch) res.status(400).json({status:false, message: "Invalid Credentials" });

    const token = generateToken(user);

  } catch (err) {}
};
