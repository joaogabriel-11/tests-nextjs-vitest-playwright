import { getFullEnv } from "@/env/config";
import { defineConfig } from "drizzle-kit";

const { databaseFile, drizzleMigrationsFolder, drizzleSchemaFiles } =
  getFullEnv();

export default defineConfig({
  out: drizzleMigrationsFolder,
  schema: drizzleSchemaFiles,
  dialect: "sqlite",
  dbCredentials: {
    url: databaseFile,
  },
});
