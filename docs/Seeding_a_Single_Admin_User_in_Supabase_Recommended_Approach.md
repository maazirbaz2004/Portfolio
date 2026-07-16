# Seeding a Single Admin User in Supabase (Recommended Approach)

## Overview

When using **Supabase Auth**, the admin user should **not** be created
directly in the `Profile` table. The `Profile` table stores
application-specific user information, while authentication credentials
are managed by **Supabase Auth**.

## Recommended Workflow

``` text
Seed Script
      |
      v
Initialize Supabase Admin Client
      |
      v
Check if Admin Auth User Exists
      |
      +-- Yes -> Retrieve auth user ID
      |
      +-- No
            |
            v
Create User in Supabase Auth
            |
            v
Receive auth.users.id (UUID)
            |
            v
Check Profile Table
            |
            +-- Exists -> Update if needed
            |
            +-- Doesn't exist
                   |
                   v
Insert Profile Record
                   |
                   v
Seed Complete
```

## Script Steps

1.  Load environment variables (`SUPABASE_URL`,
    `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`,
    `ADMIN_NAME`).
2.  Initialize the Supabase Admin client using the Service Role Key.
3.  Check whether an Auth user with the admin email already exists.
4.  If not, create the Auth user and obtain its UUID.
5.  Using Prisma, check whether a matching `Profile` exists.
6.  Create or update the `Profile` with:
    -   `auth_user_id`
    -   `name`
    -   `email`
    -   `role = ADMIN`
7.  Log the result and disconnect Prisma.

## Why This Order Matters

Supabase Auth is the source of truth.

``` text
Supabase Auth User
        |
        v
auth.users.id
        |
        v
Profile.auth_user_id
```

## Recommended Project Structure

``` text
prisma/
├── schema.prisma
├── seed.ts

lib/
├── prisma.ts
├── supabase-admin.ts

.env
package.json
```

## Best Practices

-   Keep the Service Role Key server-side only.
-   Store admin credentials in environment variables.
-   Make the seed script idempotent.
-   Create the Auth user before the Profile.
-   Use the Profile table only for application metadata.
