# Personal Portfolio + Contact System (Architecture Plan)

## Project Overview

**Objective:** Build a modern personal portfolio website with a secure Contact Us system and an admin dashboard for managing contact submissions.

## Technology Stack

- Frontend: Next.js (App Router), React, TypeScript, Tailwind CSS
- Backend: Next.js Route Handlers (API)
- Database: Supabase PostgreSQL
- ORM: Prisma
- Authentication: Supabase Auth
- Email: Resend
- Security: Google reCAPTCHA v3
- Deployment: Vercel
- Version Control: Git + GitHub

---

# 1. Portfolio Structure

## Home Page

### Hero Section
- Professional introduction
- Short tagline
- CTA buttons
  - View Projects
  - Contact Me
- Social links
- Profile image

### About Me
- Brief biography
- Career goals
- Technologies of interest
- Download Resume button

### Skills

#### Frontend
- React
- Next.js
- TypeScript
- JavaScript
- Tailwind CSS
- HTML
- CSS

#### Backend
- Node.js
- Express.js
- REST APIs

#### Databases
- PostgreSQL
- MySQL
- MongoDB
- Supabase

#### AI / ML
- Python
- NLP
- RAG
- HuggingFace
- LangChain

#### Tools
- Git
- GitHub
- Docker
- Prisma
- Postman
- Vercel

### Projects
Each project card includes:
- Image
- Title
- Description
- Technologies
- GitHub link
- Live Demo
- Key features

### Experience / Education

#### Education
- BS Computer Science
- University
- Timeline

#### Experience
- Internships
- Freelance work
- Personal projects

### Contact
- Name
- Email
- Subject
- Message
- Google reCAPTCHA v3
- Submit button

### Footer
- Social Links
- GitHub
- LinkedIn
- Email
- Copyright
- Quick navigation

---

# 2. Contact System Database Flow

```text
Visitor
↓
Fills Contact Form
↓
Google reCAPTCHA v3
↓
Next.js API Route
↓
Validate Input
↓
Verify reCAPTCHA Score
↓
Prisma ORM
↓
Supabase PostgreSQL
↓
Store Contact Message
↓
Resend API
↓
Send Notification Email
↓
Return Success Response
↓
Show Success Toast
```

### ContactMessage Table

| Field | Type |
|------|------|
| id | UUID |
| name | String |
| email | String |
| subject | String |
| message | Text |
| status | String |
| createdAt | Timestamp |

---

# 3. Authentication Flow (Single Admin)

- Seed one admin user in Supabase Auth.
- Disable public registration.
- Admin logs in with email/password.
- Supabase validates credentials.
- Session is created using secure cookies.
- Middleware protects `/dashboard`.
- Unauthorized users are redirected to `/login`.
- Dashboard allows:
  - View contact messages
  - Read message details
  - Mark as read
  - Logout

Authentication flow:

```text
Admin
↓
Login
↓
Supabase Auth
↓
Session Created
↓
Protected Dashboard
```

---

# 4. Deployment Plan

1. Create GitHub repository.
2. Push the project to the `main` branch.
3. Create a Supabase project.
4. Configure Prisma and run migrations.
5. Seed the admin user.
6. Create a Resend account and API key.
7. Create Google reCAPTCHA v3 keys.
8. Configure Vercel environment variables.
9. Import GitHub repository into Vercel.
10. Deploy and use automatic production deployments from the production branch.

## Environment Variables

```env
DATABASE_URL=
DIRECT_URL=

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

RESEND_API_KEY=

RECAPTCHA_SECRET_KEY=
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=

NEXT_PUBLIC_SITE_URL=
```

---

# Overall Architecture

```text
Visitor
│
▼
Next.js Portfolio
│
├── Hero
├── About
├── Skills
├── Projects
├── Experience
└── Contact Form
      │
      ▼
Google reCAPTCHA v3
      │
      ▼
Next.js API Route
      │
 ┌────┴────┐
 ▼         ▼
Prisma   Resend
 │
 ▼
Supabase PostgreSQL
 │
 ▼
Admin Dashboard
```
