import { cpSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "vite";

const staticDirectories = [
  "assets",
  "css",
];

export default defineConfig({
  plugins: [
    {
      name: "copy-static-assets",
      apply: "build",
      closeBundle() {
        const outputDirectory = resolve(process.cwd(), "dist");
        for (const directory of staticDirectories) {
          cpSync(
            resolve(process.cwd(), directory),
            resolve(outputDirectory, directory),
            { recursive: true },
          );
        }
      },
    },
  ],
});
