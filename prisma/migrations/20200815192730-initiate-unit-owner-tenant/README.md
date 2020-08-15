# Migration `20200815192730-initiate-unit-owner-tenant`

This migration has been generated at 8/15/2020, 3:27:30 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

CREATE TABLE "Unit" (
"id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
"createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
"buildingId" INTEGER NOT NULL,
"ownerId" INTEGER NOT NULL,
"tenantId" INTEGER NOT NULL,
FOREIGN KEY ("buildingId") REFERENCES "Building"("id") ON DELETE CASCADE ON UPDATE CASCADE,

FOREIGN KEY ("ownerId") REFERENCES "Owner"("id") ON DELETE CASCADE ON UPDATE CASCADE,

FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE
)

CREATE TABLE "Owner" (
"id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
"createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
"name" TEXT NOT NULL,
"phone" TEXT NOT NULL,
"email" TEXT NOT NULL)

CREATE TABLE "Tenant" (
"id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
"createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
"name" TEXT NOT NULL,
"phone" TEXT NOT NULL,
"email" TEXT NOT NULL)

CREATE UNIQUE INDEX "Unit_tenantId" ON "Unit"("tenantId")

PRAGMA foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200815185726-name-addition-to-building..20200815192730-initiate-unit-owner-tenant
--- datamodel.dml
+++ datamodel.dml
@@ -1,19 +1,47 @@
 // 1
 datasource db {
-  provider = "sqlite" 
-  url = "***"
+  provider = "sqlite"
+  url = "***"
 }
 // 2
 generator client {
   provider = "prisma-client-js"
 }
-// 3
+model Building {
+  id        Int      @id @default(autoincrement())
+  createdAt DateTime @default(now())
+  name      String
+  address   String
+  units     Unit[]
+}
-model Building {
-    id Int @id @default(autoincrement())
-    createdAt   DateTime @default(now())
-    name String
-    address String
-}
+model Unit {
+  id         Int      @id @default(autoincrement())
+  createdAt  DateTime @default(now())
+  building   Building @relation(fields: [buildingId], references: [id])
+  buildingId Int
+  owner      Owner    @relation(fields: [ownerId], references: [id])
+  ownerId    Int
+  tenant     Tenant   @relation(fields: [tenantId], references: [id])
+  tenantId   Int
+}
+
+model Owner {
+  id        Int      @id @default(autoincrement())
+  createdAt DateTime @default(now())
+  name      String
+  phone     String
+  email     String
+  units     Unit[]
+}
+
+model Tenant {
+  id        Int      @id @default(autoincrement())
+  createdAt DateTime @default(now())
+  name      String
+  phone     String
+  email     String
+  unit      Unit
+}
```


