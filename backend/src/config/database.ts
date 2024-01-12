import mongoose from "mongoose";

const connectDB = () => {
  mongoose.connect(process.env.DATABASE_URL as string).then((data) => {
    console.log(`Mongodb connected with server:${data.connection.host}`);
  });
};
export default connectDB;
