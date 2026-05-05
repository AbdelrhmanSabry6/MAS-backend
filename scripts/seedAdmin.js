import "dotenv/config";
import bcrypt from "bcryptjs";
import User from "../databases/models/user.model.js";
import dbconn from "../databases/DatabaseConnection.js";
import mongoose from "mongoose";

const seedAdmin = async () => {
    try {
        await dbconn();

        const adminEmail = "super@test.com";
        const adminPassword = "123456";
        const fullName = "sabry";

        const passwordHash = await bcrypt.hash(adminPassword, 10);

        const admin = await User.findOneAndUpdate(
            { email: adminEmail },
            {
                email: adminEmail,
                passwordHash,
                fullName,
                role: "superAdmin",
                isActive: true,
            },
            {
                upsert: true,
                new: true,
                setDefaultsOnInsert: true,
                runValidators: true,
            }
        );

        console.log("Super admin seeded successfully:", {
            email: admin.email,
            fullName: admin.fullName,
            role: admin.role,
            isActive: admin.isActive,
        });

        process.exit(0);
    } catch (error) {
        console.error("Error seeding super admin user:", error);
        process.exit(1);
    }
};

seedAdmin();