import express from "express";
import taskRoutes from "./routes/task-routes";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware untuk membaca request body JSON.
app.use(express.json());


// Semua endpoint task diawali dengan /tasks.
app.use("/tasks", taskRoutes);

// Menangani JSON yang tidak valid.
app.use(
  (
    error: Error & { status?: number },
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    if (error instanceof SyntaxError && "body" in error) {
      return res.status(400).json({
        success: false,
        message: "Format JSON tidak valid",
      });
    }
    
    return res.status(error.status || 500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
);

// Endpoint utama untuk mengecek server.
app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Task Management API is running",
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
