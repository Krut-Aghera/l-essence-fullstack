import cors from 'cors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import globalErrorHandler from './middlewares/error.middleware.js';
import logger from './middlewares/logger.middleware.js';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import adminRouter from './routes/admin.routes.js';
import cartRouter from './routes/cart.routes.js';
import wishlistRouter from './routes/wishlist.routes.js';


const app = express();
const __dirname = path.resolve()

if (process.env.NODE_ENV !== "production") {
      app.use(
            cors({
                  origin: "http://localhost:5173",
                  credentials: true,
            })
      );
}

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/client/dist")))

app.use(logger);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/admin", adminRouter)
app.use("/api/v1/users", userRouter)
app.use("/api/v1/users", cartRouter)
app.use("/api/v1/users", wishlistRouter)

app.get("/*splat", (_, res) => {
      res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"))
})

app.use(globalErrorHandler)

export default app;