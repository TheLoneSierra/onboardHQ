import mongoose from "mongoose";
import { McpServer } from "@modelcontextprotocol/server";
import * as z from "zod/v4";
import Project from "../models/Project.js";

const textResult = (data) => ({
  content: [
    {
      type: "text",
      text: JSON.stringify(data, null, 2),
    },
  ],
});

const errorResult = (message) => ({
  content: [{ type: "text", text: message }],
  isError: true,
});

const createMcpServer = () => {
  const server = new McpServer({
    name: "onboardhq",
    version: "1.0.0",
  });

  // TOOL 1: Create a project
  server.registerTool(
    "create_project",
    {
      description:
        "Create a client onboarding project with client details and onboarding tasks.",
      inputSchema: z.object({
        projectName: z.string().min(1),
        clientName: z.string().min(1),
        clientEmail: z.string().email(),
        status: z.enum(["pending", "in-progress", "completed"]).optional(),
        tasks: z
          .array(
            z.object({
              title: z.string().min(1),
              completed: z.boolean().optional(),
            }),
          )
          .optional(),
      }),
    },
    async (input) => {
      try {
        const project = await Project.create(input);
        return textResult({
          success: true,
          message: "Project created successfully",
          data: project,
        });
      } catch (error) {
        return errorResult(error.message);
      }
    },
  );

  // TOOL 2: Get all projects
  server.registerTool(
    "get_projects",
    {
      description: "Retrieve all client onboarding projects from OnboardHQ.",
      inputSchema: z.object({}),
    },
    async () => {
      try {
        const projects = await Project.find().sort({ createdAt: -1 });

        return textResult({
          success: true,
          count: projects.length,
          data: projects,
        });
      } catch (error) {
        return errorResult(error.message);
      }
    },
  );

  // TOOL 3: Get one project
  server.registerTool(
    "get_project",
    {
      description: "Retrieve one onboarding project using its project ID.",
      inputSchema: z.object({
        projectId: z.string(),
      }),
    },
    async ({ projectId }) => {
      try {
        if (!mongoose.isValidObjectId(projectId)) {
          return errorResult("Invalid project ID");
        }

        const project = await Project.findById(projectId);

        if (!project) {
          return errorResult("Project not found");
        }

        return textResult({
          success: true,
          data: project,
        });
      } catch (error) {
        return errorResult(error.message);
      }
    },
  );

  // TOOL 4: Update a project
  server.registerTool(
    "update_project",
    {
      description:
        "Update the details, status, or tasks of an existing onboarding project.",
      inputSchema: z.object({
        projectId: z.string(),
        projectName: z.string().min(1).optional(),
        clientName: z.string().min(1).optional(),
        clientEmail: z.string().email().optional(),
        status: z.enum(["pending", "in-progress", "completed"]).optional(),
        tasks: z
          .array(
            z.object({
              title: z.string().min(1),
              completed: z.boolean().optional(),
            }),
          )
          .optional(),
      }),
    },
    async ({ projectId, ...updates }) => {
      try {
        if (!mongoose.isValidObjectId(projectId)) {
          return errorResult("Invalid project ID");
        }

        if (Object.keys(updates).length === 0) {
          return errorResult("Provide at least one field to update");
        }

        const project = await Project.findByIdAndUpdate(
          projectId,
          { $set: updates },
          { new: true, runValidators: true },
        );

        if (!project) {
          return errorResult("Project not found");
        }

        return textResult({
          success: true,
          message: "Project updated successfully",
          data: project,
        });
      } catch (error) {
        return errorResult(error.message);
      }
    },
  );

  // TOOL 5: Delete a project
  server.registerTool(
    "delete_project",
    {
      description: "Delete an onboarding project using its project ID.",
      inputSchema: z.object({
        projectId: z.string(),
      }),
    },
    async ({ projectId }) => {
      try {
        if (!mongoose.isValidObjectId(projectId)) {
          return errorResult("Invalid project ID");
        }

        const project = await Project.findByIdAndDelete(projectId);

        if (!project) {
          return errorResult("Project not found");
        }

        return textResult({
          success: true,
          message: "Project deleted successfully",
        });
      } catch (error) {
        return errorResult(error.message);
      }
    },
  );

  return server;
};

export default createMcpServer;
