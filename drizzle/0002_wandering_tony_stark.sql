DELETE FROM "user_images";
ALTER TABLE "user_images" ALTER COLUMN "id" SET DATA TYPE uuid USING id::uuid;--> statement-breakpoint
ALTER TABLE "user_images" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "user_images" ALTER COLUMN "front_url" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "user_images" ALTER COLUMN "back_url" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "user_images" ALTER COLUMN "side_url" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "user_images" ALTER COLUMN "clothing_url" SET DATA TYPE text;