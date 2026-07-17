# Personal Portfolio

This is a modern personal portfolio website built with [Next.js 15](https://nextjs.org/) (App Router), [React 19](https://react.dev/), and [Tailwind CSS](https://tailwindcss.com/). It uses [Prisma](https://www.prisma.io/) as an ORM with a [Supabase](https://supabase.com/) PostgreSQL database, and integrates [Resend](https://resend.com/) for email functionality. UI components are built using [Radix UI](https://www.radix-ui.com/) and [Framer Motion](https://www.framer.com/motion/) for animations.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Library:** React 19
- **Styling:** Tailwind CSS
- **Database:** PostgreSQL (Supabase)
- **ORM:** Prisma
- **Authentication:** Supabase Auth
- **Email:** Resend
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **UI Primitives:** Radix UI

## Getting Started

### Prerequisites

- Node.js (version 20 or higher recommended)
- A [Supabase](https://supabase.com/) account and project
- A [Resend](https://resend.com/) account and API key

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd dafi_labs_devops_task_1
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Environment Variables:
   Copy the `.env.example` file to a new file named `.env` and fill in your details.
   ```bash
   cp .env.example .env
   ```
   *Note: Ensure you set up the `DATABASE_URL`, `DIRECT_URL` (for Prisma migrations), Supabase Auth keys, and the Resend API key.*

4. Database Setup:
   Generate the Prisma client and push your schema to the database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

- `npm run dev`: Starts the Next.js development server.
- `npm run build`: Generates the Prisma client and builds the application for production.
- `npm run start`: Starts a Next.js production server (requires a build first).
- `npm run lint`: Runs Next.js ESLint to find and fix issues.
- `npm run seed:admin`: Runs the `scripts/seed-admin.ts` script to create an initial admin user in Supabase Auth.

## Database & Authentication Seeding

You can seed an initial admin user by configuring the Supabase credentials in your `.env` file (`NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_PASSWORD`, etc.) and running:

```bash
npm run seed:admin
```
