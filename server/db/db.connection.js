import mongoose from "mongoose";

const connectDB = async () => {
      try {
            const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${process.env.APP_NAME}`);

            console.log(`✅MongoDB connected successfully  HOST : ${connectionInstance.connection.host}  ||  NAME : ${connectionInstance.connection.name}  ||  PORT : ${connectionInstance.connection.port}`
            );
      } catch (error) {

            console.error("❌ MongoDB connection error:", error);
            process.exit(1); 
      }
}

export default connectDB;