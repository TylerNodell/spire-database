# Migration `20200815182220-building-addition`

This migration has been generated at 8/15/2020, 2:22:20 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

CREATE TABLE "Building" (
"id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
"createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
"address" TEXT NOT NULL)

PRAGMA foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200815180844-init..20200815182220-building-addition
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
@@ -14,5 +14,11 @@
   id          Int      @id @default(autoincrement())
   createdAt   DateTime @default(now())
   description String
   url         String
+}
+
+model Building {
+    id Int @id @default(autoincrement())
+    createdAt   DateTime @default(now())
+    address String
 }
```


