# Architecture Guide — ContentForge AI
## Next.js + ASP.NET Core 8 + PostgreSQL
Version: 1.0
Purpose: Development reference for implementing code consistently, correctly, and with scalable architecture.

---

# 1. Architecture Principles

Core Principles

- Clean Architecture
- Domain Driven Design (lightweight)
- SOLID
- Feature-first structure
- Dependency Inversion
- API-first
- Stateless services
- Observable systems

Rules

- UI must not access database directly
- Controllers must not contain business logic
- Services must not depend on UI
- Infrastructure must implement interfaces only
- Domain layer must be independent

---

# 2. System Architecture

Client (Browser)
↓
Next.js (Frontend BFF Style)
↓
ASP.NET Core 8 API
↓
Application Layer
↓
Domain Layer
↓
Infrastructure
↓
SQL Server

External:
- LLM Provider
- Redis
- Storage

---

# 3. Technology Stack

Frontend
- Next.js (App Router)
- TypeScript
- Tailwind
- React Query
- React Hook Form
- Zod

Backend
- ASP.NET Core 8
- EF Core
- MediatR
- FluentValidation

Data
- SQL Server
- Redis

AI
- OpenAI / Azure OpenAI

DevOps
- Docker
- GitHub Actions

---

# 4. Repository Structure

contentforge-ai/

apps/

frontend/

backend/

packages/

shared/

infra/

docker/

docs/

---

# 5. Frontend Architecture (Next.js)

apps/frontend/

src/

app/

(auth)

dashboard/

campaign/

generator/

analytics/

settings/

components/

shared/

features/

campaign/

content/

approval/

services/

api/

hooks/

types/

lib/

utils/

middleware.ts

Rules

- app = routing only
- features = business logic
- components = reusable UI
- services = HTTP layer
- hooks = UI behavior

---

# 6. Backend Architecture

apps/backend/

src/

API/

Application/

Domain/

Infrastructure/

Tests/

Rule

API
→ Application
→ Domain
→ Infrastructure

No reverse dependency.

---

# 7. Domain Model

User

Campaign

ContentRequest

GeneratedContent

PromptTemplate

Approval

Analytics

---

# 8. Database Architecture (SQL Server)

Naming

snake_case

Plural Tables

UUID Keys

Audit Fields

Base Columns

id

created_at

updated_at

created_by

updated_by

soft_deleted

---

# 9. Core Tables

users

campaigns

content_requests

generated_contents

prompt_templates

approval_logs

usage_statistics

---

# 10. Database Conventions

PK
uuid

FK
entity_id

Indexes

campaign_id

created_at

status

JSONB

metadata

prompt_payload

generated_result

---

# 11. API Design Rules

Base

/api/v1

Pattern

GET

POST

PUT

DELETE

Example

/api/v1/content/generate

/api/v1/campaign

Response

{
 "success": true,
 "data": {},
 "message": "",
 "errors": []
}

---

# 12. Backend Coding Standard

Controller

Thin

Service

Business Only

Repository

Data Access

DTO

No Entity Exposure

Validation

FluentValidation

Example Flow

Controller
↓

Command

↓

Handler

↓

Service

↓

Repository

---

# 13. Prompt Engine

Layers

Prompt Template

Prompt Builder

Prompt Context

LLM Provider

Prompt Rules

Output JSON only

Versioned prompts

Retry support

---

# 14. Error Strategy

Frontend

Error Boundary

Backend

Global Exception Middleware

Response

{
 "code":"APP001",
 "message":""
}

---

# 15. Security

JWT

Refresh Token

HTTPS

Rate Limit

CORS

Secrets

Audit Log

---

# 16. Caching

Redis

Cache

Prompt Templates

Dashboard

TTL

5–30 minutes

---

# 17. Logging

Structured Logging

Correlation Id

Request Id

Central Log

---

# 18. Testing Strategy

Frontend

Unit

Component

E2E

Backend

Unit

Integration

Contract

Coverage Goal

80%

---

# 19. CI/CD

PR

Lint

Build

Test

Deploy

Environment

dev

uat

prod

---

# 20. Development Workflow

Branch

feature/

bugfix/

release/

Commit

feat:

fix:

refactor:

docs:

---

# 21. Definition of Good Code

Readable

Predictable

Reusable

Observable

Secure

Testable

Performant

---

End
