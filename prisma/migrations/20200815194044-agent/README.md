# Migration `20200815194044-agent`

This migration has been generated at 8/15/2020, 3:40:44 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

CREATE TABLE "Agent" (
"id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
"createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
"name" TEXT NOT NULL,
"email" TEXT NOT NULL,
"password" TEXT NOT NULL)

CREATE UNIQUE INDEX "Agent.email_unique" ON "Agent"("email")

PRAGMA foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200815192730-initiate-unit-owner-tenant..20200815194044-agent
--- datamodel.dml
+++ datamodel.dml
@@ -1,8 +1,8 @@
 // 1
 datasource db {
   provider = "sqlite"
-  url = "***"
+  url = "***"
 }
 // 2
 generator client {
@@ -44,4 +44,12 @@
   phone     String
   email     String
   unit      Unit
 }
+
+model Agent {
+  id        Int      @id @default(autoincrement())
+  createdAt DateTime @default(now())
+  name String
+  email String @unique
+  password String
+}
```


