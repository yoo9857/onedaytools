import { cpSync, existsSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = fileURLToPath(new URL(".", import.meta.url));
const projectRoot = resolve(scriptDirectory, "..");
const standaloneRoot = resolve(projectRoot, ".next", "standalone");
const standaloneNextRoot = resolve(standaloneRoot, ".next");

if (!existsSync(standaloneRoot)) {
  throw new Error("Standalone build was not generated.");
}

mkdirSync(standaloneNextRoot, { recursive: true });
cpSync(resolve(projectRoot, ".next", "static"), resolve(standaloneNextRoot, "static"), {
  recursive: true,
  force: true,
});

const publicDirectory = resolve(projectRoot, "public");
if (existsSync(publicDirectory)) {
  cpSync(publicDirectory, resolve(standaloneRoot, "public"), { recursive: true, force: true });
}
