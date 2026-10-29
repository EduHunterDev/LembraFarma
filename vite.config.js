import { cpSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "vite";

const staticDirectories = [
  "assets",
  "css",
  "js",
  "pages",
  "Ferramentas - Crie aqui",
];

export default defineConfig({
  plugins: [
    {
      name: "copy-static-pages",
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
