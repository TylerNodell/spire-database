# Migration `20200815182642-removed-links`

This migration has been generated at 8/15/2020, 2:26:42 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

PRAGMA foreign_keys=off;
DROP TABLE "Link";;
PRAGMA foreign_keys=on

PRAGMA foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200815182220-building-addition..20200815182642-removed-links
--- datamodel.dml
+++ datamodel.dml
@@ -1,22 +1,16 @@
 // 1
 datasource db {
   provider = "sqlite" 
-  url = "***"
+  url = "***"
 }
 // 2
 generator client {
   provider = "prisma-client-js"
 }
 // 3
-model Link {
-  id          Int      @id @default(autoincrement())
-  createdAt   DateTime @default(now())
-  description String
-  url         String
-}
 model Building {
     id Int @id @default(autoincrement())
     createdAt   DateTime @default(now())
```


