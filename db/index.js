import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(`${process.env.MONGODB_URL}Library`);
    console.log("Connected with mongodb");
  } catch (error) {
    console.log({ message: error.message });
    console.log("Error while connecting with mongodb");
  }
};
 
export default connectDB;
