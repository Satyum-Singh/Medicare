import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./Routes/auth.js";
import userRoute from "./Routes/user.js";
import doctorRoute from "./Routes/doctor.js";
import reviewRoute from "./Routes/review.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
const corsOptions = {
  origin: true, // it allows any domain to access the server which is helpfull in the development process.
};

app.get("/", (req, res) => {
  res.send("API is working");
});

// database connect
mongoose.set("strictQuery", false); //strictQuery is particularily used for accidental data losses while sending data of database that dont exactly match the schema
const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true, //The new parser can handle more complex MongoDB connection strings, including those with multiple hosts, replica sets, and authentication. The new parser provides more informative error messages when there's an issue with the connection string
      useUnifiedTopology: true, // used for improved connection management by providing a single, unified way to handle connections to MongoDB by reducing number of connections.
    });
    console.log("MongoDB database is connected");
  } catch (err) {
    console.log(err);
    console.log("Connection failed");
  }
};

// Middleware
app.use(express.json());
app.use(cookieParser()); // used to parse cookie coming with req or send cookie with a response as res.cookie() method.
app.use(cors(corsOptions));

// Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/doctors", doctorRoute);
app.use("/api/v1/reviews",reviewRoute);

app.listen(port, () => {
  connectDB();
  console.log(`Server is running on port ${port}`);
});
