CREATE TABLE "user_images" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"front_url" varchar(2048),
	"back_url" varchar(2048),
	"side_url" varchar(2048),
	"clothing_url" varchar(2048),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "user_images_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
ALTER TABLE "user_images" ADD CONSTRAINT "user_images_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;