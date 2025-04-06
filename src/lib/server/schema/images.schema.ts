import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth.schema";

export const userImages = pgTable("user_images", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .unique()
    .references(() => user.id, { onDelete: "cascade" }),
  frontUrl: varchar("front_url", { length: 2048 }),
  backUrl: varchar("back_url", { length: 2048 }),
  sideUrl: varchar("side_url", { length: 2048 }),
  clothingUrl: varchar("clothing_url", { length: 2048 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
