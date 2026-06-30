import "./config/env.config.js";

import app from "./app.js";
import connectDB from "./db/db.connection.js";
import { mailTransporter } from "./config/email.config.js";

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
};
startServer();
