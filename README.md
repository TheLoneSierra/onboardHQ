# OnboardHQ — Architecture & Implementation README

## 1. Project Overview

OnboardHQ is an AI-powered client onboarding and project operations prototype. It enables users to manage client projects, tasks, and project progress through a web application or conversational instructions using Claude.

The prototype integrates Claude through the Model Context Protocol (MCP), allowing the AI assistant to invoke specific application operations instead of merely generating recommendations.

**Deployment:**
- Frontend: Vercel
- Backend and MCP server: Render
- Database: MongoDB Atlas
- AI assistant: Claude
- MCP endpoint: `https://onboardhq-api.onrender.com/mcp`

## 2. Architecture and Data Flow

The system has two primary interaction paths:

**A. Direct application interaction**

1. The user accesses the OnboardHQ React application.
2. The frontend sends REST API requests to the Express backend.
3. The backend validates and processes requests.
4. Mongoose communicates with MongoDB Atlas to create, retrieve, update, or delete project records.
5. The backend returns the resulting data to the frontend.
6. The dashboard displays the latest project and task information.

**B. Claude through MCP**

1. The user submits a natural-language instruction to Claude.
2. Claude identifies the appropriate connected MCP tool.
3. The request is sent to the remote MCP endpoint hosted on the Express backend.
4. The MCP server executes the corresponding project-management operation.
5. The backend interacts with MongoDB Atlas.
6. The tool returns its result to Claude.
7. The same persisted project data becomes available in the OnboardHQ application through its REST API.

Both interaction paths use the same backend and database, maintaining a shared source of project data.

## 3. Implemented MCP Tools

The prototype exposes five MCP tools:

| MCP tool | Responsibility |
|---|---|
| `create_project` | Creates a new project with client information and tasks. |
| `get_projects` | Retrieves the list of projects. |
| `get_project` | Retrieves an individual project by its identifier. |
| `update_project` | Updates existing project information. |
| `delete_project` | Deletes an existing project. |

These tools allow Claude to perform supported project-management operations through the MCP interface.

## 4. Technology Stack and Tools

| Layer | Technology |
|---|---|
| Frontend | React.js, JavaScript, Vite |
| Styling | Tailwind CSS |
| Icons | Lucide React |
| Analytics and charts | Recharts |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| ODM | Mongoose |
| AI assistant | Claude |
| AI integration protocol | Model Context Protocol (MCP) |
| Frontend hosting | Vercel |
| Backend hosting | Render |
| API testing | Postman / cURL |
| Version control | Git and GitHub |

## 5. Volopay-versus-Partner Responsibilities

**Proposed responsibility split — not an implemented Volopay integration.**

For the proposed ecosystem, Volopay would act as the platform/business partner, while OnboardHQ would function as the specialized client onboarding and project operations solution.

## 6. Assumptions

- The initial target customers are freelancers, agencies, and service-based businesses.
- Claude is used as an external AI assistant connected through MCP.
- The backend is responsible for executing application operations and accessing the database.
- MongoDB Atlas acts as the shared source of truth for project data.
- The prototype demonstrates project-management workflows rather than a complete enterprise client operations platform.
- Volopay is considered a potential platform/business partner for this proposed solution. No direct Volopay API integration has been implemented.

## 7. Current Limitations

The current implementation is a functional prototype, not a production-ready enterprise deployment.

**Implemented:**
- React-based application with a project dashboard.
- Backend REST APIs for project operations.
- MongoDB Atlas persistence.
- Remote MCP endpoint connected to Claude.
- Five MCP tools for creating, retrieving, updating, and deleting projects.
- Direct project creation and editing through the application.
- Task completion and project status management.
- Project and task-based dashboard analytics.

**Not yet implemented:**
- API or financial-product integration.
- Production-grade authentication and role-based access control.
- Multi-tenant organization isolation.
- Enterprise audit logging and advanced permission management.
- Automated email delivery and external notification services.
- Payment processing and subscription billing.
- Advanced monitoring, rate limiting, and production security controls.
- Additional CRM and third-party business integrations.

The prototype's analytics are calculated from available project and task records. It does not simulate historical business performance. Any future integrations or automation capabilities mentioned in the business proposal are planned enhancements, not existing functionality.

## 8. Proposed Production System and Next Steps

The production roadmap would focus on making OnboardHQ secure, scalable, and suitable for real business operations.

**Phase 1 — Security and reliability**
- Implement authentication, organization-level access, and role-based permissions.
- Add input validation, authorization checks, and audit logging for sensitive operations.
- Introduce monitoring, error tracking, rate limiting, and backup strategies.
- Add safeguards and confirmation requirements for destructive AI-triggered actions.

**Phase 2 — Business workflow expansion**
- Introduce structured client intake forms and reusable onboarding templates.
- Add automated reminders and communication workflows.
- Expand task assignment, team collaboration, and project reporting.
- Develop additional MCP tools for approved business workflows.

**Phase 3 — Ecosystem integrations**
- Evaluate and implement approved Volopay integrations, subject to API availability and partnership agreements.
- Explore CRM, invoicing, and communication-platform integrations.
- Introduce configurable workflows and integrations for different service-business segments.

## 9. Implementation Boundary

The current submission demonstrates a working application, deployed backend, persistent database, and Claude integration through MCP.

The proposed production system extends this foundation with stronger security, organization management, integrations, operational controls, and additional automation capabilities.

**The distinction is intentional: the prototype demonstrates the core technical feasibility today, while the roadmap describes what would be required to turn it into a production-grade business solution.**
