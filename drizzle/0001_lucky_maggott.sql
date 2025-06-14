ALTER TABLE "expenses" ADD COLUMN "location" text NOT NULL;--> statement-breakpoint
ALTER TABLE "expenses" ADD COLUMN "category" text NOT NULL;--> statement-breakpoint
ALTER TABLE "expenses" DROP COLUMN "title";