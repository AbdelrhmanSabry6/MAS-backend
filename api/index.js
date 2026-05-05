import app from "../app.js";
import dbconn from "../databases/DatabaseConnection.js";

let isConnected = false;

export default async function handler(req, res) {
    if (!isConnected) {
        await dbconn();
        isConnected = true;
    }

    return app(req, res);
}