
import "dotenv/config";
import express from "express";
import dbconn from "./databases/DatabaseConnection.js";
import pagesRoutes from "./modules/pages/pages.routes.js";
import mediaRoutes from "./modules/media/media.routes.js";
import projectsRoutes from "./modules/projects/projects.routes.js";
import authRoutes from "./modules/auth/auth.routes.js";
import servicesRoutes from "./modules/services/services.routes.js";
import postsRoutes from "./modules/posts/posts.routes.js";
import jobsRoutes from "./modules/jobs/jobs.routes.js";
import blogCategoriesRoutes from "./modules/blogCategories/blogCategories.routes.js";
import blogTagsRoutes from "./modules/tags/tags.routes.js";
import projectCategoriesRoutes from "./modules/projectCategories/projectCategories.routes.js";
import departmentsRoutes from "./modules/Departments/Departments.routers.js";
import teamRoutes from "./modules/team/team.routes.js";
import clientsRoutes from "./modules/clients/clients.routes.js";
import timelineRoutes from "./modules/timeline/timeline.routes.js";
import statsRoutes from "./modules/stats/stats.routes.js";
import countriesRoutes from "./modules/countries/countries.routes.js";
import messagesRoutes from "./modules/messages/messages.routes.js";
import applicationRoutes from "./modules/applications/applications.routes.js";
import commentsRoutes from "./modules/comments/comments.routes.js";
import newsletterRoutes from "./modules/newsletter/newsletter.routes.js";
import dashboardRoutes from "./modules/dashboard/dashboard.routes.js";
import settingsRoutes from "./modules/settings/settings.routes.js";
import AppError from "./utils/AppError.js";
import { globalErrorHandler } from "./middlewares/error.middleware.js";
import heroSlidesRoutes from "./modules/heroslides/heroSlides.routes.js";
import adminRoutes from "./modules/admins/admin.routes.js";
const app = express();
const port = 3000;





// Middlewares
app.use(express.json());

// Routes
app.use("/pages", pagesRoutes);
app.use("/media", mediaRoutes);
app.use("/projects", projectsRoutes);
app.use("/auth", authRoutes);
app.use("/services", servicesRoutes);
app.use("/posts", postsRoutes);
app.use("/jobs", jobsRoutes);
app.use("/blog/categories", blogCategoriesRoutes);
app.use("/blog/tags", blogTagsRoutes);
app.use("/project-categories", projectCategoriesRoutes);
app.use("/departments", departmentsRoutes);
app.use("/team", teamRoutes);
app.use("/clients", clientsRoutes);
app.use("/timeline", timelineRoutes);
app.use("/stats", statsRoutes);
app.use("/countries", countriesRoutes);
app.use("/messages", messagesRoutes);
app.use("/applications", applicationRoutes);
app.use("/comments", commentsRoutes);
app.use("/newsletter", newsletterRoutes);

app.use("/dashboard", dashboardRoutes);
app.use("/settings", settingsRoutes);
app.use("/heroslides", heroSlidesRoutes);
app.use("/admins", adminRoutes);




















app.get("/", (req, res) => {
    res.send("Hello World!");
});

// 404 handler
app.use((req, res, next) => {
    next(new AppError(`Can't find ${req.method} ${req.originalUrl} on this server!`, 404));
});

// Global error handler
app.use(globalErrorHandler);

// Start Server after DB connection
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




