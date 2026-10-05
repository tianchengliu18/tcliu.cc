import { copyFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";

const root = fileURLToPath(new URL("..", import.meta.url));

for (const [sourceName, publicName] of [
  ["main-en.pdf", "cv-en.pdf"],
  ["main-zh.pdf", "cv-zh.pdf"],
]) {
  const source = resolve(root, "cv", sourceName);
  const target = resolve(root, "public", publicName);

  if (!existsSync(source)) {
    throw new Error(`Missing CV source PDF: ${source}`);
  }

  copyFileSync(source, target);
  console.log(`Synced cv/${sourceName} → public/${publicName}`);
}
