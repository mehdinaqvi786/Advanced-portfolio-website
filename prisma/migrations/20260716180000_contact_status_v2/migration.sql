-- Migrate ContactStatus: Pending | Read | Replied | Archived
--                    →  Pending | Completed | Resolved | Done

CREATE TYPE "ContactStatus_new" AS ENUM ('Pending', 'Completed', 'Resolved', 'Done');

ALTER TABLE "contacts" ALTER COLUMN "status" DROP DEFAULT;

ALTER TABLE "contacts"
  ALTER COLUMN "status" TYPE "ContactStatus_new"
  USING (
    CASE "status"::text
      WHEN 'Pending' THEN 'Pending'::"ContactStatus_new"
      WHEN 'Read' THEN 'Pending'::"ContactStatus_new"
      WHEN 'Replied' THEN 'Completed'::"ContactStatus_new"
      WHEN 'Archived' THEN 'Resolved'::"ContactStatus_new"
      ELSE 'Pending'::"ContactStatus_new"
    END
  );

ALTER TABLE "contacts"
  ALTER COLUMN "status" SET DEFAULT 'Pending'::"ContactStatus_new";

DROP TYPE "ContactStatus";

ALTER TYPE "ContactStatus_new" RENAME TO "ContactStatus";
