import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import projectRoutes from "./routes/projectRoutes.js";
import { createMcpExpressApp } from "@modelcontextprotocol/express";
import { toNodeHandler } from "@modelcontextprotocol/node";
import { createMcpHandler } from "@modelcontextprotocol/server";
import createMcpServer from "./mcp/mcpServer.js";
dotenv.config();

const app = createMcpExpressApp();

app.use(cors());
app.use("/api/projects", projectRoutes);

const mcpHandler = createMcpHandler(createMcpServer);
const mcpNodeHandler = toNodeHandler(mcpHandler);

app.all("/mcp", (req, res) => {
  void mcpNodeHandler(req, res, req.body);
});

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "OnboardHQ backend is running!",
  });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
