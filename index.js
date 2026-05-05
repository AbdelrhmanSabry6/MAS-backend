import "dotenv/config";
import app from "./app.js";
import dbconn from "./databases/DatabaseConnection.js";

const port = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await dbconn();
        console.log("Database connected successfully");

        app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`);
        });
    } catch (error) {
        console.error("Failed to connect to database:", error);
    }
};

startServer();