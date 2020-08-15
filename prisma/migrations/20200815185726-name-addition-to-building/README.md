# Migration `20200815185726-name-addition-to-building`

This migration has been generated at 8/15/2020, 2:57:26 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

CREATE TABLE "Building" (
"id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
"createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
"name" TEXT NOT NULL,
"address" TEXT NOT NULL)

PRAGMA foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200815182642-removed-links..20200815185726-name-addition-to-building
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
@@ -13,6 +13,7 @@
 model Building {
     id Int @id @default(autoincrement())
     createdAt   DateTime @default(now())
+    name String
     address String
 }
```


