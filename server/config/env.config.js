import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
    dotenv.config({
        path: ".env.development",
    });
}

console.log(process.env.NODE_ENV === "production" ? "Production Mode" : "Development Mode");
