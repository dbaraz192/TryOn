ALTER TABLE "user_images" DROP CONSTRAINT "user_images_user_id_unique";--> statement-breakpoint
ALTER TABLE "user_images" DROP COLUMN "id";
ALTER TABLE "user_images" ADD PRIMARY KEY ("user_id");--> statement-breakpoint
