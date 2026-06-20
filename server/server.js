import dotenv from "dotenv";
import app from './app.js';
import connectDB from './db/db.connection.js';


if (process.env.NODE_ENV !== "production") {
    dotenv.config({
        path: ".env.development",
    });
}

console.log(
      process.env.NODE_ENV === "production"
            ? "Production Mode"
            : "Development Mode"
);


const PORT = process.env.PORT || 3000;

const startServer = async () => {
      try {
            await connectDB(); // Connect to the database before starting the server
            app.listen(PORT, () => {
                  console.log(`🚀 Server is listening at port ${PORT}`);
            });
      } catch (error) {

            console.error("❌ Server failed to start:", error);
            process.exit(1); // Exit the process with failure
      }
}

startServer();