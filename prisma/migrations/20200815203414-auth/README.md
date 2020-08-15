# Migration `20200815203414-auth`

This migration has been generated at 8/15/2020, 4:34:14 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

CREATE TABLE "new_Unit" (
"id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
"createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
"apt" TEXT NOT NULL,
"sale" BOOLEAN NOT NULL,
"buildingId" INTEGER NOT NULL,
"ownerId" INTEGER NOT NULL,
"tenantId" INTEGER ,
"agentId" INTEGER NOT NULL,
FOREIGN KEY ("buildingId") REFERENCES "Building"("id") ON DELETE CASCADE ON UPDATE CASCADE,

FOREIGN KEY ("ownerId") REFERENCES "Owner"("id") ON DELETE CASCADE ON UPDATE CASCADE,

FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE SET NULL ON UPDATE CASCADE,

FOREIGN KEY ("agentId") REFERENCES "Agent"("id") ON DELETE CASCADE ON UPDATE CASCADE
)

INSERT INTO "new_Unit" ("id", "createdAt", "buildingId", "ownerId", "tenantId") SELECT "id", "createdAt", "buildingId", "ownerId", "tenantId" FROM "Unit"

PRAGMA foreign_keys=off;
DROP TABLE "Unit";;
PRAGMA foreign_keys=on

ALTER TABLE "new_Unit" RENAME TO "Unit";

CREATE UNIQUE INDEX "Unit_tenantId" ON "Unit"("tenantId")

CREATE TABLE "new_Owner" (
"id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
"createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
"name" TEXT NOT NULL,
"phone" TEXT ,
"email" TEXT )

INSERT INTO "new_Owner" ("id", "createdAt", "name", "phone", "email") SELECT "id", "createdAt", "name", "phone", "email" FROM "Owner"

PRAGMA foreign_keys=off;
DROP TABLE "Owner";;
PRAGMA foreign_keys=on

ALTER TABLE "new_Owner" RENAME TO "Owner";

CREATE UNIQUE INDEX "Owner.phone_unique" ON "Owner"("phone")

CREATE UNIQUE INDEX "Owner.email_unique" ON "Owner"("email")

CREATE TABLE "new_Tenant" (
"id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
"createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
"name" TEXT NOT NULL,
"phone" TEXT ,
"email" TEXT )

INSERT INTO "new_Tenant" ("id", "createdAt", "name", "phone", "email") SELECT "id", "createdAt", "name", "phone", "email" FROM "Tenant"

PRAGMA foreign_keys=off;
DROP TABLE "Tenant";;
PRAGMA foreign_keys=on

ALTER TABLE "new_Tenant" RENAME TO "Tenant";

CREATE UNIQUE INDEX "Tenant.phone_unique" ON "Tenant"("phone")

CREATE UNIQUE INDEX "Tenant.email_unique" ON "Tenant"("email")

CREATE TABLE "new_Agent" (
"id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
"createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
"name" TEXT NOT NULL,
"phone" TEXT NOT NULL,
"email" TEXT NOT NULL,
"password" TEXT NOT NULL)

INSERT INTO "new_Agent" ("id", "createdAt", "name", "email", "password") SELECT "id", "createdAt", "name", "email", "password" FROM "Agent"

PRAGMA foreign_keys=off;
DROP TABLE "Agent";;
PRAGMA foreign_keys=on

ALTER TABLE "new_Agent" RENAME TO "Agent";

CREATE UNIQUE INDEX "Agent.phone_unique" ON "Agent"("phone")

CREATE UNIQUE INDEX "Agent.email_unique" ON "Agent"("email")

PRAGMA foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200815194044-agent..20200815203414-auth
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
@@ -19,37 +19,43 @@
 model Unit {
   id         Int      @id @default(autoincrement())
   createdAt  DateTime @default(now())
+  apt        String
+  sale       Boolean
   building   Building @relation(fields: [buildingId], references: [id])
   buildingId Int
   owner      Owner    @relation(fields: [ownerId], references: [id])
   ownerId    Int
-  tenant     Tenant   @relation(fields: [tenantId], references: [id])
-  tenantId   Int
+  tenant     Tenant?  @relation(fields: [tenantId], references: [id])
+  tenantId   Int?
+  agent      Agent    @relation(fields: [agentId], references: [id])
+  agentId    Int
 }
 model Owner {
   id        Int      @id @default(autoincrement())
   createdAt DateTime @default(now())
   name      String
-  phone     String
-  email     String
+  phone     String?  @unique
+  email     String?  @unique
   units     Unit[]
 }
 model Tenant {
   id        Int      @id @default(autoincrement())
   createdAt DateTime @default(now())
   name      String
-  phone     String
-  email     String
+  phone     String?  @unique
+  email     String?  @unique
   unit      Unit
 }
 model Agent {
   id        Int      @id @default(autoincrement())
   createdAt DateTime @default(now())
-  name String
-  email String @unique
-  password String
-}
+  name      String
+  phone     String   @unique
+  email     String   @unique
+  password  String
+  units     Unit[]
+}
```


