import { InferSelectModel } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth.schema";

export const userImages = pgTable("user_images", {
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" })
    .primaryKey(),
  frontUrl: text("front_url"),
  backUrl: text("back_url"),
  rightSideUrl: text("right_side_url"),
  leftSideUrl: text("left_side_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type UserImagesRow = InferSelectModel<typeof userImages>;
