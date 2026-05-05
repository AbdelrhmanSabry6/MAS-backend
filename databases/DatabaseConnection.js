import mongoose from "mongoose";

export const dbconn = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION);
        console.log("DB connected");
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
};

export default dbconn;